import React, { useState } from 'react';
import {
  Activity,
  ArrowLeft,
  ChevronRight,
  HeartPulse,
  PlusCircle,
} from 'lucide-react';
import { ShareLinkButton } from '../common/ShareLinkButton';
import { AsaBasicMonitoringInfographic } from '../infographics/AsaBasicMonitoringInfographic';
import { PulseOximetryModule } from './PulseOximetryModule';
import { CapnographyModule } from './CapnographyModule';
import { SpirometryModule } from './SpirometryModule';
import { EcgMonitoringModule } from './EcgMonitoringModule';
import { NibpMonitoringModule } from './NibpMonitoringModule';
import { TemperatureProbesModule } from './TemperatureProbesModule';
import { ClinicalReflexesModule } from './ClinicalReflexesModule';
import { NeuromuscularClinicalModule } from './NeuromuscularClinicalModule';
import { IbpMonitoringModule } from './IbpMonitoringModule';
import { CvpMonitoringModule } from './CvpMonitoringModule';
import { PacMonitoringModule } from './PacMonitoringModule';
import { TeeMonitoringModule } from './TeeMonitoringModule';
import { PulseContourAnalysisModule } from './PulseContourAnalysisModule';
import { TranspulmonaryThermodilutionModule } from './TranspulmonaryThermodilutionModule';
import { BisMonitoringModule } from './BisMonitoringModule';
import { SedlinePsiMonitoringModule } from './SedlinePsiMonitoringModule';
import { NirsCerebralOximetryModule } from './NirsCerebralOximetryModule';
import { MultigasAgentAnalysisModule } from './MultigasAgentAnalysisModule';
import { TranscutaneousCo2Module } from './TranscutaneousCo2Module';
import { EsophagealPressureModule } from './EsophagealPressureModule';
import { EvokedPotentialsModule } from './EvokedPotentialsModule';
import { IcpMonitoringModule } from './IcpMonitoringModule';
import { PeripheralNerveStimulatorModule } from './PeripheralNerveStimulatorModule';
import { QuantitativeNmbMonitorsModule } from './QuantitativeNmbMonitorsModule';
import { IntraoperativeUrineOutputModule } from './IntraoperativeUrineOutputModule';
import { IntraoperativeAbgModule } from './IntraoperativeAbgModule';
import { IntraoperativeBleedingMonitoringModule } from './IntraoperativeBleedingMonitoringModule';
import { ViscoelasticHemostasisModule } from './ViscoelasticHemostasisModule';
import { MedicalText } from '../basics/respiratory/MedicalText';

interface MonitoringWorkspaceProps {
  isDark: boolean;
}

interface MonitoringCardItem {
  id:
    | 'asa-basic-monitoring'
    | 'pulse-oximetry'
    | 'capnography'
    | 'spirometry'
    | 'ecg-monitoring'
    | 'nibp-oscillometric'
    | 'temperature-probes'
    | 'clinical-reflexes'
    | 'neuromuscular-clinical'
    | 'ibp-monitoring'
    | 'cvp-monitoring'
    | 'pac-monitoring'
    | 'tee-monitoring'
    | 'pulse-contour-analysis'
    | 'transpulmonary-thermodilution'
    | 'bis-monitoring'
    | 'sedline-psi'
    | 'nirs-cerebral-oximetry'
    | 'multigas-agent-analysis'
    | 'transcutaneous-co2'
    | 'esophageal-pressure'
    | 'evoked-potentials'
    | 'icp-monitoring'
    | 'peripheral-nerve-stimulator'
    | 'quantitative-nmb-monitors'
    | 'intraoperative-urine-output'
    | 'intraoperative-abg'
    | 'intraoperative-bleeding'
    | 'viscoelastic-hemostasis';
  title: string;
  category: string;
  sourceBadge: string;
  shortDesc: string;
  stripTitle: string;
  publisher: string;
  accent: 'emerald' | 'sky' | 'amber' | 'teal' | 'rose' | 'indigo' | 'orange' | 'violet' | 'cyan' | 'red' | 'blue' | 'fuchsia' | 'purple';
  metrics: {
    label: string;
    value: string;
    colorClass: string;
    bgClass: string;
    borderClass: string;
  }[];
}

const MONITORING_MODULES: MonitoringCardItem[] = [
  {
    id: 'asa-basic-monitoring',
    title: 'ASA Temel Anestezi Monitörizasyon Standartları',
    category: 'Temel Güvenlik',
    sourceBadge: 'ASA Std I–II',
    shortDesc:
      'Standart I (nitelikli personel) ve Standart II (Oksijenasyon, Ventilasyon/EtCO₂, Dolaşım/EKG/≤5 dk NIBP, Sıcaklık), Continuous vs. Continual ayrımı ve anestezi tipine göre canlı monitör simülatörü.',
    stripTitle: 'Standart II · 4 Temel Alan:',
    publisher: 'ASA (2020) · ASA 2023 NMB · AAGBI',
    accent: 'emerald',
    metrics: [
      {
        label: 'Oksijenasyon',
        value: 'FiO₂ + SpO₂',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
      {
        label: 'Ventilasyon',
        value: 'EtCO₂ + Alarm',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Dolaşım',
        value: 'EKG + ≤5 dk',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'Sıcaklık',
        value: 'Koşullu',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
    ],
  },
  {
    id: 'pulse-oximetry',
    title: 'Pulse Oksimetri (SpO₂ & Fotopletismografi)',
    category: 'Oksijenasyon',
    sourceBadge: '6 Bölüm · Simülatör',
    shortDesc:
      'Beer-Lambert (660/940 nm) & AC/DC R-oranı simülatörü, dissosiyasyon eğrisi, prob kurulum şeması, 6 pletismografi dalga formu, COHb/MetHb sapma pusulası ve MRG/termal güvenlik.',
    stripTitle: '6 Bölümlü Çerçeve Özeti:',
    publisher: 'Miller’s · Morgan & Mikhail · FDA',
    accent: 'sky',
    metrics: [
      {
        label: 'Dalga Boyu',
        value: '660 / 940 nm',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
      {
        label: 'İzosbestik',
        value: '805 nm',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'Trase',
        value: '6 Patern',
        colorClass: 'text-cyan-600 dark:text-cyan-400',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30',
      },
      {
        label: 'Tuzaklar',
        value: 'COHb · MetHb',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
    ],
  },
  {
    id: 'capnography',
    title: 'Kapnografi (EtCO₂ & Zaman Kapnogramı)',
    category: 'Ventilasyon',
    sourceBadge: '6 Bölüm · 8 Trase',
    shortDesc:
      '4.26 µm IR spektroskopi, P(a-Et)CO₂ ölü boşluk simülatörü, Mainstream/Sidestream & HMEF kurulumu, 8 interaktif kapnogram (köpekbalığı yüzgeci, kürar, rebreathing, MH, emboli) ve NAP4 güvenliği.',
    stripTitle: '6 Bölümlü Çerçeve Özeti:',
    publisher: 'Miller’s · Kodali · NAP4 / ASA',
    accent: 'amber',
    metrics: [
      {
        label: 'IR Piki',
        value: '4.26 µm',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Normal Δ',
        value: '2–5 mmHg',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'Trase',
        value: '8 Patern',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
      {
        label: 'Kural',
        value: 'No Trace!',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
    ],
  },
  {
    id: 'spirometry',
    title: 'Spirometri (P–V & F–V Döngüleri)',
    category: 'Solunum Mekaniği',
    sourceBadge: '6 Bölüm · 7 Döngü',
    shortDesc:
      'Pnömotakograf (ΔP) & Hot-Wire fiziği, canlı Ppeak/Pplato/ΔP simülatörü, D-Lite/Pedi-Lite kurulumu, 7 interaktif P–V & F–V döngüsü (kuş gagası, scooping, auto-PEEP, kaçak, sawtooth) ve barotravma güvenliği.',
    stripTitle: '6 Bölümlü Çerçeve Özeti:',
    publisher: 'Miller’s · Dorsch · Hess',
    accent: 'teal',
    metrics: [
      {
        label: 'Cstat',
        value: '50–80',
        colorClass: 'text-teal-600 dark:text-teal-400',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30',
      },
      {
        label: 'Raw',
        value: '5–10',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
      {
        label: 'Döngü',
        value: '7 P–V / F–V',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Hedef',
        value: 'ΔP < 15',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
    ],
  },
  {
    id: 'ecg-monitoring',
    title: '3 / 5 Derivasyon EKG (Ritim & ST İskemi İzlemi)',
    category: 'Kardiyak Ritim & İskemi',
    sourceBadge: '6 Bölüm · 8 Trase',
    shortDesc:
      'Einthoven üçgeni, Monitör (0.5–40 Hz) vs Diagnostik (0.05–150 Hz) filtre, canlı IEC ↔ AHA 3/CS5/5-Lead simülatörü, DII + V5 iskemi duyarlılığı, 8 interaktif EKG trasesi, PEA tuzakları ve mikroşok/koter güvenliği.',
    stripTitle: '6 Bölümlü Çerçeve Özeti:',
    publisher: 'Miller’s · London · AHA / ASA',
    accent: 'rose',
    metrics: [
      {
        label: 'DII + V5',
        value: '%80–85',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'Diagnostik',
        value: '0.05–150 Hz',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Trase',
        value: '8 Patern',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'Renk',
        value: 'IEC / AHA',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
    ],
  },
  {
    id: 'nibp-oscillometric',
    title: 'NIBP (Osilometrik Non-İnvaziv Kan Basıncı)',
    category: 'Hemodinami & Perfüzyon',
    sourceBadge: '6 Bölüm · 6 Zarf',
    shortDesc:
      'Transmural basınç (Ptm=0) ve osilasyon zarfı (OMWE), canlı manşon boyutu & hidrostatik hata simülatörü, %40/%80 anatomik kurulum, 6 osilometrik zarf paterni, şokta aşırı tahmin tuzağı ve AV fistül/sinir basısı güvenliği.',
    stripTitle: '6 Bölümlü Çerçeve Özeti:',
    publisher: 'Miller’s · AHA · POQI / ASA',
    accent: 'indigo',
    metrics: [
      {
        label: 'Doğrudan',
        value: 'MAP (Amax)',
        colorClass: 'text-indigo-600 dark:text-indigo-400',
        bgClass: 'bg-indigo-500/10',
        borderClass: 'border-indigo-500/30',
      },
      {
        label: 'Manşon',
        value: '%40 × %80',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'Zarf',
        value: '6 Patern',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Hidrostatik',
        value: '7.4 / 10cm',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
    ],
  },
  {
    id: 'temperature-probes',
    title: 'Kor ve Periferik Sıcaklık Probları',
    category: 'Termoregülasyon',
    sourceBadge: '6 Bölüm · 6 Trend',
    shortDesc:
      'NTC termistör, termokupl, IR & Zero-Heat-Flux (SpotOn) fiziği, canlı Sessler 3-fazlı hipotermi & ΔT simülatörü, distal özofagus/nazofarenks/mesane/timpanik/rektal/cilt yerleşimi, 6 sıcaklık trend eğrisi ve MRG/koter/hosing güvenliği.',
    stripTitle: '6 Bölümlü Çerçeve Özeti:',
    publisher: 'Miller’s · Sessler · NICE NG65',
    accent: 'orange',
    metrics: [
      {
        label: 'Hedef Kor',
        value: '36.0–37.5°C',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'Sensör',
        value: 'NTC · ZHF',
        colorClass: 'text-orange-600 dark:text-orange-400',
        bgClass: 'bg-orange-500/10',
        borderClass: 'border-orange-500/30',
      },
      {
        label: 'Trend',
        value: '6 Eğri',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Şok ΔT',
        value: '> 4.0 °C',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
    ],
  },
  {
    id: 'clinical-reflexes',
    title: 'Klinik Refleksler (Cihazsız Anestezi Derinliği)',
    category: 'Anestezi Derinliği',
    sourceBadge: 'High-Yield · PRST',
    shortDesc:
      'Göz & kraniyal sinir refleksleri (kirpik, kornea, bakış, pupil), hava yolu & somatik refleksler (Çene İtme / Trapezius / Evre II laringospazm) ve canlı PRST (Evans) otonomik skor hesaplayıcısı.',
    stripTitle: 'Klinik Değerlendirme Alanları:',
    publisher: 'Miller’s · Evans (1987) · NAP5',
    accent: 'violet',
    metrics: [
      {
        label: 'Göz / CN',
        value: 'Kirpik·Pupil',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
      {
        label: 'SGA Testi',
        value: 'Çene İtme',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'Otonomik',
        value: 'PRST 0–8',
        colorClass: 'text-violet-600 dark:text-violet-400',
        bgClass: 'bg-violet-500/10',
        borderClass: 'border-violet-500/30',
      },
      {
        label: 'Tuzak',
        value: 'NMB Maskesi',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
    ],
  },
  {
    id: 'neuromuscular-clinical',
    title: 'Nöromüsküler Klinik Değerlendirme',
    category: 'Kas Gücü & Derlenme',
    sourceBadge: 'High-Yield · ASA 2023',
    shortDesc:
      '5 sn baş kaldırma (Head Lift), sürdürülebilir el sıkma / bacak kaldırma ve dil basacağı ısırma testlerinin TOFR eşikleri, gizli RNMB/aspirasyon boşluğu ve interaktif yatak başı risk değerlendiricisi.',
    stripTitle: 'Yatak Başı Klinik Test Eşikleri:',
    publisher: 'ASA 2023 · ESAIC 2023 · Kopman',
    accent: 'cyan',
    metrics: [
      {
        label: 'Baş Kaldır',
        value: 'TOFR ~0.65',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'El / Bacak',
        value: 'TOFR ~0.60',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Dil Basacağı',
        value: 'TOFR ~0.85 ★',
        colorClass: 'text-cyan-600 dark:text-cyan-400',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30',
      },
      {
        label: 'Hedef',
        value: 'TOFR ≥ 0.90',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
    ],
  },
  {
    id: 'ibp-monitoring',
    title: 'İnvaziv Arter Basıncı (IBP & Dinamik Yanıt)',
    category: 'İnvaziv Hemodinami',
    sourceBadge: '6 Bölüm · 8 Trase',
    shortDesc:
      'Wheatstone köprüsü & fn/sönümleme fiziği, canlı Fast-Flush (kare dalga) & transdüser seviye simülatörü, flebostatik vs tragus (beach-chair) sıfırlama, 8 arteriyel dalga formu (under/overdamped, PPV, AS, AY, IABP) ve güvenlik.',
    stripTitle: '6 Bölümlü Çerçeve Özeti:',
    publisher: 'Miller’s · Gardner · Saugel',
    accent: 'red',
    metrics: [
      {
        label: 'Doğal Fr.',
        value: '> 15–20 Hz',
        colorClass: 'text-red-600 dark:text-red-400',
        bgClass: 'bg-red-500/10',
        borderClass: 'border-red-500/30',
      },
      {
        label: 'Sönüm (ζ)',
        value: '0.64–0.70',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'Trase',
        value: '8 Patern',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Yıkama',
        value: '300 mmHg',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
    ],
  },
  {
    id: 'cvp-monitoring',
    title: 'CVP (Santral Venöz Basınç Monitörizasyonu)',
    category: 'Venöz Hemodinami',
    sourceBadge: '6 Bölüm · 7 Trase',
    shortDesc:
      'Guyton venöz dönüş & a-c-x-v-y fazları, canlı PPV/Spontan–PEEP–transdüser seviye simülatörü, karina/intrakaviter EKG uç onayı, 7 eşzamanlı EKG+CVP dalgası (AF, kanon a, TY, tamponad, konstriktif) ve SVK güvenliği.',
    stripTitle: '6 Bölümlü Çerçeve Özeti:',
    publisher: 'Miller’s · Marik · ASA 2020',
    accent: 'blue',
    metrics: [
      {
        label: 'Normal',
        value: '2–8 mmHg',
        colorClass: 'text-blue-600 dark:text-blue-400',
        bgClass: 'bg-blue-500/10',
        borderClass: 'border-blue-500/30',
      },
      {
        label: 'Ölçüm',
        value: 'Eksp. Sonu',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'Trase',
        value: '7 Patern',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Sıvı Yanıtı',
        value: 'AUC 0.56',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
    ],
  },
  {
    id: 'pac-monitoring',
    title: 'Pulmoner Arter Kateteri (PAC / Swan-Ganz)',
    category: 'İleri Hemodinami',
    sourceBadge: '6 Bölüm · 7 Trase',
    shortDesc:
      'West Zone III & Stewart-Hamilton termodilüsyon fiziği, canlı CO/CI–SVR–PVR–PAPi şok profili simülatörü, 4-lümen Swan-Ganz anatomisi, 7 senkron trase (RA→RV→PA→PAOP, dev v, overwedging, RV slip-back) ve PA rüptürü / LBBB güvenliği.',
    stripTitle: '6 Bölümlü Çerçeve Özeti:',
    publisher: 'Miller’s · ASA · ESC/ERS',
    accent: 'fuchsia',
    metrics: [
      {
        label: 'PAP',
        value: '25/10 mmHg',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'PAOP',
        value: '6–12 mmHg',
        colorClass: 'text-fuchsia-600 dark:text-fuchsia-400',
        bgClass: 'bg-fuchsia-500/10',
        borderClass: 'border-fuchsia-500/30',
      },
      {
        label: 'CI',
        value: '2.5–4.0',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'SvO₂',
        value: '%65–75',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
    ],
  },
  {
    id: 'tee-monitoring',
    title: 'TEE (Transözofageal Ekokardiyografi)',
    category: 'Kardiyak Görüntüleme',
    sourceBadge: '6 Bölüm · 7 Kesit',
    shortDesc:
      '5–7 MHz akustik pencere, canlı Doppler açı (cos θ), LVOT VTI & Bernoulli (sPAP) simülatörü, UE/ME/TG/DTG prob manipülasyonu, 7 interaktif TEE penceresi (Kissing LV, RWMA, Masif PE, Tamponad, Tip A Diseksiyon, VAE) ve özofagus güvenliği.',
    stripTitle: '6 Bölümlü Çerçeve Özeti:',
    publisher: 'ASE / SCA · ASA · Miller’s',
    accent: 'purple',
    metrics: [
      {
        label: 'Frekans',
        value: '5–7 MHz',
        colorClass: 'text-purple-600 dark:text-purple-400',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/30',
      },
      {
        label: 'Omniplane',
        value: '0°–180°',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
      {
        label: 'Kesit',
        value: '7 Rescue',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'LVOT VTI',
        value: '18–22 cm',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
    ],
  },
  {
    id: 'pulse-contour-analysis',
    title: 'Nabız Kontur Analizi (SVV / PPV)',
    category: 'Dinamik Hemodinami',
    sourceBadge: 'Sistematik · Canlı Lab',
    shortDesc:
      'Windkessel & sistolik alan fiziği, canlı kalp–akciğer / Frank–Starling laboratuvarı, Ea_{dyn} (PPV/SVV), 8 geçerlilik ön koşulu denetleyicisi, Gri Bölge (%9–%13), TVC/PLR/EEOT testleri ve kalibre–kalibresiz sistemler.',
    stripTitle: 'Sistematik İçerik Özeti:',
    publisher: 'Michard · Cannesson · Saugel 2021',
    accent: 'teal',
    metrics: [
      {
        label: 'Gri Bölge',
        value: '%9 – %13',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Yanıtlı',
        value: '> %13',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'Ea_{dyn}',
        value: 'PPV / SVV',
        colorClass: 'text-teal-600 dark:text-teal-400',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30',
      },
      {
        label: 'Ön Koşul',
        value: '8 Kriter',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
    ],
  },
  {
    id: 'transpulmonary-thermodilution',
    title: 'Transpulmoner Termodilüsyon (TPTD · PiCCO / VolumeView)',
    category: 'İleri Hemodinami',
    sourceBadge: 'Sistematik · Profil Lab',
    shortDesc:
      'Stewart–Hamilton & MTt/DSt fiziği, GEDVI (volümetrik önyük) ve PBW indeksli EVLWI (akciğer suyu), PVPI ≥ 3,0 ile kardiyojenik vs. ARDS ödem ayrımı, canlı profil laboratuvarı ve femoral/PE/ECMO tuzakları.',
    stripTitle: 'Volümetrik & Permeabilite Özeti:',
    publisher: 'Sakka · Monnet · ESICM 2014',
    accent: 'cyan',
    metrics: [
      {
        label: 'GEDVI',
        value: '680–800',
        colorClass: 'text-cyan-600 dark:text-cyan-400',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30',
      },
      {
        label: 'EVLWI',
        value: '3–7 PBW',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'PVPI (ARDS)',
        value: '≥ 3,0',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'GEF / CFI',
        value: '%25–35',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
    ],
  },
  {
    id: 'bis-monitoring',
    title: 'BIS Monitörizasyonu (Bispektral İndeks & EEG)',
    category: 'Anestezi Derinliği',
    sourceBadge: 'Sistematik · EEG / DSA',
    shortDesc:
      'BetaRatio/SynchFastSlow/BSR fiziği, canlı ham frontal EEG + DSA spektrogram simülatörü, 4 elektrotlu Quatro sensör yerleşimi, Ketamin/Deksmedetomidin/Schuller NMB tuzakları ve B-Aware / BAG-RECALL / ENGAGES kanıtları.',
    stripTitle: 'Sistematik İçerik Özeti:',
    publisher: 'Purdon · B-Aware · BAG-RECALL',
    accent: 'violet',
    metrics: [
      {
        label: 'Cerrahi',
        value: '40 – 60',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'SQI / EMG',
        value: '>%50 · <50dB',
        colorClass: 'text-violet-600 dark:text-violet-400',
        bgClass: 'bg-violet-500/10',
        borderClass: 'border-violet-500/30',
      },
      {
        label: 'Hedef SR',
        value: '%0 (BSR)',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'Gecikme',
        value: '15–30 sn',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
    ],
  },
  {
    id: 'sedline-psi',
    title: 'SedLine / PSI (4-Kanal Bilateral EEG & DSA)',
    category: 'Anestezi Derinliği',
    sourceBadge: 'Sistematik · Bilateral',
    shortDesc:
      'PSI 25–50 hedefi (BIS 40–60 farkı), canlı 4-kanal Sol/Sağ ham EEG + Ayna Multitaper DSA ve ASYM laboratuvarı, 6 elektrotlu (Fp1/Fp2/F7/F8/CB/CT) sensör yerleşimi, karotis iskemi asimetrisi ve Next-Gen EMG direnci.',
    stripTitle: 'Sistematik İçerik Özeti:',
    publisher: 'Masimo · Prichep · Purdon',
    accent: 'indigo',
    metrics: [
      {
        label: 'Hedef PSI',
        value: '25 – 50',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'Kanal',
        value: '4-Ch Bilat.',
        colorClass: 'text-indigo-600 dark:text-indigo-400',
        bgClass: 'bg-indigo-500/10',
        borderClass: 'border-indigo-500/30',
      },
      {
        label: 'DSA / SEF',
        value: 'L / R Ayna',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
      {
        label: 'Hedef SR',
        value: '%0 · ASYM',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
    ],
  },
  {
    id: 'nirs-cerebral-oximetry',
    title: 'Serebral Oksimetri (NIRS / rSO₂)',
    category: 'Serebral Perfüzyon',
    sourceBadge: 'Sistematik · Denault',
    shortDesc:
      '700–900 nm muz şekilli SRS optik yolu, non-pulsatil (~%70–75 venöz) ölçüm, canlı bilateral rSO₂ trend & fizyoloji laboratuvarı, INVOS/FORE-SIGHT/O3 karşılaştırması, fenilefrin paradoksu ve Denault 7-basamaklı algoritması.',
    stripTitle: 'Sistematik İçerik Özeti:',
    publisher: 'Denault · Murkin · Bickler',
    accent: 'sky',
    metrics: [
      {
        label: 'Normal',
        value: '%60 – %80',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
      {
        label: 'Bağıl Eşik',
        value: 'Δ ≥ %20 ↓',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Mutlak',
        value: '< %50',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'Kompartman',
        value: '~%70 Venöz',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
    ],
  },
  {
    id: 'multigas-agent-analysis',
    title: 'Anestezik Ajan Gaz Analizi (Multigaz)',
    category: 'Solunum Gazları & MAC',
    sourceBadge: 'Sistematik · MAC-Age',
    shortDesc:
      '8–12 µm NDIR parmak izi Auto-ID & paramanyetik O₂ fiziği, canlı Mapleson MAC-Age ve FiAA/EtAA laboratuvarı, HMEF sidestream örnekleme, düşük akım güvenliği, Mixed Agent tuzakları ve BAG-RECALL ≥ 0.7 MAC protokolü.',
    stripTitle: 'Sistematik İçerik Özeti:',
    publisher: 'Mapleson · BAG-RECALL · Feldman',
    accent: 'amber',
    metrics: [
      {
        label: 'IR Bant',
        value: '8 – 12 µm',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'O₂ Sensör',
        value: 'Paramanyetik',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
      {
        label: 'ETAG Alt',
        value: '≥ 0.7 MAC',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'Pre-O₂',
        value: 'EtO₂ ≥ %85',
        colorClass: 'text-indigo-600 dark:text-indigo-400',
        bgClass: 'bg-indigo-500/10',
        borderClass: 'border-indigo-500/30',
      },
    ],
  },
  {
    id: 'transcutaneous-co2',
    title: 'Transkütanöz Karbondioksit (TcCO₂ / PtcCO₂)',
    category: 'Non-İnvaziv Ventilasyon',
    sourceBadge: 'Sistematik · AARC',
    shortDesc:
      'Stow–Severinghaus pH elektrodu & 42°C arteriyelizasyon fiziği, canlı PaCO₂–TcCO₂–EtCO₂ gradyan ve şok perfüzyon laboratuvarı, OLV/Jet/NIV/OSAS üstünlüğü, termal yanık rotasyonu ve AARC 2012 / Conway 2019 kanıtları.',
    stripTitle: 'Sistematik İçerik Özeti:',
    publisher: 'AARC 2012 · Conway · Oshibuchi',
    accent: 'teal',
    metrics: [
      {
        label: 'Sensör Isı',
        value: '42 – 43 °C',
        colorClass: 'text-orange-600 dark:text-orange-400',
        bgClass: 'bg-orange-500/10',
        borderClass: 'border-orange-500/30',
      },
      {
        label: 'Gecikme',
        value: '1 – 3 dk',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Normal Δ',
        value: '+2–5 mmHg',
        colorClass: 'text-teal-600 dark:text-teal-400',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30',
      },
      {
        label: 'Tuzak',
        value: 'Şok ↑ / Yanık',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
    ],
  },
  {
    id: 'esophageal-pressure',
    title: 'Özofageal Basınç Monitörizasyonu (P_{es} / Transpulmoner Basınç)',
    category: 'İleri Solunum Mekaniği',
    sourceBadge: 'Sistematik · Baydur',
    shortDesc:
      'Göğüs duvarı (P_{cw}) ile akciğer stresini (P_{L} = P_{aw} − P_{es}) ayırma, canlı 3-trase P_{aw}/P_{es}/P_{L} & P-SILI laboratuvarı, Baydur oklüzyon doğrulama (0.8–1.2), morbid obez/İAH PEEP titrasyonu ve EPVent / EPVent-2 / PLUG kanıtları.',
    stripTitle: 'Sistematik İçerik Özeti:',
    publisher: 'PLUG · EPVent · Baydur',
    accent: 'cyan',
    metrics: [
      {
        label: 'P_{L,ee}',
        value: '0 .. +2',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'P_{L,ei}',
        value: '< 20–25',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'ΔP_{L}',
        value: '< 10–12',
        colorClass: 'text-cyan-600 dark:text-cyan-400',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30',
      },
      {
        label: 'Baydur',
        value: '0.8 – 1.2',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
    ],
  },
  {
    id: 'evoked-potentials',
    title: 'Uyarılmış Potansiyeller (SSEP & MEP · IONM)',
    category: 'Nöromonitörizasyon',
    sourceBadge: 'Sistematik · TIVA',
    shortDesc:
      'Dorsal kolon (SSEP · PSA) vs. kortikospinal yol (TcMEP / D-dalgası · ASA), canlı 3-kanallı SSEP/TcMEP/D-dalgası & anestezi laboratuvarı, TIVA farmakolojisi, Vitale alarm kontrol listesi ve ısırık bloğu güvenliği.',
    stripTitle: 'Sistematik İçerik Özeti:',
    publisher: 'ISIN · ASNM · ACNS · Vitale',
    accent: 'violet',
    metrics: [
      {
        label: 'SSEP Alarm',
        value: '50% ↓ / 10% ↑',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
      {
        label: 'Rejim',
        value: 'Saf TIVA',
        colorClass: 'text-violet-600 dark:text-violet-400',
        bgClass: 'bg-violet-500/10',
        borderClass: 'border-violet-500/30',
      },
      {
        label: 'NMB (MEP)',
        value: 'TOF 4/4',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'Kriz MAP',
        value: '≥ 85–90',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
    ],
  },
  {
    id: 'icp-monitoring',
    title: 'İntrakraniyal Basınç (ICP) Monitörizasyonu',
    category: 'Nöroanestezi & Nöro-YBÜ',
    sourceBadge: 'Sistematik · SIBICC',
    shortDesc:
      'Monro–Kellie doktrini & CPP = MAP − ICP, canlı P_{1}/P_{2}/P_{3} dalga morfolojisi ve kompliyans eğrisi laboratuvarı, EVD vs. parankimal prob & tragus sıfırlama, SIBICC Tier 0–3 algoritması ve BTF 4. Ed kanıtları.',
    stripTitle: 'Sistematik İçerik Özeti:',
    publisher: 'BTF 4. Ed · SIBICC · Czosnyka',
    accent: 'indigo',
    metrics: [
      {
        label: 'Eşik ICP',
        value: '> 22 mmHg',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'Hedef CPP',
        value: '60 – 70',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'Kompliyans',
        value: 'P_{2} > P_{1}',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Sıfırlama',
        value: 'Tragus',
        colorClass: 'text-indigo-600 dark:text-indigo-400',
        bgClass: 'bg-indigo-500/10',
        borderClass: 'border-indigo-500/30',
      },
    ],
  },
  {
    id: 'peripheral-nerve-stimulator',
    title: 'Periferik Sinir Stimülatörü (TOF · PTC · DBS)',
    category: 'Nöromüsküler İzlem',
    sourceBadge: 'ASA / ESAIC 2023',
    shortDesc:
      'TOF (2 Hz), PTC (50 Hz + 1 Hz), DBS_{3,3} fiziği, canlı nöromüsküler blok & Sugammadeks/Neostigmin laboratuvarı, ulnar sinir–adduktor pollisis yerleşimi, EMG vs. AMG ve kalitatif kör nokta.',
    stripTitle: 'Sistematik İçerik Özeti:',
    publisher: 'ASA 2023 · ESAIC 2023 · Naguib',
    accent: 'emerald',
    metrics: [
      {
        label: 'Ekstübasyon',
        value: 'TOFR ≥ 0.90',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'Derin Blok',
        value: 'PTC ≥ 1–2',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Bölge',
        value: 'Adduktor P.',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
      {
        label: 'Patern',
        value: 'TOF·PTC·DBS',
        colorClass: 'text-violet-600 dark:text-violet-400',
        bgClass: 'bg-violet-500/10',
        borderClass: 'border-violet-500/30',
      },
    ],
  },
  {
    id: 'quantitative-nmb-monitors',
    title: 'Kantitatif Nöromüsküler Monitörler (AMG · EMG · KMG)',
    category: 'Kantitatif NMB Teknolojisi',
    sourceBadge: 'Sistematik · 3-Kanal Lab',
    shortDesc:
      'Akseleromiyografi (F=m·a), Elektromiyografi (cMAP), Kinemiyografi (MechanoSensor) ve MMG fiziği, canlı 3-kanallı normalizasyon & örtülü kol laboratuvarı, Capron ≥ 1.00 kuralı ve cihaz seçim matriksi.',
    stripTitle: 'Sistematik İçerik Özeti:',
    publisher: 'Capron · Claudius · Bowdle · ASA 2023',
    accent: 'sky',
    metrics: [
      {
        label: 'EMG (Örtülü)',
        value: 'cMAP · ≥0.90',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
      {
        label: 'AMG (Ham)',
        value: 'TOFR ≥ 1.00',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'AMG (Norm.)',
        value: 'nTOFR ≥ 0.90',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'KMG',
        value: 'Piezo Şerit',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
    ],
  },
  {
    id: 'intraoperative-urine-output',
    title: 'İntraoperatif İdrar Çıkışı (Foley) Takibi',
    category: 'Renal Perfüzyon & Sıvı',
    sourceBadge: 'Yatak Başı · KDIGO',
    shortDesc:
      'Hızlı mL/kg/sa hesaplayıcı, oligüriye 4 basamaklı pratik yaklaşım (Foley kontrol → RPP → ADH/pnömoperitonyum → KDIGO diüretik kuralı), Mizota < 0.3 eşiği, kateter güvenliği ve idrar rengi tablosu.',
    stripTitle: 'Pratik Eşikler & Kurallar:',
    publisher: 'KDIGO · Mizota 2017 · RELIEF · ERAS',
    accent: 'amber',
    metrics: [
      {
        label: 'Erişkin',
        value: '≥ 0.5 mL/kg',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'ABH Eşiği',
        value: '< 0.3 mL/kg',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'Pediatrik',
        value: '≥ 1.0 mL/kg',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
      {
        label: 'Balon',
        value: '10 mL Su',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
    ],
  },
  {
    id: 'intraoperative-abg',
    title: 'İntraoperatif Arter Kan Gazı (AKG) Takibi',
    category: 'Gaz Değişimi & Asit-Baz',
    sourceBadge: 'Yatak Başı · AARC',
    shortDesc:
      'Örnekleme endikasyonları & sıklığı, akut kanamada Hb/Hct düşüş zamanlaması, Oksihemoglobin Dissosiyasyon Eğrisi (ODC / P₅₀), Alpha-Stat vs. pH-Stat ve pre-analitik SF/heparin/kabarcık tuzakları.',
    stripTitle: 'Pratik Eşikler & Kurallar:',
    publisher: 'AARC 2013 · Baird · SMART 2018',
    accent: 'rose',
    metrics: [
      {
        label: 'P(a−Et)CO₂',
        value: '2–5 mmHg',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
      {
        label: 'ODC P₅₀',
        value: '26.6 mmHg',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'iCa²⁺',
        value: '1.15–1.30',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'CPB / Isı',
        value: 'Alpha / pH',
        colorClass: 'text-indigo-600 dark:text-indigo-400',
        bgClass: 'bg-indigo-500/10',
        borderClass: 'border-indigo-500/30',
      },
    ],
  },
  {
    id: 'intraoperative-bleeding',
    title: 'İntraoperatif Kanama Takibi (EBL · QBL · MABL)',
    category: 'Hemostaz & Volüm',
    sourceBadge: 'Yatak Başı · ESAIC',
    shortDesc:
      'EBV ve Gross MABL hesaplayıcı, aspiratör/spanç/gravimetrik (QBL) toplayıcı, görsel spanç & göllenme hacimleri, gizli kanama, ATLS 10, cerrahi vs. koagülopatik ayrım ve MTP (1:1:1 · ROTEM) uygulaması.',
    stripTitle: 'Pratik Eşikler & Kurallar:',
    publisher: 'Gross · Bose · ACOG 794 · ESAIC',
    accent: 'red',
    metrics: [
      {
        label: '4×4 Spanç',
        value: '10 mL',
        colorClass: 'text-red-600 dark:text-red-400',
        bgClass: 'bg-red-500/10',
        borderClass: 'border-red-500/30',
      },
      {
        label: 'Batın Pedi',
        value: '100–150 mL',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'QBL Tartım',
        value: '1 g ≈ 1 mL',
        colorClass: 'text-emerald-600 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'Fibrinojen',
        value: '> 1.5–2 g/L',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
    ],
  },
  {
    id: 'viscoelastic-hemostasis',
    title: 'Viskoelastik Testler (TEG & ROTEM) Rehberliğinde Hemostaz',
    category: 'Koagülasyon & Hemostaz',
    sourceBadge: 'ESAIC 2023 · A5',
    shortDesc:
      'Normal TEG/ROTEM anatomisi, 12 klinik koagülopati patern atlası (dilüsyonel, hiperkoagülabilite, DIC, protamin overdozu, FXIII, PPH), Görlinger A5 algoritması, kör noktalar ve TEG/ROTEM yoksa hemostaz yönetimi.',
    stripTitle: 'Sistematik İçerik Özeti:',
    publisher: 'ESAIC 2023 · Rossaint · Görlinger',
    accent: 'fuchsia',
    metrics: [
      {
        label: 'Fibrinojen',
        value: 'FIB A5 < 10',
        colorClass: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Trombosit',
        value: 'EX A5 < 35',
        colorClass: 'text-sky-600 dark:text-sky-400',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
      {
        label: 'Faktör',
        value: 'CT > 80 sn',
        colorClass: 'text-violet-600 dark:text-violet-400',
        bgClass: 'bg-violet-500/10',
        borderClass: 'border-violet-500/30',
      },
      {
        label: 'Lizis',
        value: 'ML > %15',
        colorClass: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
    ],
  },
];

const BASIC_MODULE_ORDER: MonitoringCardItem['id'][] = [
  'asa-basic-monitoring',
  'pulse-oximetry',
  'ecg-monitoring',
  'nibp-oscillometric',
  'capnography',
  'multigas-agent-analysis',
  'spirometry',
  'temperature-probes',
  'intraoperative-bleeding',
  'intraoperative-urine-output',
  'clinical-reflexes',
  'neuromuscular-clinical',
];

const ADVANCED_MODULE_ORDER: MonitoringCardItem['id'][] = [
  'ibp-monitoring',
  'intraoperative-abg',
  'cvp-monitoring',
  'bis-monitoring',
  'peripheral-nerve-stimulator',
  'quantitative-nmb-monitors',
  'pulse-contour-analysis',
  'transpulmonary-thermodilution',
  'nirs-cerebral-oximetry',
  'sedline-psi',
  'viscoelastic-hemostasis',
  'tee-monitoring',
  'icp-monitoring',
  'evoked-potentials',
  'pac-monitoring',
  'transcutaneous-co2',
  'esophageal-pressure',
];

export const MonitoringWorkspace: React.FC<MonitoringWorkspaceProps> = ({ isDark }) => {
  const [activeModuleId, setActiveModuleId] = useState<MonitoringCardItem['id'] | null>(null);
  const [tierFilter, setTierFilter] = useState<'all' | 'basic' | 'advanced'>('all');

  const selectedModule = MONITORING_MODULES.find((item) => item.id === activeModuleId) ?? null;

  const moduleMap = new Map(MONITORING_MODULES.map((m) => [m.id, m]));
  const basicModules = BASIC_MODULE_ORDER.map((id) => moduleMap.get(id)).filter(
    (m): m is MonitoringCardItem => Boolean(m)
  );
  const advancedModules = ADVANCED_MODULE_ORDER.map((id) => moduleMap.get(id)).filter(
    (m): m is MonitoringCardItem => Boolean(m)
  );

  return (
    <div
      className={`rounded-xl border p-5 sm:p-6 space-y-6 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}
    >
      {/* Top Header */}
      <div
        className={`border-b pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}
      >
        <div className="flex items-center gap-3">
          {activeModuleId ? (
            <button
              type="button"
              onClick={() => setActiveModuleId(null)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
              title="Monitörizasyon ve İntraoperatif Takip panosuna geri dön"
            >
              <ArrowLeft className="w-5 h-5 text-emerald-500" />
            </button>
          ) : (
            <div
              className={`p-2.5 rounded-xl border ${
                isDark
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}
            >
              <HeartPulse className="w-6 h-6" />
            </div>
          )}

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className={`text-base sm:text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {selectedModule ? <MedicalText text={selectedModule.title} /> : 'Monitörizasyon ve İntraoperatif Takip'}
              </h2>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                  selectedModule?.accent === 'sky'
                    ? isDark
                      ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                      : 'bg-sky-50 text-sky-700 border-sky-200'
                    : selectedModule?.accent === 'amber'
                      ? isDark
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                      : selectedModule?.accent === 'teal'
                        ? isDark
                          ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
                          : 'bg-teal-50 text-teal-700 border-teal-200'
                        : selectedModule?.accent === 'rose'
                          ? isDark
                            ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                          : selectedModule?.accent === 'indigo'
                            ? isDark
                              ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                              : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : selectedModule?.accent === 'orange'
                              ? isDark
                                ? 'bg-orange-500/15 text-orange-300 border-orange-500/30'
                                : 'bg-orange-50 text-orange-700 border-orange-200'
                              : selectedModule?.accent === 'violet'
                                ? isDark
                                  ? 'bg-violet-500/15 text-violet-300 border-violet-500/30'
                                  : 'bg-violet-50 text-violet-700 border-violet-200'
                                : selectedModule?.accent === 'cyan'
                                  ? isDark
                                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                                    : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                                  : selectedModule?.accent === 'red'
                                    ? isDark
                                      ? 'bg-red-500/15 text-red-300 border-red-500/30'
                                      : 'bg-red-50 text-red-700 border-red-200'
                                    : selectedModule?.accent === 'blue'
                                      ? isDark
                                        ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                                        : 'bg-blue-50 text-blue-700 border-blue-200'
                                      : selectedModule?.accent === 'fuchsia'
                                        ? isDark
                                          ? 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30'
                                          : 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200'
                                        : selectedModule?.accent === 'purple'
                                          ? isDark
                                            ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                                            : 'bg-purple-50 text-purple-700 border-purple-200'
                                          : isDark
                                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                {selectedModule ? selectedModule.sourceBadge : 'Kart Panosu'}
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {selectedModule
                ? 'Kart panosuna dönmek için sol üstteki geri butonunu kullanabilirsiniz.'
                : 'Perioperatif Hasta Güvenliği, Monitörizasyon & İntraoperatif Takip Modülleri'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <ShareLinkButton
            type={activeModuleId === 'asa-basic-monitoring' ? 'infografik' : 'arac'}
            id={activeModuleId === 'asa-basic-monitoring' ? 'asa-basic-monitoring' : 'monitoring'}
            isDark={isDark}
            variant="compact"
            title={
              selectedModule
                ? `${selectedModule.title} Bağlantısını Paylaş`
                : 'Monitörizasyon ve İntraoperatif Takip Bağlantısını Paylaş'
            }
          />
          {activeModuleId && (
            <button
              type="button"
              onClick={() => setActiveModuleId(null)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-500" />
              <span>Tüm Kartlara Dön</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: Card Board Gallery */}
      {!activeModuleId && (() => {
        const renderCard = (card: MonitoringCardItem, orderBadge?: string) => {
          const accentCardClass =
            card.accent === 'sky'
              ? isDark
                ? 'bg-slate-900/90 border-slate-800 hover:border-sky-500/50 hover:bg-slate-800/60 shadow-xs focus-visible:ring-sky-500'
                : 'bg-white border-slate-200 hover:border-sky-400 hover:shadow-md focus-visible:ring-sky-500'
              : card.accent === 'amber'
                ? isDark
                  ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/60 shadow-xs focus-visible:ring-amber-500'
                  : 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-md focus-visible:ring-amber-500'
                : card.accent === 'teal'
                  ? isDark
                    ? 'bg-slate-900/90 border-slate-800 hover:border-teal-500/50 hover:bg-slate-800/60 shadow-xs focus-visible:ring-teal-500'
                    : 'bg-white border-slate-200 hover:border-teal-400 hover:shadow-md focus-visible:ring-teal-500'
                  : card.accent === 'rose'
                    ? isDark
                      ? 'bg-slate-900/90 border-slate-800 hover:border-rose-500/50 hover:bg-slate-800/60 shadow-xs focus-visible:ring-rose-500'
                      : 'bg-white border-slate-200 hover:border-rose-400 hover:shadow-md focus-visible:ring-rose-500'
                    : card.accent === 'indigo'
                      ? isDark
                        ? 'bg-slate-900/90 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/60 shadow-xs focus-visible:ring-indigo-500'
                        : 'bg-white border-slate-200 hover:border-indigo-400 hover:shadow-md focus-visible:ring-indigo-500'
                      : card.accent === 'orange'
                        ? isDark
                          ? 'bg-slate-900/90 border-slate-800 hover:border-orange-500/50 hover:bg-slate-800/60 shadow-xs focus-visible:ring-orange-500'
                          : 'bg-white border-slate-200 hover:border-orange-400 hover:shadow-md focus-visible:ring-orange-500'
                        : card.accent === 'violet'
                          ? isDark
                            ? 'bg-slate-900/90 border-slate-800 hover:border-violet-500/50 hover:bg-slate-800/60 shadow-xs focus-visible:ring-violet-500'
                            : 'bg-white border-slate-200 hover:border-violet-400 hover:shadow-md focus-visible:ring-violet-500'
                          : card.accent === 'cyan'
                            ? isDark
                              ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 shadow-xs focus-visible:ring-cyan-500'
                              : 'bg-white border-slate-200 hover:border-cyan-400 hover:shadow-md focus-visible:ring-cyan-500'
                            : card.accent === 'red'
                              ? isDark
                                ? 'bg-slate-900/90 border-slate-800 hover:border-red-500/50 hover:bg-slate-800/60 shadow-xs focus-visible:ring-red-500'
                                : 'bg-white border-slate-200 hover:border-red-400 hover:shadow-md focus-visible:ring-red-500'
                              : card.accent === 'blue'
                                ? isDark
                                  ? 'bg-slate-900/90 border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/60 shadow-xs focus-visible:ring-blue-500'
                                  : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md focus-visible:ring-blue-500'
                                : card.accent === 'fuchsia'
                                  ? isDark
                                    ? 'bg-slate-900/90 border-slate-800 hover:border-fuchsia-500/50 hover:bg-slate-800/60 shadow-xs focus-visible:ring-fuchsia-500'
                                    : 'bg-white border-slate-200 hover:border-fuchsia-400 hover:shadow-md focus-visible:ring-fuchsia-500'
                                  : card.accent === 'purple'
                                    ? isDark
                                      ? 'bg-slate-900/90 border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/60 shadow-xs focus-visible:ring-purple-500'
                                      : 'bg-white border-slate-200 hover:border-purple-400 hover:shadow-md focus-visible:ring-purple-500'
                                    : isDark
                                      ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/60 shadow-xs focus-visible:ring-emerald-500'
                                      : 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-md focus-visible:ring-emerald-500';

          const categoryBadgeClass =
            card.accent === 'sky'
              ? 'bg-sky-500/15 text-sky-700 dark:text-sky-300'
              : card.accent === 'amber'
                ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
                : card.accent === 'teal'
                  ? 'bg-teal-500/15 text-teal-700 dark:text-teal-300'
                  : card.accent === 'rose'
                    ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
                    : card.accent === 'indigo'
                      ? 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300'
                      : card.accent === 'orange'
                        ? 'bg-orange-500/15 text-orange-700 dark:text-orange-300'
                        : card.accent === 'violet'
                          ? 'bg-violet-500/15 text-violet-700 dark:text-violet-300'
                          : card.accent === 'cyan'
                            ? 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300'
                            : card.accent === 'red'
                              ? 'bg-red-500/15 text-red-700 dark:text-red-300'
                              : card.accent === 'blue'
                                ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300'
                                : card.accent === 'fuchsia'
                                  ? 'bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300'
                                  : card.accent === 'purple'
                                    ? 'bg-purple-500/15 text-purple-700 dark:text-purple-300'
                                    : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300';

          const titleHoverClass =
            card.accent === 'sky'
              ? 'group-hover:text-sky-600 dark:group-hover:text-sky-400'
              : card.accent === 'amber'
                ? 'group-hover:text-amber-600 dark:group-hover:text-amber-400'
                : card.accent === 'teal'
                  ? 'group-hover:text-teal-600 dark:group-hover:text-teal-400'
                  : card.accent === 'rose'
                    ? 'group-hover:text-rose-600 dark:group-hover:text-rose-400'
                    : card.accent === 'indigo'
                      ? 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                      : card.accent === 'orange'
                        ? 'group-hover:text-orange-600 dark:group-hover:text-orange-400'
                        : card.accent === 'violet'
                          ? 'group-hover:text-violet-600 dark:group-hover:text-violet-400'
                          : card.accent === 'cyan'
                            ? 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
                            : card.accent === 'red'
                              ? 'group-hover:text-red-600 dark:group-hover:text-red-400'
                              : card.accent === 'blue'
                                ? 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                : card.accent === 'fuchsia'
                                  ? 'group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400'
                                  : card.accent === 'purple'
                                    ? 'group-hover:text-purple-600 dark:group-hover:text-purple-400'
                                    : 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400';

          const iconAccentClass =
            card.accent === 'sky'
              ? 'text-sky-500'
              : card.accent === 'amber'
                ? 'text-amber-500'
                : card.accent === 'teal'
                  ? 'text-teal-500'
                  : card.accent === 'rose'
                    ? 'text-rose-500'
                    : card.accent === 'indigo'
                      ? 'text-indigo-500'
                      : card.accent === 'orange'
                        ? 'text-orange-500'
                        : card.accent === 'violet'
                          ? 'text-violet-500'
                          : card.accent === 'cyan'
                            ? 'text-cyan-500'
                            : card.accent === 'red'
                              ? 'text-red-500'
                              : card.accent === 'blue'
                                ? 'text-blue-500'
                                : card.accent === 'fuchsia'
                                  ? 'text-fuchsia-500'
                                  : card.accent === 'purple'
                                    ? 'text-purple-500'
                                    : 'text-emerald-500';

          const ctaAccentClass =
            card.accent === 'sky'
              ? 'text-sky-600 dark:text-sky-400'
              : card.accent === 'amber'
                ? 'text-amber-600 dark:text-amber-400'
                : card.accent === 'teal'
                  ? 'text-teal-600 dark:text-teal-400'
                  : card.accent === 'rose'
                    ? 'text-rose-600 dark:text-rose-400'
                    : card.accent === 'indigo'
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : card.accent === 'orange'
                        ? 'text-orange-600 dark:text-orange-400'
                        : card.accent === 'violet'
                          ? 'text-violet-600 dark:text-violet-400'
                          : card.accent === 'cyan'
                            ? 'text-cyan-600 dark:text-cyan-400'
                            : card.accent === 'red'
                              ? 'text-red-600 dark:text-red-400'
                              : card.accent === 'blue'
                                ? 'text-blue-600 dark:text-blue-400'
                                : card.accent === 'fuchsia'
                                  ? 'text-fuchsia-600 dark:text-fuchsia-400'
                                  : card.accent === 'purple'
                                    ? 'text-purple-600 dark:text-purple-400'
                                    : 'text-emerald-600 dark:text-emerald-400';

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setActiveModuleId(card.id)}
              className={`group relative p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer select-none focus:outline-none focus-visible:ring-2 ${accentCardClass}`}
            >
              <div>
                {/* Top Category & Source Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {orderBadge && (
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                          isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {orderBadge}
                      </span>
                    )}
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold truncate ${categoryBadgeClass}`}>
                      {card.category}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono font-bold shrink-0">
                    {card.sourceBadge}
                  </span>
                </div>

                {/* Title & Summary */}
                <h3 className={`text-sm font-bold transition-colors ${titleHoverClass} ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <MedicalText text={card.title} />
                </h3>
                <p className={`text-xs mt-1.5 leading-relaxed line-clamp-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <MedicalText text={card.shortDesc} />
                </p>

                {/* Mini Preview Strip */}
                <div className={`mt-4 pt-3 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-100'}`}>
                  <div className="text-[10px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                    <Activity className={`w-3 h-3 ${iconAccentClass}`} />
                    <span>{card.stripTitle}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center">
                    {card.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className={`px-1 py-1 rounded-lg border text-[10px] font-mono ${metric.bgClass} ${metric.borderClass}`}
                      >
                        <div className={`font-semibold text-[9px] truncate ${metric.colorClass}`}>
                          <MedicalText text={metric.label} />
                        </div>
                        <div className="text-[9px] font-bold text-slate-500 dark:text-slate-400 truncate">
                          <MedicalText text={metric.value} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div
                className={`mt-4 pt-3 border-t flex items-center justify-between text-xs ${
                  isDark ? 'border-slate-800' : 'border-slate-100'
                }`}
              >
                <span className="text-[11px] text-slate-400 font-medium truncate max-w-[150px] sm:max-w-none">
                  {card.publisher}
                </span>
                <span className={`font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0 ${ctaAccentClass}`}>
                  <span>Modülü Aç</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          );
        };

        return (
          <div className="space-y-7">
            {/* Tier Filter Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {(
                  [
                    { id: 'all', label: `Tümü (${MONITORING_MODULES.length})` },
                    { id: 'basic', label: `Temel Monitörizasyon & Takip (${basicModules.length})` },
                    { id: 'advanced', label: `İleri Yöntemler · Sıklık Sıralı (${advancedModules.length})` },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTierFilter(opt.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      tierFilter === opt.id
                        ? isDark
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                          : 'bg-emerald-50 border-emerald-400 text-emerald-900'
                        : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                İncelemek istediğiniz kartın üzerine tıklayın
              </span>
            </div>

            {/* SECTION 1: TEMEL MONİTÖRİZASYON VE RUTİN İNTRAOPERATİF TAKİP */}
            {(tierFilter === 'all' || tierFilter === 'basic') && (
              <section className="space-y-3.5">
                <div
                  className={`flex flex-wrap items-end justify-between gap-2 pb-2.5 border-b ${
                    isDark ? 'border-slate-800' : 'border-slate-200'
                  }`}
                >
                  <div>
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      01 · Temel Düzey
                    </div>
                    <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Temel Monitörizasyon ve Rutin İntraoperatif Takip
                    </h3>
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      ASA standartları, solunum ve dolaşım rutinleri, kanama/idrar takibi ve cihazsız klinik değerlendirme
                    </p>
                  </div>
                  <span
                    className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border ${
                      isDark
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    }`}
                  >
                    {basicModules.length} Temel Modül
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {basicModules.map((card) => renderCard(card))}
                </div>
              </section>
            )}

            {/* SECTION 2: İLERİ MONİTÖRİZASYON YÖNTEMLERİ (SIKLIK SIRALI) */}
            {(tierFilter === 'all' || tierFilter === 'advanced') && (
              <section className="space-y-3.5">
                <div
                  className={`flex flex-wrap items-end justify-between gap-2 pb-2.5 border-b ${
                    isDark ? 'border-slate-800' : 'border-slate-200'
                  }`}
                >
                  <div>
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      02 · İleri Düzey · Klinik Kullanım Sıklığına Göre Sıralı
                    </div>
                    <h3 className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      İleri Monitörizasyon Yöntemleri
                    </h3>
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Ameliyathane ve yoğun bakımda en sık kullanılandan (IBP · AKG · CVP · BIS) en spesifik yöntemlere (PAC · TcCO₂ · Özofageal Basınç) sıralanmıştır
                    </p>
                  </div>
                  <span
                    className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border ${
                      isDark
                        ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
                        : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    }`}
                  >
                    {advancedModules.length} İleri Modül · En Sık → Nadir
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {advancedModules.map((card, idx) => renderCard(card, `#${idx + 1}`))}

                  {/* Future Slot Card */}
                  <div
                    className={`rounded-2xl border border-dashed flex flex-col items-center justify-center text-center p-6 transition-colors ${
                      isDark
                        ? 'border-slate-800 bg-slate-900/30 text-slate-500'
                        : 'border-slate-200 bg-slate-50/50 text-slate-400'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-xl mb-2 ${
                        isDark ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-400 shadow-xs'
                      }`}
                    >
                      <PlusCircle className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <div className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Yeni Monitörizasyon Kartları
                    </div>
                    <p className={`text-[11px] mt-1 max-w-[230px] leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      Ek yoğun bakım ve ileri perioperatif takip modülleri buraya eklenecektir.
                    </p>
                  </div>
                </div>
              </section>
            )}
          </div>
        );
      })()}

      {/* VIEW 2: Active Module Details */}
      {activeModuleId === 'asa-basic-monitoring' && (
        <AsaBasicMonitoringInfographic isDark={isDark} />
      )}
      {activeModuleId === 'pulse-oximetry' && (
        <PulseOximetryModule isDark={isDark} />
      )}
      {activeModuleId === 'capnography' && (
        <CapnographyModule isDark={isDark} />
      )}
      {activeModuleId === 'spirometry' && (
        <SpirometryModule isDark={isDark} />
      )}
      {activeModuleId === 'ecg-monitoring' && (
        <EcgMonitoringModule isDark={isDark} />
      )}
      {activeModuleId === 'nibp-oscillometric' && (
        <NibpMonitoringModule isDark={isDark} />
      )}
      {activeModuleId === 'temperature-probes' && (
        <TemperatureProbesModule isDark={isDark} />
      )}
      {activeModuleId === 'clinical-reflexes' && (
        <ClinicalReflexesModule isDark={isDark} />
      )}
      {activeModuleId === 'neuromuscular-clinical' && (
        <NeuromuscularClinicalModule isDark={isDark} />
      )}
      {activeModuleId === 'ibp-monitoring' && (
        <IbpMonitoringModule isDark={isDark} />
      )}
      {activeModuleId === 'cvp-monitoring' && (
        <CvpMonitoringModule isDark={isDark} />
      )}
      {activeModuleId === 'pac-monitoring' && (
        <PacMonitoringModule isDark={isDark} />
      )}
      {activeModuleId === 'tee-monitoring' && (
        <TeeMonitoringModule isDark={isDark} />
      )}
      {activeModuleId === 'pulse-contour-analysis' && (
        <PulseContourAnalysisModule isDark={isDark} />
      )}
      {activeModuleId === 'transpulmonary-thermodilution' && (
        <TranspulmonaryThermodilutionModule isDark={isDark} />
      )}
      {activeModuleId === 'bis-monitoring' && (
        <BisMonitoringModule isDark={isDark} />
      )}
      {activeModuleId === 'sedline-psi' && (
        <SedlinePsiMonitoringModule isDark={isDark} />
      )}
      {activeModuleId === 'nirs-cerebral-oximetry' && (
        <NirsCerebralOximetryModule isDark={isDark} />
      )}
      {activeModuleId === 'multigas-agent-analysis' && (
        <MultigasAgentAnalysisModule isDark={isDark} />
      )}
      {activeModuleId === 'transcutaneous-co2' && (
        <TranscutaneousCo2Module isDark={isDark} />
      )}
      {activeModuleId === 'esophageal-pressure' && (
        <EsophagealPressureModule isDark={isDark} />
      )}
      {activeModuleId === 'evoked-potentials' && (
        <EvokedPotentialsModule isDark={isDark} />
      )}
      {activeModuleId === 'icp-monitoring' && (
        <IcpMonitoringModule isDark={isDark} />
      )}
      {activeModuleId === 'peripheral-nerve-stimulator' && (
        <PeripheralNerveStimulatorModule isDark={isDark} />
      )}
      {activeModuleId === 'quantitative-nmb-monitors' && (
        <QuantitativeNmbMonitorsModule isDark={isDark} />
      )}
      {activeModuleId === 'intraoperative-urine-output' && (
        <IntraoperativeUrineOutputModule isDark={isDark} />
      )}
      {activeModuleId === 'intraoperative-abg' && (
        <IntraoperativeAbgModule isDark={isDark} />
      )}
      {activeModuleId === 'intraoperative-bleeding' && (
        <IntraoperativeBleedingMonitoringModule isDark={isDark} />
      )}
      {activeModuleId === 'viscoelastic-hemostasis' && (
        <ViscoelasticHemostasisModule isDark={isDark} />
      )}
    </div>
  );
};
