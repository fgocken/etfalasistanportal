import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Baby,
  BookOpen,
  Calculator,
  Droplets,
  Filter,
  Flame,
  HeartPulse,
  Home,
  ShieldAlert,
  Wind,
} from 'lucide-react';
import { MedicalText } from '../basics/respiratory/MedicalText';
import {
  COPD_HYPERCAPNIA_MECHANISMS,
  DELIVERY_DEVICES,
  OXYGEN_DELIVERY_FORMULAS,
  OXYGEN_REFERENCES,
  OXYGEN_SAFETY_CHECKLIST,
  OXYGEN_TARGET_PROFILES,
  SPECIAL_SITUATIONS,
  VENTURI_ADAPTER_SPECS,
} from './oxygenTherapyData';

interface OxygenTherapyModuleProps {
  isDark: boolean;
}

type OxygenSectionFilter = 'all' | 'targets' | 'devices' | 'perioperative' | 'safety' | 'ltot';
type DeviceFilterId = 'all' | 'Düşük Akım (Değişken)' | 'Yüksek Akım (Sabit)' | 'Resüsitasyon / Devre';

const TURKEY_PORTABLE_CYLINDERS = [
  { volumeL: 2, label: '2 L', desc: 'Kompakt acil / ev / ambulans', maxBar: 150 },
  { volumeL: 3, label: '3 L', desc: 'Hafif transport / ambulans', maxBar: 150 },
  { volumeL: 5, label: '5 L', desc: 'Standart hastane içi sedye / transport', maxBar: 150 },
  { volumeL: 10, label: '10 L', desc: 'Büyük transport / ambulans ana tüpü', maxBar: 200 },
] as const;

export const OxygenTherapyModule: React.FC<OxygenTherapyModuleProps> = ({ isDark }) => {
  const [sectionFilter, setSectionFilter] = useState<OxygenSectionFilter>('all');
  const [selectedProfileId, setSelectedProfileId] = useState<string>(OXYGEN_TARGET_PROFILES[0].id);
  const [deviceFilter, setDeviceFilter] = useState<DeviceFilterId>('all');

  // Boyle's Law Portable Cylinder Duration Calculator (Turkey metric bar standard)
  const [cylinderWaterVol, setCylinderWaterVol] = useState<string>('5');
  const [cylinderPressureBar, setCylinderPressureBar] = useState<string>('150');
  const [cylinderReserveBar, setCylinderReserveBar] = useState<number>(10);
  const [cylinderFlowLpm, setCylinderFlowLpm] = useState<string>('6');

  const cylinderCalc = useMemo(() => {
    const vol = Math.max(0, parseFloat(cylinderWaterVol.replace(',', '.')) || 0);
    const bar = Math.max(0, parseFloat(cylinderPressureBar.replace(',', '.')) || 0);
    const flow = Math.max(0, parseFloat(cylinderFlowLpm.replace(',', '.')) || 0);
    const effectiveBar = Math.max(0, bar - cylinderReserveBar);
    const totalLiters = Math.round(bar * vol);
    const usableLiters = Math.round(effectiveBar * vol);
    const minutes = flow > 0 ? Math.floor(usableLiters / flow) : 0;
    const hours = Math.floor(minutes / 60);
    const remMinutes = minutes % 60;
    return {
      vol,
      bar,
      flow,
      effectiveBar,
      totalLiters,
      usableLiters,
      minutes,
      hours,
      remMinutes,
      isLowPressure: bar > 0 && bar <= 20,
      isShortDuration: flow > 0 && minutes > 0 && minutes < 15,
    };
  }, [cylinderWaterVol, cylinderPressureBar, cylinderReserveBar, cylinderFlowLpm]);

  // Estimated FiO2 & PaO2/FiO2 (P/F) Calculator State
  type Fio2DeviceId = 'nasal_cannula' | 'simple_mask' | 'nrbm' | 'venturi' | 'hfnc_direct';
  const [fio2Device, setFio2Device] = useState<Fio2DeviceId>('nasal_cannula');
  const [fio2FlowInput, setFio2FlowInput] = useState<string>('4');
  const [fio2DirectInput, setFio2DirectInput] = useState<string>('40');
  const [venturiPresetFio2, setVenturiPresetFio2] = useState<number>(28);
  const [pao2Input, setPao2Input] = useState<string>('');

  const fio2Calc = useMemo(() => {
    const flow = Math.max(0, parseFloat(fio2FlowInput.replace(',', '.')) || 0);
    const directPct = Math.min(100, Math.max(21, parseFloat(fio2DirectInput.replace(',', '.')) || 21));
    const pao2 = parseFloat(pao2Input.replace(',', '.'));

    let estFio2Pct = 21;
    let rangeNote = '';
    let warning: string | null = null;
    let isFixedFio2 = false;

    if (fio2Device === 'nasal_cannula') {
      if (flow <= 0) {
        estFio2Pct = 21;
        rangeNote = 'Oda havası (%21)';
      } else {
        const clampedFlow = Math.min(flow, 6);
        estFio2Pct = Math.round(20 + clampedFlow * 4);
        rangeNote = 'Yaklaşık formül: %20 + (4 × Akım L/dk) · Taşipnede gerçek FiO₂ düşer.';
        if (flow > 6) {
          warning =
            'Nazal kanülde > 6 L/dk akım FiO₂’yi anlamlı artırmaz; mukozal kuruluk, epistaksis ve frontal sinüs ağrısı yapar. 6 L/dk baz alınmıştır.';
        }
      }
    } else if (fio2Device === 'simple_mask') {
      if (flow < 5) {
        estFio2Pct = 35;
        rangeNote = '5–10 L/dk aralığında ~%35–%55';
        warning =
          'GÜVENLİK UYARISI: Basit yüz maskesinde < 5 L/dk akımda ekspiratuvar CO₂ maskeden yıkanamaz ve CO₂ geri solunumu (rebreathing) oluşur! Minimum 5 L/dk açın.';
      } else {
        const clamped = Math.min(flow, 10);
        estFio2Pct = Math.round(35 + (clamped - 5) * 4);
        rangeNote = '5–10 L/dk aralığında ~%35–%55 (değişken performanslı).';
        if (flow > 10) {
          warning = 'Basit maskede > 10 L/dk akım ek FiO₂ artışı sağlamaz; daha yüksek FiO₂ için NRBM veya HFNC seçin.';
        }
      }
    } else if (fio2Device === 'nrbm') {
      if (flow < 10) {
        estFio2Pct = 60;
        rangeNote = '10–15 L/dk aralığında ~%60–%85 (ideal sızdırmazlıkta ~%90)';
        warning =
          'GÜVENLİK UYARISI: Rezervuarlı geri solumasız maskede < 10 L/dk akımda torba çöker ve CO₂ birikimi riski doğar! Torba tam şiş kalacak şekilde 10–15 L/dk açın.';
      } else {
        const clamped = Math.min(flow, 15);
        estFio2Pct = Math.round(60 + (clamped - 10) * 5);
        rangeNote = '10–15 L/dk aralığında ~%60–%85 (maske sızdırmazlığı ve valf bütünlüğüne göre ~%90’a çıkabilir).';
      }
    } else if (fio2Device === 'venturi') {
      estFio2Pct = venturiPresetFio2;
      isFixedFio2 = true;
      rangeNote = 'Sabit performanslı (HAFOE): Adaptörün belirttiği minimum O₂ akımı sağlandığında kesin FiO₂ verir.';
    } else {
      estFio2Pct = Math.round(directPct);
      isFixedFio2 = true;
      rangeNote = 'HFNC (≥ 30–60 L/dk) veya mekanik ventilatörde blender üzerinden ayarlanan kesin FiO₂.';
    }

    const fio2Decimal = estFio2Pct / 100;
    const hasPao2 = !Number.isNaN(pao2) && pao2 > 0;
    const pfRatio = hasPao2 ? Math.round(pao2 / fio2Decimal) : null;

    let pfCategory: { label: string; tone: 'emerald' | 'sky' | 'amber' | 'rose'; detail: string } | null = null;
    if (pfRatio !== null) {
      if (pfRatio > 400) {
        pfCategory = {
          label: 'Normal Oksijenasyon (> 400)',
          tone: 'emerald',
          detail: 'Belirgin hipoksemik gaz değişim bozukluğu saptanmadı.',
        };
      } else if (pfRatio > 300) {
        pfCategory = {
          label: 'Hafif Gaz Değişim Bozukluğu (301–400)',
          tone: 'sky',
          detail: 'Sınırda azalmış P/F; klinik trend ve altta yatan neden izlenmelidir.',
        };
      } else if (pfRatio > 200) {
        pfCategory = {
          label: 'Hafif Hipoksemi · Hafif ARDS Aralığı (201–300)',
          tone: 'amber',
          detail: 'Berlin ARDS tanısı için PEEP/CPAP ≥ 5 cmH₂O (veya Global ARDS 2024: HFNC ≥ 30 L/dk) ve radyolojik kriterler gerekir.',
        };
      } else if (pfRatio > 100) {
        pfCategory = {
          label: 'Orta Hipoksemi · Orta ARDS Aralığı (101–200)',
          tone: 'rose',
          detail: 'Ciddi oksijenasyon bozukluğu; HFNC/NIV veya invaziv akciğer koruyucu ventilasyon açısından yakın izlem gerekir.',
        };
      } else {
        pfCategory = {
          label: 'Ağır Hipoksemi · Ağır ARDS Aralığı (≤ 100)',
          tone: 'rose',
          detail: 'Kritik refrakter hipoksemi; akciğer koruyucu MV, PEEP titrasyonu, pron pozisyon ve ECMO kriterleri değerlendirilir.',
        };
      }
    }

    return {
      estFio2Pct,
      fio2Decimal,
      rangeNote,
      warning,
      isFixedFio2,
      pfRatio,
      pfCategory,
    };
  }, [fio2Device, fio2FlowInput, fio2DirectInput, venturiPresetFio2, pao2Input]);

  const selectedProfile =
    OXYGEN_TARGET_PROFILES.find((p) => p.id === selectedProfileId) || OXYGEN_TARGET_PROFILES[0];

  const filteredDevices = useMemo(() => {
    if (deviceFilter === 'all') return DELIVERY_DEVICES;
    return DELIVERY_DEVICES.filter((d) => d.category === deviceFilter);
  }, [deviceFilter]);

  const showSection = (id: Exclude<OxygenSectionFilter, 'all'>) =>
    sectionFilter === 'all' || sectionFilter === id;

  const surfaceCard = isDark
    ? 'bg-slate-900 border-slate-800 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900';

  const subtlePanel = isDark
    ? 'bg-slate-950/70 border-slate-800'
    : 'bg-slate-50 border-slate-200';

  const FILTERS: {
    id: OxygenSectionFilter;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'all', label: 'Tümü (Kesintisiz Okuma)', icon: Filter },
    { id: 'targets', label: '1. Hedefler, Sistemler & Fizyoloji', icon: HeartPulse },
    { id: 'devices', label: '2. Akım & Ventüri Fiziği', icon: Wind },
    { id: 'perioperative', label: '3. Perioperatif & Özel', icon: Flame },
    { id: 'safety', label: '4. Güvenlik & Boyle Tüp Hesabı', icon: ShieldAlert },
    { id: 'ltot', label: '5. Uzun Süreli O₂ (USOT)', icon: Home },
  ];

  // SVG Palette
  const svgPalette = {
    bg: isDark ? '#0f172a' : '#f8fafc',
    panel: isDark ? '#020617' : '#ffffff',
    border: isDark ? '#334155' : '#cbd5e1',
    text: isDark ? '#f1f5f9' : '#0f172a',
    muted: isDark ? '#94a3b8' : '#475569',
    sky: isDark ? '#38bdf8' : '#0284c7',
    skySoft: isDark ? 'rgba(56,189,248,0.16)' : '#e0f2fe',
    teal: isDark ? '#2dd4bf' : '#0d9488',
    tealSoft: isDark ? 'rgba(45,212,191,0.15)' : '#ccfbf1',
    amber: isDark ? '#fbbf24' : '#d97706',
    amberSoft: isDark ? 'rgba(251,191,36,0.15)' : '#fef3c7',
    rose: isDark ? '#fb7185' : '#e11d48',
    roseSoft: isDark ? 'rgba(251,113,133,0.15)' : '#ffe4e6',
  };

  return (
    <div className="space-y-6">
      {/* Module Header & Optional Section Filter */}
      <section className={`rounded-xl border p-5 sm:p-6 ${surfaceCard}`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-sky-600 dark:text-sky-400">
                Solunumsal Destek · Modül 01
              </span>
              <span aria-hidden="true">·</span>
              <span>BTS 2017</span>
              <span aria-hidden="true">·</span>
              <span>ERS 2022</span>
              <span aria-hidden="true">·</span>
              <span>Miller&apos;s · Nunn&apos;s · ICU-ROX / HOT-ICU</span>
            </div>
            <h1
              className={`text-xl sm:text-2xl font-extrabold tracking-tight text-balance ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Klinik ve Perioperatif Oksijen Tedavisi
            </h1>
            <p className={`text-sm max-w-4xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Oksijenasyon hedefleri (<MedicalText text="SpO_{2}" /> titrasyonu),{' '}
              <MedicalText text="C_{a}O_{2}" /> / <MedicalText text="DO_{2}" /> temel formülleri, KOAH&apos;ta
              oksijen kaynaklı hiperkapni mekanizmaları, değişken ve sabit performanslı verme sistemleri,
              preoksijenasyon, apneik oksijenasyon ve klinik güvenlik kuralları.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className={`rounded-lg border px-3 py-2 ${subtlePanel}`}>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Normal Hedef</div>
              <div className="text-sm font-mono font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                %94 – %98
              </div>
            </div>
            <div className={`rounded-lg border px-3 py-2 ${subtlePanel}`}>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">KOAH / OHS</div>
              <div className="text-sm font-mono font-bold tabular-nums text-amber-600 dark:text-amber-400">
                %88 – %92
              </div>
            </div>
            <div className={`rounded-lg border px-3 py-2 ${subtlePanel}`}>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Basit Maske Min</div>
              <div className="text-sm font-mono font-bold tabular-nums text-rose-600 dark:text-rose-400">
                ≥ 5 L/dk
              </div>
            </div>
          </div>
        </div>

        {/* Optional Section Filter (Default: All visible continuously) */}
        <div
          className={`mt-5 pt-4 border-t flex flex-wrap items-center gap-2 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
          role="group"
          aria-label="Oksijen Tedavisi Bölüm Filtresi"
        >
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-1">
            Görünüm Filtresi:
          </span>
          {FILTERS.map((f) => {
            const Icon = f.icon;
            const isActive = sectionFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setSectionFilter(f.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                  isActive
                    ? isDark
                      ? 'bg-sky-600 border-sky-500 text-white'
                      : 'bg-sky-700 border-sky-700 text-white'
                    : isDark
                      ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* BÖLÜM 1: HEDEFLER, FORMÜLLER & FİZYOLOJİ */}
      {showSection('targets') && (
        <div className="space-y-6">
          <div className="flex items-baseline justify-between gap-2 px-1">
            <h2 className={`text-lg sm:text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              1. Hedef <MedicalText text="SpO_{2}" />, Verme Sistemleri ve Fizyoloji
            </h2>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              BTS 2017 · Nunn&apos;s · West&apos;s
            </span>
          </div>

          {/* 1A. Interactive Target SpO2 Reference Matrix */}
          <section className={`rounded-xl border p-5 sm:p-6 space-y-5 ${surfaceCard}`}>
            <div>
              <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                1.1. Klinik Senaryoya Göre Hedef <MedicalText text="SpO_{2}" /> ve Başlangıç Stratejisi
              </h3>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Oksijen bir ilaç gibi reçete edilmeli ve hedef saturasyon aralığına titre edilmelidir. Klinik fenotipi seçin:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
              {OXYGEN_TARGET_PROFILES.map((profile) => {
                const selected = profile.id === selectedProfile.id;
                return (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => setSelectedProfileId(profile.id)}
                    className={`text-left rounded-lg border p-3.5 transition-colors cursor-pointer ${
                      selected
                        ? isDark
                          ? 'bg-sky-950/60 border-sky-500 text-white'
                          : 'bg-sky-50 border-sky-600 text-slate-900'
                        : isDark
                          ? 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-semibold leading-snug">{profile.label}</div>
                    <div
                      className={`text-xs font-mono font-bold tabular-nums mt-1.5 ${
                        profile.severity === 'critical'
                          ? 'text-rose-600 dark:text-rose-400'
                          : profile.severity === 'caution'
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      Hedef: <MedicalText text={profile.targetSpo2} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Profile Output Detail */}
            <div className={`rounded-xl border p-4 sm:p-5 space-y-4 ${subtlePanel}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {selectedProfile.label}
                </h4>
                <span
                  className={`text-sm font-mono font-bold tabular-nums ${
                    selectedProfile.severity === 'critical'
                      ? 'text-rose-600 dark:text-rose-400'
                      : selectedProfile.severity === 'caution'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  Hedef <MedicalText text="SpO_{2}" />: <MedicalText text={selectedProfile.targetSpo2} />
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Önerilen Başlangıç Cihazı
                  </div>
                  <p className="font-medium leading-relaxed">
                    <MedicalText text={selectedProfile.initialDevice} />
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Başlangıç <MedicalText text="FiO_{2}" /> Yaklaşımı
                  </div>
                  <p className="font-mono font-semibold text-sky-600 dark:text-sky-400 leading-relaxed">
                    <MedicalText text={selectedProfile.initialFio2} />
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-xs sm:text-sm">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Fizyolojik ve Kanıta Dayalı Gerekçe
                </div>
                <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <MedicalText text={selectedProfile.rationale} />
                </p>
              </div>

              <div
                className={`rounded-lg border p-3 text-xs sm:text-sm flex items-start gap-2.5 ${
                  isDark
                    ? 'bg-rose-950/30 border-rose-800/70 text-rose-200'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                <div>
                  <span className="font-bold">Kaçınılması Gereken Hata: </span>
                  <MedicalText text={selectedProfile.avoid} />
                </div>
              </div>
            </div>

            {/* Practical Bedside Pearls: Humidification & Pediatric Comfort */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div
                className={`rounded-xl border p-3.5 flex items-start gap-2.5 ${
                  isDark
                    ? 'bg-sky-950/25 border-sky-800/60 text-sky-100'
                    : 'bg-sky-50/70 border-sky-200 text-sky-950'
                }`}
              >
                <Droplets className="w-4 h-4 shrink-0 mt-0.5 text-sky-500" />
                <div className="leading-relaxed">
                  <span className="font-bold block text-sky-700 dark:text-sky-300 mb-0.5">
                    Uzun Süreli Uygulamada Nemlendirme
                  </span>
                  Oksijen verilmesinin uzun süreceği öngörüldüğünde, kuruyan salgıların daha küçük hava yollarını
                  tıkamasını önlemek için mümkün olduğunca nemlendirilmelidir.
                </div>
              </div>

              <div
                className={`rounded-xl border p-3.5 flex items-start gap-2.5 ${
                  isDark
                    ? 'bg-amber-950/25 border-amber-800/60 text-amber-100'
                    : 'bg-amber-50/70 border-amber-200 text-amber-950'
                }`}
              >
                <Baby className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                <div className="leading-relaxed">
                  <span className="font-bold block text-amber-700 dark:text-amber-300 mb-0.5">
                    Pediatrik Uygulama (Ajitasyondan Kaçınma)
                  </span>
                  Solunum güçlüğü çeken küçük çocuklar oksijen uygulamasında huzursuzlanarak klinik olarak kötüleşebilir;
                  çocuk rahat pozisyonda tutulmalı, gerekirse ebeveyn veya bakıcı oksijen kaynağını yüzüne yakın
                  tutarak (blow-by) destek vermelidir.
                </div>
              </div>
            </div>
          </section>

          {/* 1.2. Delivery Systems Comparison Table (Moved directly under 1.1) */}
          <section className={`rounded-xl border p-5 sm:p-6 space-y-4 ${surfaceCard}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  1.2. Oksijen Verme Sistemleri Karşılaştırma Tablosu
                </h3>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Akım aralığı, sağlanan <MedicalText text="FiO_{2}" />, nemlendirme gereksinimi ve kritik güvenlik kuralları
                </p>
              </div>

              <div className={`inline-flex items-center gap-1 p-1 rounded-lg border ${subtlePanel}`}>
                {(['all', 'Düşük Akım (Değişken)', 'Yüksek Akım (Sabit)', 'Resüsitasyon / Devre'] as DeviceFilterId[]).map(
                  (filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setDeviceFilter(filter)}
                      className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        deviceFilter === filter
                          ? isDark
                            ? 'bg-slate-800 text-white'
                            : 'bg-white text-slate-900 shadow-2xs'
                          : isDark
                            ? 'text-slate-400 hover:text-slate-200'
                            : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {filter === 'all' ? 'Tümü' : filter.split(' (')[0]}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className={`overflow-x-auto rounded-xl border ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead
                  className={
                    isDark
                      ? 'bg-slate-950 text-slate-200 border-b border-slate-800'
                      : 'bg-slate-100 text-slate-900 border-b border-slate-200'
                  }
                >
                  <tr>
                    <th className="text-left p-3 font-semibold whitespace-nowrap">Cihaz</th>
                    <th className="text-left p-3 font-semibold whitespace-nowrap">
                      <MedicalText text="O_{2}" /> Akımı
                    </th>
                    <th className="text-left p-3 font-semibold whitespace-nowrap">
                      Sağlanan <MedicalText text="FiO_{2}" />
                    </th>
                    <th className="text-left p-3 font-semibold whitespace-nowrap">Nemlendirme</th>
                    <th className="text-left p-3 font-semibold">Mekanizma ve Klinik İnciler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredDevices.map((row) => (
                    <tr
                      key={row.device}
                      className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}
                    >
                      <td className="p-3 align-top min-w-[180px]">
                        <div className="font-bold">{row.device}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{row.category}</div>
                      </td>
                      <td className="p-3 align-top font-mono text-xs tabular-nums whitespace-nowrap">
                        <MedicalText text={row.flowRange} />
                      </td>
                      <td className="p-3 align-top font-mono text-xs font-semibold tabular-nums text-sky-600 dark:text-sky-400 whitespace-nowrap">
                        <MedicalText text={row.fio2Range} />
                      </td>
                      <td className="p-3 align-top text-xs min-w-[160px]">
                        <MedicalText text={row.humidification} />
                      </td>
                      <td className="p-3 align-top text-xs leading-relaxed space-y-1 min-w-[260px]">
                        <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                          <MedicalText text={row.mechanismNote} />
                        </p>
                        <p className="font-semibold text-amber-700 dark:text-amber-300">
                          <MedicalText text={row.clinicalPearls} />
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Interactive Estimated FiO2 & PaO2/FiO2 (P/F) Calculator */}
            <div className={`rounded-xl border p-4 sm:p-5 space-y-4 ${subtlePanel}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="space-y-0.5">
                  <h4 className={`text-sm sm:text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <Calculator className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>
                      Tahmini <MedicalText text="FiO_{2}" /> ve <MedicalText text="P_{a}O_{2}/FiO_{2}" /> (P/F) Hesaplayıcısı
                    </span>
                  </h4>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Cihazı ve açılan <MedicalText text="O_{2}" /> akımını seçin; isteğe bağlı{' '}
                    <MedicalText text="P_{a}O_{2}" /> (mmHg) girerek tahmini P/F oranını hesaplayın.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  BTS 2017 · Berlin / Global ARDS
                </span>
              </div>

              {/* Device Selector Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(
                  [
                    { id: 'nasal_cannula', label: 'Nazal Kanül', sub: '1–6 L/dk', defaultFlow: '4' },
                    { id: 'simple_mask', label: 'Basit Maske', sub: '5–10 L/dk', defaultFlow: '6' },
                    { id: 'nrbm', label: 'Rezervuarlı (NRBM)', sub: '10–15 L/dk', defaultFlow: '15' },
                    { id: 'venturi', label: 'Ventüri (HAFOE)', sub: 'Sabit %24–60', defaultFlow: '' },
                    { id: 'hfnc_direct', label: 'HFNC / Ventilatör', sub: 'Doğrudan FiO₂', defaultFlow: '' },
                  ] as const
                ).map((dev) => {
                  const active = fio2Device === dev.id;
                  return (
                    <button
                      key={dev.id}
                      type="button"
                      onClick={() => {
                        setFio2Device(dev.id);
                        if (dev.defaultFlow) setFio2FlowInput(dev.defaultFlow);
                      }}
                      className={`text-left rounded-lg border p-2.5 transition-colors cursor-pointer ${
                        active
                          ? isDark
                            ? 'bg-sky-950/60 border-sky-500 text-white'
                            : 'bg-sky-50 border-sky-600 text-slate-900'
                          : isDark
                            ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold leading-snug">{dev.label}</div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">{dev.sub}</div>
                    </button>
                  );
                })}
              </div>

              {/* Inputs + Results */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* Inputs Column */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(fio2Device === 'nasal_cannula' || fio2Device === 'simple_mask' || fio2Device === 'nrbm') && (
                    <div className="space-y-1.5">
                      <label
                        htmlFor="fio2-flow-in"
                        className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400"
                      >
                        Oksijen Akım Hızı (L/dk)
                      </label>
                      <input
                        id="fio2-flow-in"
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        value={fio2FlowInput}
                        onChange={(e) => setFio2FlowInput(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm font-mono font-bold focus:outline-none focus:border-sky-500 ${
                          isDark
                            ? 'bg-slate-900 border-slate-700 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                      <div className="flex flex-wrap gap-1">
                        {(fio2Device === 'nasal_cannula'
                          ? [1, 2, 3, 4, 5, 6]
                          : fio2Device === 'simple_mask'
                            ? [5, 6, 7, 8, 10]
                            : [10, 12, 15]
                        ).map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setFio2FlowInput(String(val))}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border cursor-pointer ${
                              Number(fio2FlowInput) === val
                                ? 'bg-sky-600 border-sky-600 text-white'
                                : isDark
                                  ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {val} L
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {fio2Device === 'venturi' && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        Ventüri Adaptörü (<MedicalText text="FiO_{2}" />)
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[24, 28, 31, 35, 40, 60].map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setVenturiPresetFio2(v)}
                            className={`py-1.5 rounded-lg text-xs font-mono font-bold border cursor-pointer ${
                              venturiPresetFio2 === v
                                ? 'bg-sky-600 border-sky-600 text-white'
                                : isDark
                                  ? 'bg-slate-900 border-slate-800 text-slate-300'
                                  : 'bg-white border-slate-200 text-slate-700'
                            }`}
                          >
                            %{v}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {fio2Device === 'hfnc_direct' && (
                    <div className="space-y-1.5">
                      <label
                        htmlFor="fio2-direct-in"
                        className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400"
                      >
                        Ayarlanan <MedicalText text="FiO_{2}" /> (%)
                      </label>
                      <input
                        id="fio2-direct-in"
                        type="number"
                        min="21"
                        max="100"
                        step="5"
                        value={fio2DirectInput}
                        onChange={(e) => setFio2DirectInput(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm font-mono font-bold focus:outline-none focus:border-sky-500 ${
                          isDark
                            ? 'bg-slate-900 border-slate-700 text-white'
                            : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                      <div className="flex flex-wrap gap-1">
                        {[21, 30, 40, 50, 60, 80, 100].map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setFio2DirectInput(String(v))}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold border cursor-pointer ${
                              Number(fio2DirectInput) === v
                                ? 'bg-sky-600 border-sky-600 text-white'
                                : isDark
                                  ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            %{v}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Optional PaO2 Input */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fio2-pao2-in"
                      className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400"
                    >
                      <MedicalText text="P_{a}O_{2}" /> (mmHg) — Opsiyonel (P/F için)
                    </label>
                    <input
                      id="fio2-pao2-in"
                      type="number"
                      min="10"
                      max="600"
                      step="1"
                      placeholder="Örn: 75"
                      value={pao2Input}
                      onChange={(e) => setPao2Input(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm font-mono font-bold focus:outline-none focus:border-sky-500 ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-600'
                          : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      Arteriyel kan gazı <MedicalText text="P_{a}O_{2}" /> değeri girilirse P/F otomatik hesaplanır.
                    </div>
                  </div>
                </div>

                {/* Output Column */}
                <div
                  className={`lg:col-span-6 rounded-xl border p-3.5 space-y-2.5 ${
                    isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`rounded-lg border p-2.5 ${subtlePanel}`}>
                      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        {fio2Calc.isFixedFio2 ? 'Kesin FiO₂' : 'Tahmini FiO₂'}
                      </div>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-2xl font-mono font-black tabular-nums text-sky-600 dark:text-sky-400">
                          %{fio2Calc.estFio2Pct}
                        </span>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          ({fio2Calc.fio2Decimal.toFixed(2).replace('.', ',')})
                        </span>
                      </div>
                    </div>

                    <div className={`rounded-lg border p-2.5 ${subtlePanel}`}>
                      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        {fio2Calc.isFixedFio2 ? 'P/F Oranı' : 'Tahmini P/F Oranı'}
                      </div>
                      {fio2Calc.pfRatio !== null ? (
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span
                            className={`text-2xl font-mono font-black tabular-nums ${
                              fio2Calc.pfCategory?.tone === 'rose'
                                ? 'text-rose-600 dark:text-rose-400'
                                : fio2Calc.pfCategory?.tone === 'amber'
                                  ? 'text-amber-600 dark:text-amber-400'
                                  : fio2Calc.pfCategory?.tone === 'emerald'
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : 'text-sky-600 dark:text-sky-400'
                            }`}
                          >
                            {fio2Calc.pfRatio}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">mmHg</span>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400 mt-2 font-medium">
                          <MedicalText text="P_{a}O_{2}" /> giriniz
                        </div>
                      )}
                    </div>
                  </div>

                  {fio2Calc.pfCategory && (
                    <div
                      className={`rounded-lg border px-3 py-2 text-xs leading-relaxed ${
                        fio2Calc.pfCategory.tone === 'rose'
                          ? isDark
                            ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                            : 'bg-rose-50 border-rose-200 text-rose-900'
                          : fio2Calc.pfCategory.tone === 'amber'
                            ? isDark
                              ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                              : 'bg-amber-50 border-amber-200 text-amber-900'
                            : fio2Calc.pfCategory.tone === 'emerald'
                              ? isDark
                                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                              : isDark
                                ? 'bg-sky-950/30 border-sky-500/40 text-sky-200'
                                : 'bg-sky-50 border-sky-200 text-sky-900'
                      }`}
                    >
                      <div className="font-bold">{fio2Calc.pfCategory.label}</div>
                      <div className="text-[11px] mt-0.5 opacity-90">{fio2Calc.pfCategory.detail}</div>
                    </div>
                  )}

                  {fio2Calc.warning && (
                    <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-2.5 text-xs text-rose-700 dark:text-rose-200 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                      <span>{fio2Calc.warning}</span>
                    </div>
                  )}

                  <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {fio2Calc.rangeNote}
                    {!fio2Calc.isFixedFio2 &&
                      ' Değişken performanslı cihazlarda FiO₂ tahmini olduğu için P/F oranı yaklaşık değerlendirme sunar.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 1.3. CaO2, DO2, VO2, O2ER Formulas & Core Physiology */}
          <section className={`rounded-xl border p-5 sm:p-6 space-y-4 ${surfaceCard}`}>
            <div>
              <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                1.3. Arteriyel Oksijen İçeriği (<MedicalText text="C_{a}O_{2}" />), Sistemik Sunum (
                <MedicalText text="DO_{2}" />), Tüketim (<MedicalText text="VO_{2}" />) ve Temel Formüller
              </h3>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Yalnızca <MedicalText text="SpO_{2}" /> veya <MedicalText text="P_{a}O_{2}" /> tek başına doku oksijenasyonunu garanti etmez; klinik karar{' '}
                <MedicalText text="Hb" />, <MedicalText text="CO" /> ve <MedicalText text="O_{2}ER" /> dengesiyle birlikte verilmelidir.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {OXYGEN_DELIVERY_FORMULAS.map((f) => (
                <div key={f.name} className={`rounded-xl border p-4 space-y-2.5 ${subtlePanel}`}>
                  <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <MedicalText text={f.name} />
                  </div>
                  <div
                    className={`rounded-lg border px-3 py-2 font-mono text-xs sm:text-sm font-bold tabular-nums overflow-x-auto ${
                      isDark
                        ? 'bg-slate-900 border-slate-800 text-sky-300'
                        : 'bg-white border-slate-200 text-sky-800'
                    }`}
                  >
                    <MedicalText text={f.equation} />
                  </div>
                  <div className="text-xs font-mono font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
                    Normal / Örnek: <MedicalText text={f.normalValue} />
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    <MedicalText text={f.clinicalNote} />
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 1.4 & 1.5. COPD Hypercapnia 3 Mechanisms + Hyperoxia Harms */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <section className={`rounded-xl border p-5 sm:p-6 space-y-4 ${surfaceCard}`}>
              <div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  1.4. KOAH&apos;ta Oksijen Kaynaklı Hiperkapninin 3 Mekanizması
                </h3>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Board sınavlarının klasik sorusu: Hipoksik dürtü baskılanması tek başına ana neden değildir.
                </p>
              </div>

              <div className="space-y-3">
                {COPD_HYPERCAPNIA_MECHANISMS.map((mech) => (
                  <div key={mech.rank} className={`rounded-lg border p-3.5 space-y-1.5 ${subtlePanel}`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-sky-600 dark:text-sky-400">{mech.rank}</span>
                      <span className="font-mono font-bold tabular-nums text-amber-600 dark:text-amber-400">
                        {mech.contribution}
                      </span>
                    </div>
                    <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <MedicalText text={mech.title} />
                    </div>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      <MedicalText text={mech.physiology} />
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className={`rounded-xl border p-5 sm:p-6 space-y-4 ${surfaceCard}`}>
              <div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  1.5. Hiperokseminin Sistemik Zararları ve Kanıta Dayalı Sınırlar
                </h3>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Fazla oksijen masum değildir — normoksemi dışı hedefler organ hasarıyla ilişkilidir.
                </p>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className={`rounded-lg border p-3.5 ${subtlePanel}`}>
                  <div className="font-bold text-rose-600 dark:text-rose-400">
                    1. Reabsorpsiyon (Absorpsiyon) Atelektazisi
                  </div>
                  <p className={`mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Alveolde azot (<MedicalText text="N_{2}" />) yıkandığında geride kalan %100{' '}
                    <MedicalText text="O_{2}" /> kapillere çok hızlı difüze olur; kritik düzeyde az ventile olan
                    alveoler üniteler hızla kollabe olur (intrapulmoner şant artar).
                  </p>
                </div>
                <div className={`rounded-lg border p-3.5 ${subtlePanel}`}>
                  <div className="font-bold text-amber-600 dark:text-amber-400">
                    2. Sistemik, Koroner ve Serebral Vazokonstriksiyon
                  </div>
                  <p className={`mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Belirgin hiperoksi (<MedicalText text="P_{a}O_{2}" /> &gt; 200–300 mmHg) direkt arteriyoler
                    vazokonstriksiyon yaparak koroner ve serebral kan akımını azaltabilir (DETO2X-AMI çalışması
                    normoksemik MI hastasında rutin <MedicalText text="O_{2}" /> faydasını dışlamıştır).
                  </p>
                </div>
                <div className={`rounded-lg border p-3.5 ${subtlePanel}`}>
                  <div className="font-bold text-sky-600 dark:text-sky-400">
                    3. Oksidatif Stres &amp; YBÜ Kanıtları (ICU-ROX / HOT-ICU)
                  </div>
                  <p className={`mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Reaktif oksijen türleri (ROS) alveoler tip I hücre hasarı ve sürfaktan disfonksiyonu oluşturur.
                    ICU-ROX ve HOT-ICU RKÇ’lerinde liberal hiperoksik hedefler konservatif normoksemik stratejilere
                    üstün bulunmamıştır.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* BÖLÜM 2: VERME SİSTEMLERİ & VENTÜRİ */}
      {showSection('devices') && (
        <div className="space-y-6">
          <div className="flex items-baseline justify-between gap-2 px-1">
            <h2 className={`text-lg sm:text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              2. Akım Fiziği ve Ventüri (HAFOE) Sistemleri
            </h2>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Bernoulli · PIFR · ISO Renk Kodları
            </span>
          </div>

          {/* Physics & SVG Schematic */}
          <section className={`rounded-xl border p-5 sm:p-6 space-y-4 ${surfaceCard}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  2.1. Değişken Performans (Düşük Akım) vs. Sabit Performans (Ventüri / HFNC) Fiziği
                </h3>
                <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Hastaya ulaşan gerçek <MedicalText text="FiO_{2}" />&apos;yi belirleyen temel değişken, cihaz akımının
                  hastanın pik inspiratuvar akım hızını (<strong>PIFR</strong>) karşılayıp karşılamadığıdır.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Normal PIFR: 20–30 L/dk · Dispnede PIFR: 40–60+ L/dk
              </span>
            </div>

            <div className={`rounded-xl border p-4 ${subtlePanel}`}>
              <svg
                viewBox="0 0 680 235"
                className="w-full max-w-4xl mx-auto h-auto"
                role="img"
                aria-label="Düşük akımlı değişken sistem vs Ventüri sabit performanslı jet karışım şeması"
              >
                {/* Left Box: Variable Performance */}
                <rect x="12" y="12" width="316" height="210" rx="10" fill={svgPalette.panel} stroke={svgPalette.border} />
                <text x="170" y="34" textAnchor="middle" fontSize="12" fontWeight="800" fill={svgPalette.rose}>
                  A. Değişken Performans (Düşük Akım)
                </text>
                <text x="170" y="50" textAnchor="middle" fontSize="10.5" fill={svgPalette.muted}>
                  Nazal Kanül / Basit Maske (O<tspan fontSize="7.5" dy="2">2</tspan><tspan dy="-2"> Akımı &lt; Hasta PIFR)</tspan>
                </text>

                {/* O2 Input Box */}
                <rect x="28" y="72" width="102" height="40" rx="6" fill={svgPalette.skySoft} stroke={svgPalette.sky} />
                <text x="79" y="89" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={svgPalette.sky}>
                  Cihaz O<tspan fontSize="7.5" dy="2">2</tspan><tspan dy="-2"> Akımı</tspan>
                </text>
                <text x="79" y="104" textAnchor="middle" fontSize="10.5" fontWeight="800" fill={svgPalette.text}>
                  Örn. 4 L/dk (%100)
                </text>

                {/* Room Air Entrainment Box */}
                <rect x="28" y="124" width="102" height="40" rx="6" fill={svgPalette.amberSoft} stroke={svgPalette.amber} />
                <text x="79" y="141" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={svgPalette.amber}>
                  Sürüklenen Hava
                </text>
                <text x="79" y="156" textAnchor="middle" fontSize="10.5" fontWeight="800" fill={svgPalette.text}>
                  PIFR − 4 = 36 L/dk (%21)
                </text>

                <line x1="130" y1="92" x2="178" y2="112" stroke={svgPalette.sky} strokeWidth="2.4" />
                <line x1="130" y1="144" x2="178" y2="124" stroke={svgPalette.amber} strokeWidth="2.4" />

                <rect x="178" y="84" width="134" height="68" rx="8" fill={svgPalette.roseSoft} stroke={svgPalette.rose} />
                <text x="245" y="104" textAnchor="middle" fontSize="10.8" fontWeight="800" fill={svgPalette.rose}>
                  Hasta PIFR = 40 L/dk
                </text>
                <text x="245" y="121" textAnchor="middle" fontSize="10.2" fontWeight="700" fill={svgPalette.text}>
                  Solunum hızı / V<tspan fontSize="7.5" dy="2">T</tspan><tspan dy="-2"> ↑</tspan>
                </text>
                <text x="245" y="137" textAnchor="middle" fontSize="10.8" fontWeight="800" fill={svgPalette.rose}>
                  ⇒ FiO<tspan fontSize="7.5" dy="2">2</tspan><tspan dy="-2"> DÜŞER (Değişken!)</tspan>
                </text>

                <text x="170" y="198" textAnchor="middle" fontSize="10.2" fontWeight="600" fill={svgPalette.muted}>
                  Takipne arttıkça daha fazla %21 oda havası karışır → FiO<tspan fontSize="7.5" dy="2">2</tspan><tspan dy="-2"> seyrelir.</tspan>
                </text>

                {/* Right Box: Fixed Performance (Venturi / HAFOE) */}
                <rect x="352" y="12" width="316" height="210" rx="10" fill={svgPalette.panel} stroke={svgPalette.border} />
                <text x="510" y="34" textAnchor="middle" fontSize="12" fontWeight="800" fill={svgPalette.teal}>
                  B. Sabit Performans (Ventüri · HAFOE)
                </text>
                <text x="510" y="50" textAnchor="middle" fontSize="10.5" fill={svgPalette.muted}>
                  Bernoulli Jet Karışımı (Toplam Akım ≥ Hasta PIFR)
                </text>

                <rect x="366" y="78" width="96" height="44" rx="6" fill={svgPalette.skySoft} stroke={svgPalette.sky} />
                <text x="414" y="96" textAnchor="middle" fontSize="10.2" fontWeight="700" fill={svgPalette.sky}>
                  Dar Jet Orifis
                </text>
                <text x="414" y="112" textAnchor="middle" fontSize="10.2" fontWeight="800" fill={svgPalette.text}>
                  4 L/dk O<tspan fontSize="7.5" dy="2">2</tspan><tspan dy="-2"> (%28 Valf)</tspan>
                </text>

                <rect x="366" y="132" width="96" height="36" rx="6" fill={svgPalette.tealSoft} stroke={svgPalette.teal} />
                <text x="414" y="148" textAnchor="middle" fontSize="9.8" fontWeight="700" fill={svgPalette.teal}>
                  Sabit Oranlı Hava Girişi
                </text>
                <text x="414" y="162" textAnchor="middle" fontSize="9.8" fontWeight="800" fill={svgPalette.text}>
                  10,3 : 1 (41 L/dk Hava)
                </text>

                <line x1="462" y1="100" x2="508" y2="115" stroke={svgPalette.sky} strokeWidth="2.4" />
                <line x1="462" y1="150" x2="508" y2="127" stroke={svgPalette.teal} strokeWidth="2.4" />

                <rect x="508" y="84" width="144" height="68" rx="8" fill={svgPalette.tealSoft} stroke={svgPalette.teal} />
                <text x="580" y="104" textAnchor="middle" fontSize="10.8" fontWeight="800" fill={svgPalette.teal}>
                  Toplam = 45 L/dk
                </text>
                <text x="580" y="121" textAnchor="middle" fontSize="10.2" fontWeight="700" fill={svgPalette.text}>
                  Toplam Akım &gt; PIFR
                </text>
                <text x="580" y="138" textAnchor="middle" fontSize="10.8" fontWeight="800" fill={svgPalette.teal}>
                  ⇒ FiO<tspan fontSize="7.5" dy="2">2</tspan><tspan dy="-2"> SABİT %28!</tspan>
                </text>

                <text x="510" y="198" textAnchor="middle" fontSize="10.2" fontWeight="600" fill={svgPalette.muted}>
                  Fazla gaz maske yan deliklerinden taşar; solunum paterninden bağımsızdır.
                </text>
              </svg>
            </div>
          </section>

          {/* Venturi Color Codes Table */}
          <section className={`rounded-xl border p-5 sm:p-6 space-y-4 ${surfaceCard}`}>
            <div>
              <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                2.2. Ventüri (HAFOE) Maskesi Renk Kodları, Sürüklenme Oranı ve Toplam Akım Tablosu
              </h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                ISO standartlı adaptör değerleri (üreticiye göre akım etiketini daima teyit edin).
              </p>
            </div>

            <div className={`overflow-x-auto rounded-xl border ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead
                  className={
                    isDark
                      ? 'bg-slate-950 text-slate-200 border-b border-slate-800'
                      : 'bg-slate-100 text-slate-900 border-b border-slate-200'
                  }
                >
                  <tr>
                    <th className="text-left p-3 font-semibold whitespace-nowrap">Renk</th>
                    <th className="text-left p-3 font-semibold whitespace-nowrap">
                      <MedicalText text="FiO_{2}" />
                    </th>
                    <th className="text-left p-3 font-semibold whitespace-nowrap">
                      Min <MedicalText text="O_{2}" /> Akımı
                    </th>
                    <th className="text-left p-3 font-semibold whitespace-nowrap">
                      Hava : <MedicalText text="O_{2}" /> Oranı
                    </th>
                    <th className="text-left p-3 font-semibold whitespace-nowrap">Toplam Akım</th>
                    <th className="text-left p-3 font-semibold">Klinik Kullanım Notu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {VENTURI_ADAPTER_SPECS.map((spec) => (
                    <tr key={spec.fio2} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                      <td className="p-3 align-middle whitespace-nowrap">
                        <span className="inline-flex items-center gap-2 font-semibold">
                          <span
                            className="w-3.5 h-3.5 rounded-xs border border-slate-400/50 inline-block shrink-0"
                            style={{ backgroundColor: spec.swatchHex }}
                          />
                          {spec.colorName}
                        </span>
                      </td>
                      <td className="p-3 align-middle font-mono font-bold tabular-nums text-sky-600 dark:text-sky-400">
                        %{spec.fio2}
                      </td>
                      <td className="p-3 align-middle font-mono tabular-nums">{spec.minO2Flow} L/dk</td>
                      <td className="p-3 align-middle font-mono tabular-nums">{spec.airToO2Ratio}</td>
                      <td className="p-3 align-middle font-mono font-bold tabular-nums">{spec.totalFlowAtMin} L/dk</td>
                      <td className="p-3 align-middle text-xs leading-relaxed">
                        <MedicalText text={spec.clinicalUse} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* BÖLÜM 3: PERİOPERATİF & ÖZEL DURUMLAR */}
      {showSection('perioperative') && (
        <div className="space-y-6">
          <div className="flex items-baseline justify-between gap-2 px-1">
            <h2 className={`text-lg sm:text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              3. Perioperatif Oksijenasyon ve Özel Klinik Durumlar
            </h2>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Preoksijenasyon · NODESAT · PROXI · PACU
            </span>
          </div>

          <section className={`rounded-xl border p-5 sm:p-6 space-y-5 ${surfaceCard}`}>
            <div>
              <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                3.1. Perioperatif Oksijenasyon Protokolleri (Preoksijenasyon · Apneik <MedicalText text="O_{2}" /> · İdame · PACU)
              </h3>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Ameliyathane pratiğinde indüksiyondan derlenme odasına oksijen yönetiminin kanıta dayalı standartları
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPECIAL_SITUATIONS.map((item) => (
                <div key={item.title} className={`rounded-xl border p-4 space-y-2.5 ${subtlePanel}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <MedicalText text={item.title} />
                    </h4>
                  </div>
                  <div className="text-xs font-mono font-semibold text-sky-600 dark:text-sky-400">
                    Hedef / Standart: <MedicalText text={item.target} />
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="font-semibold">Mekanizma: </span>
                    <MedicalText text={item.mechanism} />
                  </p>
                  <p className="text-xs leading-relaxed text-emerald-700 dark:text-emerald-300 font-medium">
                    <span className="font-bold">Klinik Uygulama: </span>
                    <MedicalText text={item.action} />
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Preoxygenation Quick Protocol Matrix */}
          <section className={`rounded-xl border p-5 sm:p-6 space-y-4 ${surfaceCard}`}>
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              3.2. Preoksijenasyon (Denitrojenasyon) Teknikleri Karşılaştırması
            </h3>
            <div className={`overflow-x-auto rounded-xl border ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead
                  className={
                    isDark
                      ? 'bg-slate-950 text-slate-200 border-b border-slate-800'
                      : 'bg-slate-100 text-slate-900 border-b border-slate-200'
                  }
                >
                  <tr>
                    <th className="text-left p-3 font-semibold">Teknik</th>
                    <th className="text-left p-3 font-semibold whitespace-nowrap">Süre / Manevra</th>
                    <th className="text-left p-3 font-semibold whitespace-nowrap">
                      FGF &amp; Hedef <MedicalText text="FeO_{2}" />
                    </th>
                    <th className="text-left p-3 font-semibold">Klinik Tercih ve Sınırlılık</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                    <td className="p-3 font-bold">Standart Tidal Solunum</td>
                    <td className="p-3 font-mono tabular-nums whitespace-nowrap">3 dakika normal nefes</td>
                    <td className="p-3 font-mono tabular-nums whitespace-nowrap">
                      ≥ 10 L/dk · <MedicalText text="FeO_{2}" /> &gt; %85–90
                    </td>
                    <td className="p-3 text-xs">
                      Elektif olgularda altın standart; FRC tamamen denitrojenize olur. Maske sızdırmazlığı bozulursa 20 sn’de{' '}
                      <MedicalText text="FeO_{2}" /> hızla düşer.
                    </td>
                  </tr>
                  <tr className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                    <td className="p-3 font-bold">8 Derin Vital Kapasite Nefesi</td>
                    <td className="p-3 font-mono tabular-nums whitespace-nowrap">60 saniye içinde 8 derin nefes</td>
                    <td className="p-3 font-mono tabular-nums whitespace-nowrap">
                      ≥ 10 L/dk · <MedicalText text="FeO_{2}" /> &gt; %85
                    </td>
                    <td className="p-3 text-xs">
                      Acil / RSI olgularında 3 dk tidal solunuma eşdeğer <MedicalText text="P_{a}O_{2}" /> sağlar. 4 derin
                      nefes (30 sn) daha kısa etkilidir ve hızlı desatüre olur.
                    </td>
                  </tr>
                  <tr className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                    <td className="p-3 font-bold">
                      Ramped + CPAP / PEEP (5–10 <MedicalText text="cmH_{2}O" />)
                    </td>
                    <td className="p-3 font-mono tabular-nums whitespace-nowrap">20–25° baş yukarı + NIV/PEEP</td>
                    <td className="p-3 font-mono tabular-nums whitespace-nowrap">
                      <MedicalText text="FiO_{2}" /> 1,00 · <MedicalText text="FeO_{2}" /> &gt; %90
                    </td>
                    <td className="p-3 text-xs">
                      Morbid obez, gebe ve YBÜ hastalarında en uzun güvenli apne süresi; %100{' '}
                      <MedicalText text="O_{2}" />’nin tetiklediği absorpsiyon atelektazisini önler.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* BÖLÜM 4: GÜVENLİK, BOARD SINAVI & BOYLE YASASI TÜP HESABI */}
      {showSection('safety') && (
        <div className="space-y-6">
          <div className="flex items-baseline justify-between gap-2 px-1">
            <h2 className={`text-lg sm:text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              4. Klinik Güvenlik, Board Sınavı Tuzakları ve Boyle Yasası (Tüp Süresi)
            </h2>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Never Events · Boyle Yasası · TS EN 1089-3
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <section className={`rounded-xl border p-5 sm:p-6 space-y-3 ${surfaceCard}`}>
              <h3 className="text-base font-bold text-rose-600 dark:text-rose-400">
                4.1. Asla Yaşanmaması Gereken Olaylar (Never Events)
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm leading-relaxed">
                {OXYGEN_SAFETY_CHECKLIST.neverEvents.map((ev, idx) => (
                  <li key={idx} className={`rounded-lg border p-3 ${subtlePanel}`}>
                    <span className="font-mono font-bold text-rose-500 mr-2">0{idx + 1}.</span>
                    <MedicalText text={ev} />
                  </li>
                ))}
              </ul>
            </section>

            <section className={`rounded-xl border p-5 sm:p-6 space-y-3 ${surfaceCard}`}>
              <h3 className="text-base font-bold text-amber-600 dark:text-amber-400">
                4.2. Board Sınavı Tuzakları (EDAIC · ABA · TARD)
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm leading-relaxed">
                {OXYGEN_SAFETY_CHECKLIST.boardTraps.map((trap, idx) => (
                  <li key={idx} className={`rounded-lg border p-3 ${subtlePanel}`}>
                    <span className="font-mono font-bold text-amber-500 mr-2">0{idx + 1}.</span>
                    <MedicalText text={trap} />
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* 4.3. Boyle's Law & Portable Oxygen Cylinder Duration Calculator (Turkey Metric/Bar Standard) */}
          <section className={`rounded-xl border p-5 sm:p-6 space-y-5 ${surfaceCard}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="space-y-1">
                <h3 className={`text-base sm:text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <Calculator className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>4.3. Boyle Yasası ve Türkiye&apos;deki Portatif Oksijen Tüpleri Kalan Süre Hesaplayıcısı</span>
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed max-w-4xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  <strong>Boyle–Mariotte Yasası</strong>&apos;na göre sabit sıcaklıkta ideal bir gazın basıncı ile hacmi ters
                  orantılıdır (<MedicalText text="P_{1} \times V_{1} = P_{2} \times V_{2}" />). Oksijenin kritik sıcaklığı{' '}
                  <strong className="font-mono">−118,6 °C</strong> olduğundan oda sıcaklığında tüp içinde sıvılaşmaz,{' '}
                  <strong>sıkıştırılmış gaz</strong> fazında bulunur. Bu nedenle manometre basıncı tüpte kalan gaz hacmiyle{' '}
                  <strong>doğrusal (lineer)</strong> olarak azalır (Dorsch &amp; Dorsch; Miller&apos;s Anesthesia).
                </p>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                TS EN 1089-3 · Beyaz Tüp · 150–200 bar
              </span>
            </div>

            {/* Formula Strip */}
            <div className={`rounded-xl border p-3.5 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs ${subtlePanel}`}>
              <div className="space-y-1">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Metrik (Bar) Kalan Süre Formülü
                </div>
                <div className="font-mono font-bold text-sky-600 dark:text-sky-400">
                  Kalan Süre (dk) = [(P<sub>bar</sub> − P<sub>rezerv</sub>) × V<sub>su (L)</sub>] / Akım (L/dk)
                </div>
              </div>
              <div className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Türkiye&apos;de portatif medikal <MedicalText text="O_{2}" /> tüpleri metrik su hacmiyle (<strong>2, 3, 5, 10 L</strong>)
                ve <strong>bar</strong> cinsinden manometreyle (tam dolum <strong>150</strong> veya <strong>200 bar</strong>) ölçülür.
                Regülatör güvenliği için genellikle <strong>10–20 bar</strong> rezerv bırakılır.
              </div>
            </div>

            {/* Interactive Calculator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Inputs */}
              <div className={`lg:col-span-7 rounded-xl border p-4 space-y-4 ${subtlePanel}`}>
                {/* Cylinder Presets */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    1. Portatif Tüp Su Hacmi (Türkiye Standartları)
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TURKEY_PORTABLE_CYLINDERS.map((cyl) => {
                      const active = Number(cylinderWaterVol) === cyl.volumeL;
                      return (
                        <button
                          key={cyl.volumeL}
                          type="button"
                          onClick={() => {
                            setCylinderWaterVol(String(cyl.volumeL));
                            setCylinderPressureBar(String(cyl.maxBar));
                          }}
                          className={`text-left rounded-lg border p-2.5 transition-colors cursor-pointer ${
                            active
                              ? isDark
                                ? 'bg-sky-950/60 border-sky-500 text-white'
                                : 'bg-sky-50 border-sky-600 text-slate-900'
                              : isDark
                                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="text-sm font-mono font-extrabold text-sky-600 dark:text-sky-400">
                            {cyl.label}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                            {cyl.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Numeric Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label
                      htmlFor="o2-cyl-vol"
                      className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400"
                    >
                      Su Hacmi — V<sub>su</sub> (Litre)
                    </label>
                    <input
                      id="o2-cyl-vol"
                      type="number"
                      min="0.5"
                      max="50"
                      step="0.5"
                      value={cylinderWaterVol}
                      onChange={(e) => setCylinderWaterVol(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm font-mono font-bold focus:outline-none focus:border-sky-500 ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="o2-cyl-bar"
                      className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400"
                    >
                      Manometre Basıncı (bar)
                    </label>
                    <input
                      id="o2-cyl-bar"
                      type="number"
                      min="0"
                      max="250"
                      step="5"
                      value={cylinderPressureBar}
                      onChange={(e) => setCylinderPressureBar(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm font-mono font-bold focus:outline-none focus:border-sky-500 ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                    <div className="flex gap-1 pt-0.5">
                      {[50, 100, 150, 200].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setCylinderPressureBar(String(b))}
                          className={`flex-1 py-0.5 rounded text-[10px] font-mono font-semibold border cursor-pointer ${
                            Number(cylinderPressureBar) === b
                              ? 'bg-sky-600 border-sky-600 text-white'
                              : isDark
                                ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="o2-cyl-flow"
                      className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400"
                    >
                      Oksijen Akımı (L/dk)
                    </label>
                    <input
                      id="o2-cyl-flow"
                      type="number"
                      min="0.5"
                      max="60"
                      step="0.5"
                      value={cylinderFlowLpm}
                      onChange={(e) => setCylinderFlowLpm(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm font-mono font-bold focus:outline-none focus:border-sky-500 ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                    <div className="flex gap-1 pt-0.5">
                      {[2, 4, 6, 10, 15].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setCylinderFlowLpm(String(f))}
                          className={`flex-1 py-0.5 rounded text-[10px] font-mono font-semibold border cursor-pointer ${
                            Number(cylinderFlowLpm) === f
                              ? 'bg-sky-600 border-sky-600 text-white'
                              : isDark
                                ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Safety Reserve Selector */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Güvenlik Rezerv Basıncı (P<sub>rezerv</sub>):
                  </span>
                  <div className="inline-flex gap-1.5">
                    {[0, 10, 20].map((res) => (
                      <button
                        key={res}
                        type="button"
                        onClick={() => setCylinderReserveBar(res)}
                        className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold border cursor-pointer ${
                          cylinderReserveBar === res
                            ? 'bg-sky-600 border-sky-600 text-white'
                            : isDark
                              ? 'bg-slate-900 border-slate-800 text-slate-300'
                              : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        {res} bar{res === 10 ? ' (Önerilen)' : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Result Panel */}
              <div
                className={`lg:col-span-5 rounded-xl border p-4 space-y-3.5 ${
                  cylinderCalc.isLowPressure || cylinderCalc.isShortDuration
                    ? isDark
                      ? 'bg-rose-950/25 border-rose-500/40'
                      : 'bg-rose-50/70 border-rose-200'
                    : isDark
                      ? 'bg-sky-950/25 border-sky-500/30'
                      : 'bg-sky-50/70 border-sky-200'
                }`}
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Tahmini Güvenli Kalan Süre
                </div>

                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-3xl font-mono font-black tabular-nums ${
                      cylinderCalc.isLowPressure || cylinderCalc.isShortDuration
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-sky-700 dark:text-sky-300'
                    }`}
                  >
                    {cylinderCalc.hours > 0
                      ? `${cylinderCalc.hours} sa ${cylinderCalc.remMinutes} dk`
                      : `${cylinderCalc.minutes} dk`}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    (toplam {cylinderCalc.minutes} dk)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className={`rounded-lg border p-2.5 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Kullanılabilir O₂</div>
                    <div className="font-mono font-bold text-sm tabular-nums mt-0.5">
                      {cylinderCalc.usableLiters} L
                    </div>
                  </div>
                  <div className={`rounded-lg border p-2.5 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Toplam Gaz (0 bar)</div>
                    <div className="font-mono font-bold text-sm tabular-nums mt-0.5">
                      {cylinderCalc.totalLiters} L
                    </div>
                  </div>
                </div>

                {(cylinderCalc.isLowPressure || cylinderCalc.isShortDuration) && (
                  <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-2.5 text-xs text-rose-700 dark:text-rose-200 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                    <span>
                      <strong>Kritik Uyarı:</strong> Basınç ≤ 20 bar veya kalan süre &lt; 15 dk! Hasta transportuna
                      başlamadan önce yedek dolu tüp hazırlayın.
                    </span>
                  </div>
                )}

                <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <strong>Transport İncisi:</strong> Pnömatik transport ventilatörleri hasta dakika ventilasyonuna ek
                  olarak iç çalışma gazı (<em>driving gas</em>) tüketebilir; gerçek akımı hesaplarken cihaz tüketimini
                  ekleyin ve daima %25–30 güvenlik payı bırakın.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* BÖLÜM 5: UZUN SÜRELİ OKSİJEN TEDAVİSİ (USOT / LTOT) */}
      {showSection('ltot') && (
        <div className="space-y-6">
          <div className="flex items-baseline justify-between gap-2 px-1">
            <h2 className={`text-lg sm:text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              5. Uzun Süreli Oksijen Tedavisi (USOT / LTOT)
            </h2>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              ATS 2020 · BTS 2015 · GOLD · NOTT / MRC / LOTT
            </span>
          </div>

          {/* 5.1. Definition, Introduction & Landmark Evidence */}
          <section className={`rounded-xl border p-5 sm:p-6 space-y-4 ${surfaceCard}`}>
            <div>
              <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                5.1. Tanım, Klinik Amaç ve Kanıta Dayalı Temel
              </h3>
              <p className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong>Uzun Süreli Oksijen Tedavisi (USOT / LTOT)</strong>, kronik ağır istirahat hipoksemisi olan
                hastalarda arteriyel oksijenasyonu güvenli sınıra (<MedicalText text="P_{a}O_{2} \ge 60" /> mmHg /{' '}
                <MedicalText text="SpO_{2} \ge \%90" />) yükseltmek, hipoksik pulmoner vazokonstriksiyonu ve sağ kalp
                yetmezliği (kor pulmonale) gelişimini yavaşlatmak ve <strong>sağkalımı uzatmak</strong> amacıyla evde
                günde <strong>en az 15 saat</strong> (ideal olarak <strong>15–18+ saat/gün</strong>, uykuyu kapsayacak
                şekilde) uygulanan medikal oksijen tedavisidir.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className={`rounded-xl border p-3.5 space-y-1 ${subtlePanel}`}>
                <div className="font-bold text-emerald-600 dark:text-emerald-400">MRC Çalışması (Lancet, 1981)</div>
                <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Ağır hipoksemik KOAH&apos;ta günde <strong>≥ 15 saat</strong> ev oksijeni alan grupta 5 yıllık
                  mortalitenin anlamlı biçimde azaldığını gösteren ilk dönüm noktası RKÇ.
                </p>
              </div>
              <div className={`rounded-xl border p-3.5 space-y-1 ${subtlePanel}`}>
                <div className="font-bold text-sky-600 dark:text-sky-400">NOTT Çalışması (Ann Intern Med, 1980)</div>
                <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Sürekli (~18–24 saat/gün) oksijen tedavisinin yalnızca gece (12 saat) oksijen tedavisine kıyasla
                  mortaliteyi anlamlı düzeyde daha fazla düşürdüğünü kanıtladı.
                </p>
              </div>
              <div className={`rounded-xl border p-3.5 space-y-1 ${subtlePanel}`}>
                <div className="font-bold text-amber-600 dark:text-amber-400">LOTT Çalışması (NEJM, 2016)</div>
                <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Yalnızca <strong>orta düzey</strong> istirahat desatürasyonu (<MedicalText text="SpO_{2}" /> %89–93)
                  veya izole egzersiz desatürasyonu olan stabil KOAH hastalarında USOT&apos;un sağkalım ya da hastaneye
                  yatışa fayda sağlamadığını gösterdi.
                </p>
              </div>
            </div>
          </section>

          {/* 5.2. Indications & ABG Rules */}
          <section className={`rounded-xl border p-5 sm:p-6 space-y-4 ${surfaceCard}`}>
            <div>
              <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                5.2. USOT Endikasyonları ve Arteriyel Kan Gazı (AKG) Kuralları
              </h3>
              <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                ATS 2020, BTS 2015 ve GOLD 2024/2025 rehberlerine göre kalıcı USOT reçeteleme kriterleri:
              </p>
            </div>

            {/* Prerequisite Banner */}
            <div
              className={`rounded-xl border p-3.5 text-xs sm:text-sm leading-relaxed ${
                isDark
                  ? 'bg-sky-950/30 border-sky-800/70 text-sky-100'
                  : 'bg-sky-50 border-sky-200 text-sky-950'
              }`}
            >
              <strong className="text-sky-700 dark:text-sky-300">Zorunlu Ön Koşul (Stabilite &amp; Çift AKG Kuralı): </strong>
              Kalıcı USOT kararı akut alevlenme sırasında alınan tek AKG ile verilmez. Hasta optimal medikal tedavi
              altında, akut alevlenmeden en az <strong>3–4 hafta</strong> (BTS: ≥ 5 hafta) sonra klinik olarak stabilken,
              oda havasında istirahatte <strong>en az 3 hafta arayla alınmış 2 ayrı AKG</strong> ile kronik hipoksemi
              doğrulanmalıdır. Taburculukta geçici başlanan olgular <strong>60–90 gün</strong> içinde yeniden
              değerlendirilmelidir (GOLD / ATS 2020).
            </div>

            {/* ABG Criteria Table */}
            <div className={`overflow-x-auto rounded-xl border ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <table className="w-full text-xs sm:text-sm border-collapse">
                <thead
                  className={
                    isDark
                      ? 'bg-slate-950 text-slate-200 border-b border-slate-800'
                      : 'bg-slate-100 text-slate-900 border-b border-slate-200'
                  }
                >
                  <tr>
                    <th className="text-left p-3 font-semibold whitespace-nowrap">Endikasyon Grubu</th>
                    <th className="text-left p-3 font-semibold whitespace-nowrap">
                      Oda Havası AKG / <MedicalText text="SpO_{2}" /> Kriteri
                    </th>
                    <th className="text-left p-3 font-semibold">Ek Şart / Klinik Açıklama</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                    <td className="p-3 align-top font-bold text-emerald-600 dark:text-emerald-400">
                      1. Mutlak (Kesin) Endikasyon
                    </td>
                    <td className="p-3 align-top font-mono font-bold tabular-nums whitespace-nowrap">
                      <MedicalText text="P_{a}O_{2} \le 55" /> mmHg (<MedicalText text="\le 7,3" /> kPa)
                      <br />
                      <span className="text-xs font-normal text-slate-500">veya</span>{' '}
                      <MedicalText text="SpO_{2} \le \%88" />
                    </td>
                    <td className="p-3 align-top text-xs leading-relaxed">
                      Hiperkapni olsun veya olmasın <strong>güçlü USOT endikasyonudur</strong> (KOAH ve kronik ağır
                      hipoksemili interstisyel akciğer hastalıkları — ATS 2020 güçlü öneri).
                    </td>
                  </tr>
                  <tr className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                    <td className="p-3 align-top font-bold text-amber-600 dark:text-amber-400">
                      2. Koşullu (Komplikasyonlu) Endikasyon
                    </td>
                    <td className="p-3 align-top font-mono font-bold tabular-nums whitespace-nowrap">
                      <MedicalText text="P_{a}O_{2}\ 56\text{–}59" /> mmHg (7,4–7,9 kPa)
                      <br />
                      <span className="text-xs font-normal text-slate-500">veya</span>{' '}
                      <MedicalText text="SpO_{2} = \%89" />
                    </td>
                    <td className="p-3 align-top text-xs leading-relaxed">
                      Aşağıdakilerden <strong>en az biri</strong> eşlik ediyorsa USOT endikedir:
                      <ul className="list-disc pl-4 mt-1 space-y-0.5">
                        <li>Pulmoner hipertansiyon</li>
                        <li>Sağ kalp yetmezliği / kor pulmonale (periferik ödem, P pulmonale)</li>
                        <li>Sekonder polisitemi (<strong>Hematokrit &gt; %55</strong>)</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                    <td className="p-3 align-top font-bold text-sky-600 dark:text-sky-400">
                      3. KOAH Dışı Kronik Hipoksemi
                    </td>
                    <td className="p-3 align-top font-mono font-semibold tabular-nums whitespace-nowrap">
                      Aynı AKG eşikleri
                    </td>
                    <td className="p-3 align-top text-xs leading-relaxed">
                      İnterstisyel akciğer hastalığı (İAH), kistik fibrozis, pulmoner arteriyel hipertansiyon ve ağır
                      göğüs duvarı deformitesi (kifoskolyoz) olgularında ağır istirahat hipoksemisi varsa endikedir.
                    </td>
                  </tr>
                  <tr className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                    <td className="p-3 align-top font-bold text-rose-600 dark:text-rose-400">
                      4. Rutin Önerilmeyen Durum
                    </td>
                    <td className="p-3 align-top font-mono font-semibold tabular-nums whitespace-nowrap">
                      <MedicalText text="SpO_{2}\ \%89\text{–}93" /> (komplikasyonsuz)
                    </td>
                    <td className="p-3 align-top text-xs leading-relaxed">
                      LOTT çalışması ve ATS 2020 rehberi doğrultusunda, orta düzeyde istirahat hipoksemisi olan
                      komplikasyonsuz stabil KOAH hastalarında <strong>rutin USOT önerilmez</strong>.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Prescription, Titration & Safety Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed">
              <div className={`rounded-xl border p-3.5 space-y-1 ${subtlePanel}`}>
                <div className="font-bold text-sky-600 dark:text-sky-400">Süre ve Hedef Titrasyon</div>
                <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                  Günde <strong>≥ 15 saat</strong> (tercihen 18+ saat) uygulanır. Akım hızı istirahatte{' '}
                  <MedicalText text="P_{a}O_{2} > 60" /> mmHg veya <MedicalText text="SpO_{2} \ge \%90" /> (hiperkapnik
                  KOAH&apos;ta aşırı <MedicalText text="P_{a}CO_{2}" /> artışından kaçınarak genelde %90–92) olacak
                  şekilde titre edilir; uyku ve egzersizde genelde +1 L/dk artış değerlendirilir.
                </p>
              </div>
              <div className={`rounded-xl border p-3.5 space-y-1 ${subtlePanel}`}>
                <div className="font-bold text-emerald-600 dark:text-emerald-400">Evde Cihaz Seçimi</div>
                <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                  Sabit ev kullanımı için standart kaynak <strong>elektrikli oksijen konsantratörüdür</strong> (genelde
                  nazal kanül ile). Ev dışı hareketli hastalarda portatif konsantratör veya sıvı/gaz yedek tüp eklenir.
                </p>
              </div>
              <div className={`rounded-xl border p-3.5 space-y-1 ${subtlePanel}`}>
                <div className="font-bold text-rose-600 dark:text-rose-400">Yangın ve Sigara Güvenliği</div>
                <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                  Oksijen yanıcı değildir ancak yanmayı şiddetle hızlandırır. Aktif sigara kullanımı ve açık alev/ocak
                  yakınında oksijen kullanımı ciddi yüz yanığı ve ölümcül ev yangını riski taşır; hasta/yakınlarına
                  güvenlik eğitimi ve sigara bırakma desteği zorunludur (ATS 2020 / BTS 2015).
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* KAYNAKLAR (Her zaman en altta — Tümü veya Safety/LTOT görünümünde) */}
      {(sectionFilter === 'all' || sectionFilter === 'safety' || sectionFilter === 'ltot') && (
        <section className={`rounded-xl border p-5 sm:p-6 space-y-4 ${surfaceCard}`}>
          <div className="flex items-center gap-2 text-sm font-bold">
            <BookOpen className="w-4 h-4 text-sky-500" />
            <span>Kılavuzlar ve Temel Referans Kaynakları</span>
          </div>
          <ol className="space-y-2.5 text-xs sm:text-sm">
            {OXYGEN_REFERENCES.map((ref, idx) => (
              <li
                key={ref.title}
                className={`flex items-start gap-3 rounded-lg border p-3 ${subtlePanel}`}
              >
                <span className="font-mono text-xs font-bold text-sky-500 mt-0.5 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="leading-relaxed">
                  <span className="font-semibold">{ref.authors}</span>{' '}
                  <span className="italic">{ref.title}</span>{' '}
                  <span className="text-slate-500 dark:text-slate-400">{ref.detail}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
};

export default OxygenTherapyModule;
