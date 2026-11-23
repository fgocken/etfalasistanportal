import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Filter,
  Flame,
  HeartPulse,
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

type OxygenSectionFilter = 'all' | 'targets' | 'devices' | 'perioperative' | 'safety';
type DeviceFilterId = 'all' | 'Düşük Akım (Değişken)' | 'Yüksek Akım (Sabit)' | 'Resüsitasyon / Devre';

export const OxygenTherapyModule: React.FC<OxygenTherapyModuleProps> = ({ isDark }) => {
  const [sectionFilter, setSectionFilter] = useState<OxygenSectionFilter>('all');
  const [selectedProfileId, setSelectedProfileId] = useState<string>(OXYGEN_TARGET_PROFILES[0].id);
  const [deviceFilter, setDeviceFilter] = useState<DeviceFilterId>('all');

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
    { id: 'targets', label: '1. Hedefler & Fizyoloji', icon: HeartPulse },
    { id: 'devices', label: '2. Verme Sistemleri & Ventüri', icon: Wind },
    { id: 'perioperative', label: '3. Perioperatif & Özel', icon: Flame },
    { id: 'safety', label: '4. Güvenlik & Kaynaklar', icon: ShieldAlert },
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
              1. Hedef <MedicalText text="SpO_{2}" />, Oksijen Taşınım Formülleri ve Fizyoloji
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
          </section>

          {/* 1B. CaO2, DO2, VO2, O2ER Formulas & Core Physiology */}
          <section className={`rounded-xl border p-5 sm:p-6 space-y-4 ${surfaceCard}`}>
            <div>
              <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                1.2. Arteriyel Oksijen İçeriği (<MedicalText text="C_{a}O_{2}" />), Sistemik Sunum (
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

          {/* 1C. COPD Hypercapnia 3 Mechanisms + Hyperoxia Harms */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <section className={`rounded-xl border p-5 sm:p-6 space-y-4 ${surfaceCard}`}>
              <div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  1.3. KOAH&apos;ta Oksijen Kaynaklı Hiperkapninin 3 Mekanizması
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
                  1.4. Hiperokseminin Sistemik Zararları ve Kanıta Dayalı Sınırlar
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
              2. Oksijen Verme Sistemleri ve Ventüri (HAFOE) Fiziği
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

          {/* Delivery Systems Comparison Table with Optional Category Filter */}
          <section className={`rounded-xl border p-5 sm:p-6 space-y-4 ${surfaceCard}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  2.2. Oksijen Verme Sistemleri Karşılaştırma Tablosu
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
          </section>

          {/* Venturi Color Codes Table */}
          <section className={`rounded-xl border p-5 sm:p-6 space-y-4 ${surfaceCard}`}>
            <div>
              <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                2.3. Ventüri (HAFOE) Maskesi Renk Kodları, Sürüklenme Oranı ve Toplam Akım Tablosu
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

      {/* BÖLÜM 4: GÜVENLİK, BOARD SINAVI & KAYNAKLAR */}
      {showSection('safety') && (
        <div className="space-y-6">
          <div className="flex items-baseline justify-between gap-2 px-1">
            <h2 className={`text-lg sm:text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              4. Klinik Güvenlik, Board Sınavı Tuzakları ve Kaynaklar
            </h2>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Never Events · EDAIC · ABA · TARD
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
        </div>
      )}
    </div>
  );
};

export default OxygenTherapyModule;
