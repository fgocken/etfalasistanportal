import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Activity, 
  Phone, 
  Calculator, 
  Droplet, 
  BookOpen, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  AlertCircle, 
  Syringe,
  ShieldAlert,
  GripVertical,
  RotateCcw,
  ClipboardCheck,
  BarChart3,
  Instagram,
  Calendar,
  FileSpreadsheet,
  Search,
  Wind,
  Pill,
  Compass,
  Zap,
  Library,
  ShieldCheck,
  FlaskConical,
  Gauge,
  Headphones,
  HelpCircle,
  HeartPulse,
  BookOpenCheck
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LiveClock } from './LiveClock';
import { DutyRosterModal } from './roster/DutyRosterModal'; /* [MODULAR_DUTY_ROSTER] */
import { PortalSearchModal } from './search/PortalSearchModal';
import { DashboardSearchBar } from './search/DashboardSearchBar';
import { PortalSearchItem } from '../data/portalSearchIndex';
import { FluidManagementStrategiesInfographic } from './infographics/FluidManagementStrategiesInfographic';
import { InfusionRateCalculator } from './calculators/InfusionRateCalculator';
import { PreoperativeEvaluation, PreopToolId } from './preop/PreoperativeEvaluation';
import { WeightFluidCalculator } from './calculator/WeightFluidCalculator';
import { AirwayManagementView, AirwayCardId } from './airway/AirwayManagementView';
import { TreatmentsWorkspace } from './treatments/TreatmentsWorkspace';
import { NerveBlocksWorkspace } from './nerve-blocks/NerveBlocksWorkspace';
import { AnesthesiaEmergenciesView } from './emergencies/AnesthesiaEmergenciesView';
import { InfographicsView } from './infographics/InfographicsView';
import { ClinicContactsView } from './directory/ClinicContactsView';
import { DutyRosterToolView } from './roster/DutyRosterToolView'; /* [MODULAR_DUTY_ROSTER: Full Tool View] */
import { WeeklyScheduleToolView } from './schedule/WeeklyScheduleToolView';
import { IcuWorkspace } from './icu/IcuWorkspace';
import { ProceduresWorkspace } from './procedures/ProceduresWorkspace';
import { EktTrackerView } from './ekt/EktTrackerView';
import { ReferencesLibraryView } from './references/ReferencesLibraryView';
import { VascularAccessWorkspace } from './vascular/VascularAccessWorkspace';
import { BedsideAbgAnalyzer } from './labs/BedsideAbgAnalyzer';
import { MechanicalVentilationWorkspace } from './ventilation/MechanicalVentilationWorkspace';
import { MonitoringWorkspace } from './monitoring/MonitoringWorkspace';
import { PodcastWorkspace } from './podcast/PodcastWorkspace';
import { QuestionBankWorkspace } from './question-bank/QuestionBankWorkspace';
import { BasicsWorkspace } from './basics/BasicsWorkspace';
import { CampusWeatherBar } from './campus/CampusWeatherBar'; /* [MODULAR_CAMPUS_WIDGET: Unified Weather & Nav Bar] */
import { ShareLinkButton } from './common/ShareLinkButton';
import { ParsedHashRoute, updateHashRoute, parseHashRoute } from '../utils/deepLink';

export type ToolTabId = 'calculator' | 'abg' | 'mechanical-ventilation' | 'monitoring' | 'basics' | 'intraop' | 'infusion' | 'preop' | 'airway' | 'treatments' | 'nerve-blocks' | 'vascular-access' | 'emergencies' | 'infographics' | 'podcast' | 'question-bank' | 'contacts' | 'roster' | 'schedule' | 'icu' | 'procedures' | 'ekt' | 'references';

export interface ToolItemDef {
  id: ToolTabId;
  title: string;
  badge?: string;
  badgeHighlight?: boolean;
  desc: string;
  clinicalKey?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBgDark: string;
  iconBgLight: string;
  iconColorDark: string;
  iconColorLight: string;
  borderHoverDark: string;
  borderHoverLight: string;
  titleHoverDark: string;
  titleHoverLight: string;
  ringClassDark?: string;
  ringClassLight?: string;
}

export const ALL_CLINICAL_TOOLS: Record<ToolTabId, ToolItemDef> = {
  calculator: {
    id: 'calculator',
    title: 'Kilo, MV Volüm, İdame Sıvı',
    desc: 'İdeal Kilo (IBW Devine), VKİ ve Düzeltilmiş Kilo (AdjBW). ARDSnet 6–8 mL/kg akciğer koruyucu tidal volüm ve Holliday-Segar (4-2-1) saatlik idame sıvı hesabı.',
    clinicalKey: 'Akciğer koruyucu ventilasyonda gerçek kilo değil, mutlaka PBW (öngörülen kilo) baz alınmalıdır.',
    icon: Calculator,
    iconBgDark: 'bg-teal-500/10',
    iconBgLight: 'bg-teal-50',
    iconColorDark: 'text-teal-400',
    iconColorLight: 'text-teal-700',
    borderHoverDark: 'hover:border-teal-500/40',
    borderHoverLight: 'hover:border-teal-400',
    titleHoverDark: 'group-hover:text-teal-300',
    titleHoverLight: 'group-hover:text-teal-800'
  },
  abg: {
    id: 'abg',
    title: 'Yatak Başı Kan Gazı Analizi',
    badge: 'AKG · Stewart',
    badgeHighlight: true,
    desc: 'Henderson-Hasselbalch tutarlılığı, Winter/Boston kompanzasyonu, Figge albümin düzeltmeli anyon açığı, Delta oranı, Story (BJA) Stewart SBE dökümü, CaO₂, P/F, A–a gradiyenti, VBG çevrimi ve seri trend karşılaştırması.',
    clinicalKey: 'Hipoalbüminemi ve eş zamanlı metabolik alkalozun gizlediği yüksek anyon açıklı asidozları Stewart SBE ve Delta oranı ile açığa çıkarır.',
    icon: FlaskConical,
    iconBgDark: 'bg-teal-500/15',
    iconBgLight: 'bg-teal-50',
    iconColorDark: 'text-teal-400',
    iconColorLight: 'text-teal-700',
    borderHoverDark: 'hover:border-teal-500/40',
    borderHoverLight: 'hover:border-teal-400',
    titleHoverDark: 'group-hover:text-teal-300',
    titleHoverLight: 'group-hover:text-teal-800',
    ringClassDark: 'ring-1 ring-teal-500/20',
    ringClassLight: 'ring-1 ring-teal-500/10'
  },
  'mechanical-ventilation': {
    id: 'mechanical-ventilation',
    title: 'Solunumsal Destek',
    badge: 'Oksijen Tedavisi Aktif',
    badgeHighlight: true,
    desc: 'Solunumsal destek kart panosu: Klinik ve Perioperatif Oksijen Tedavisi (BTS hedefleri, CaO₂/DO₂/VO₂ formülleri, KOAH hiperkapni fizyolojisi, Ventüri/HAFOE, preoksijenasyon, apneik O₂), HFNC, NIV ve mekanik ventilasyon modülleri.',
    clinicalKey: '01 · Klinik ve Perioperatif Oksijen Tedavisi modülü yayında: hedef SpO₂, temel formüller, ekipmanlar ve perioperatif güvenlik.',
    icon: Gauge,
    iconBgDark: 'bg-sky-500/15',
    iconBgLight: 'bg-sky-50',
    iconColorDark: 'text-sky-400',
    iconColorLight: 'text-sky-700',
    borderHoverDark: 'hover:border-sky-500/40',
    borderHoverLight: 'hover:border-sky-400',
    titleHoverDark: 'group-hover:text-sky-300',
    titleHoverLight: 'group-hover:text-sky-800',
    ringClassDark: 'ring-1 ring-sky-500/20',
    ringClassLight: 'ring-1 ring-sky-500/10'
  },
  monitoring: {
    id: 'monitoring',
    title: 'Monitörizasyon ve İntraoperatif Takip',
    desc: 'Perioperatif monitörizasyon ve intraoperatif takip panosu: ASA Standartları, SpO₂, Kapnografi, Spirometri, EKG, NIBP, IBP, CVP, PAC, TEE, SVV/PPV, Transpulmoner Termodilüsyon (PiCCO / VolumeView), BIS, SedLine/PSI, NIRS, Multigaz, TcCO₂, Özofageal Basınç, SSEP/MEP, ICP, TOF/AMG/EMG, Foley İdrar, AKG, Kanama Takibi ve TEG/ROTEM.',
    clinicalKey: 'Temel, invaziv hemodinamik, nöromonitörizasyon, solunum mekaniği ve intraoperatif yatak başı takip modülleri.',
    icon: HeartPulse,
    iconBgDark: 'bg-emerald-500/15',
    iconBgLight: 'bg-emerald-50',
    iconColorDark: 'text-emerald-400',
    iconColorLight: 'text-emerald-700',
    borderHoverDark: 'hover:border-emerald-500/40',
    borderHoverLight: 'hover:border-emerald-400',
    titleHoverDark: 'group-hover:text-emerald-300',
    titleHoverLight: 'group-hover:text-emerald-800',
    ringClassDark: 'ring-1 ring-emerald-500/20',
    ringClassLight: 'ring-1 ring-emerald-500/10'
  },
  basics: {
    id: 'basics',
    title: 'Temel Bilgiler',
    badge: 'Solunum & Kardiyovasküler · 17 Bölüm',
    badgeHighlight: true,
    desc: 'Anesteziyoloji ve reanimasyon temel bilimler kart panosu: Solunum Fizyolojisi (8 bölüm + 5 şematik görsel) ve Kardiyovasküler Fizyoloji (9 bölüm + 6 şematik görsel).',
    clinicalKey: "West's, Nunn's, Klabunde, Guyton & Hall, Miller's, Kaplan's ve Morgan & Mikhail kaynaklarından sistematik düz okuma özetleri.",
    icon: BookOpenCheck,
    iconBgDark: 'bg-sky-500/15',
    iconBgLight: 'bg-sky-50',
    iconColorDark: 'text-sky-400',
    iconColorLight: 'text-sky-700',
    borderHoverDark: 'hover:border-sky-500/40',
    borderHoverLight: 'hover:border-sky-400',
    titleHoverDark: 'group-hover:text-sky-300',
    titleHoverLight: 'group-hover:text-sky-800',
    ringClassDark: 'ring-1 ring-sky-500/20',
    ringClassLight: 'ring-1 ring-sky-500/10'
  },
  intraop: {
    id: 'intraop',
    title: 'İntraoperatif Sıvı Yönetimi: Liberal vs Restriktif vs GDFT',
    badge: 'ERAS · POQI',
    desc: 'Liberal (4-2-1 + 3. boşluk hesaplayıcı), Restriktif (Sıfır-Denge) ve Hedefe Yönelik (GDFT) sıvı stratejilerinin 12 parametreli kıyaslama tablosu ve intraop uygulama rehberi.',
    clinicalKey: 'Liberal Sıvı Yönetimi seçildiğinde NPO açığı ve cerrahi doku travmasına göre saat saat infüzyon hesaplayıcısı açılır.',
    icon: Droplet,
    iconBgDark: 'bg-cyan-500/10',
    iconBgLight: 'bg-cyan-50',
    iconColorDark: 'text-cyan-400',
    iconColorLight: 'text-cyan-700',
    borderHoverDark: 'hover:border-cyan-500/40',
    borderHoverLight: 'hover:border-cyan-400',
    titleHoverDark: 'group-hover:text-cyan-300',
    titleHoverLight: 'group-hover:text-cyan-800'
  },
  infusion: {
    id: 'infusion',
    title: 'İnfüzyon Hızı Çevirici/Hesaplayıcı',
    desc: 'İlaç konsantrasyonu, mL/saat debi ve mcg/kg/dk arasında anlık iki yönlü çevrim. Canlı damla sayacı ve vazoaktif/inotrop pompa ayarları.',
    clinicalKey: '11 farklı doz birimi arasında hatasız dönüşüm ile pompa ayarlarında aritmetik hata riskini sıfırlar.',
    icon: Syringe,
    iconBgDark: 'bg-teal-500/15',
    iconBgLight: 'bg-teal-50',
    iconColorDark: 'text-teal-400',
    iconColorLight: 'text-teal-700',
    borderHoverDark: 'hover:border-teal-500/40',
    borderHoverLight: 'hover:border-teal-400',
    titleHoverDark: 'group-hover:text-teal-300',
    titleHoverLight: 'group-hover:text-teal-800',
    ringClassDark: 'ring-1 ring-teal-500/20',
    ringClassLight: 'ring-1 ring-teal-500/10'
  },
  preop: {
    id: 'preop',
    title: 'Preoperatif Değerlendirme',
    desc: 'STOP-BANG (OSAS & OHS) hesaplayıcı ve rehberi, MACE kardiyak risk analizi (RCRI & Gupta), Duke Activity Status Index (DASI / METs), açlık kılavuzları ve güncel 2025/2026 ASA sınıflaması.',
    clinicalKey: 'Elektif cerrahi öncesi OSAS/OHS solunum riski (STOP-BANG), fonksiyonel kapasite (DASI) ve kardiyak morbidite öngörüsü sağlar.',
    icon: ClipboardCheck,
    iconBgDark: 'bg-blue-500/15',
    iconBgLight: 'bg-blue-50',
    iconColorDark: 'text-blue-400',
    iconColorLight: 'text-blue-700',
    borderHoverDark: 'hover:border-blue-500/40',
    borderHoverLight: 'hover:border-blue-400',
    titleHoverDark: 'group-hover:text-blue-300',
    titleHoverLight: 'group-hover:text-blue-800',
    ringClassDark: 'ring-1 ring-blue-500/20',
    ringClassLight: 'ring-1 ring-blue-500/10'
  },
  airway: {
    id: 'airway',
    title: 'Havayolu',
    desc: 'Zor maske ve entübasyon öngörü kriterleri (Mallampati, Tiromental, ULBT), Videolaringoskopi / SGA basamakları ve acil cerrahi havayolu protokolü.',
    clinicalKey: 'Entübe edilemez / havalandırılamaz (CICO) durumunda saniyeler içinde acil krikotiroidotomi eylem planı.',
    icon: Wind,
    iconBgDark: 'bg-cyan-500/15',
    iconBgLight: 'bg-cyan-50',
    iconColorDark: 'text-cyan-400',
    iconColorLight: 'text-cyan-700',
    borderHoverDark: 'hover:border-cyan-500/40',
    borderHoverLight: 'hover:border-cyan-400',
    titleHoverDark: 'group-hover:text-cyan-300',
    titleHoverLight: 'group-hover:text-cyan-800',
    ringClassDark: 'ring-1 ring-cyan-500/20',
    ringClassLight: 'ring-1 ring-cyan-500/10'
  },
  treatments: {
    id: 'treatments',
    title: 'Tedaviler ve İlaçlar',
    desc: 'Noradrenalin, Adrenalin (Epinefrin), Deksmedetomidin, Propofol, Midazolam, Lidokain, Ketamin monografları ile Sodyum, Magnezyum ve Potasyum replasman hesaplayıcıları.',
    clinicalKey: 'Hiponatremide aşırı hızlı düzeltmeden kaçınma, katekolamin infüzyon/push-dose güvenliği ve kanıta dayalı elektrolit replasmanı.',
    icon: Pill,
    iconBgDark: 'bg-teal-500/15',
    iconBgLight: 'bg-teal-50',
    iconColorDark: 'text-teal-400',
    iconColorLight: 'text-teal-700',
    borderHoverDark: 'hover:border-teal-500/40',
    borderHoverLight: 'hover:border-teal-400',
    titleHoverDark: 'group-hover:text-teal-300',
    titleHoverLight: 'group-hover:text-teal-800',
    ringClassDark: 'ring-1 ring-teal-500/20',
    ringClassLight: 'ring-1 ring-teal-500/10'
  },
  'nerve-blocks': {
    id: 'nerve-blocks',
    title: 'Nöraksiyel (Spinal, Epidural, Kaudal), Sinir Blokları & LAST',
    desc: 'Nöraksiyel Anestezi Kütüphanesi (Spinal anestezi klinik talimatı, Epidural, KSE, Kaudal), USG eşliğinde periferik/fasya blokları, LA toksik dozları ve %20 İntralipid LAST kurtarma kılavuzu.',
    clinicalKey: 'Nöraksiyel (Spinal/Epidural/Kaudal) blok standartları, USG periferik bloklar ve LAST krizinde İntralipid kurtarma basamakları.',
    icon: Compass,
    iconBgDark: 'bg-indigo-500/15',
    iconBgLight: 'bg-indigo-50',
    iconColorDark: 'text-indigo-400',
    iconColorLight: 'text-indigo-700',
    borderHoverDark: 'hover:border-indigo-500/40',
    borderHoverLight: 'hover:border-indigo-400',
    titleHoverDark: 'group-hover:text-indigo-300',
    titleHoverLight: 'group-hover:text-indigo-800',
    ringClassDark: 'ring-1 ring-indigo-500/20',
    ringClassLight: 'ring-1 ring-indigo-500/10'
  },
  'vascular-access': {
    id: 'vascular-access',
    title: 'Güvenli Vasküler Erişim',
    badge: 'IV · SVK · Arteriyel',
    badgeHighlight: true,
    desc: 'Periferik IV kanülasyon (14G–26G, Poiseuille r⁴/L, 7 Fr SVK kıyası, DIVA), USG ve Landmark metodu ile SVK (ventilasyon tedbirleri) ile İnvaziv Arteriyel Kanülasyon (Radiyal, Brakiyal, Femoral, Aksiller; transdüser sıfırlama ve kare dalga testi).',
    clinicalKey: 'Periferik IV akım fiziği, USG/Landmark SVK yaklaşımları, Brakiyal/Radiyal/Femoral arteriyel monitörizasyon, kare dalga sönümleme ve Never Event güvenliği.',
    icon: ShieldCheck,
    iconBgDark: 'bg-sky-500/15',
    iconBgLight: 'bg-sky-50',
    iconColorDark: 'text-sky-400',
    iconColorLight: 'text-sky-700',
    borderHoverDark: 'hover:border-sky-500/40',
    borderHoverLight: 'hover:border-sky-400',
    titleHoverDark: 'group-hover:text-sky-300',
    titleHoverLight: 'group-hover:text-sky-800',
    ringClassDark: 'ring-1 ring-sky-500/20',
    ringClassLight: 'ring-1 ring-sky-500/10'
  },
  emergencies: {
    id: 'emergencies',
    title: 'Anestezi Acilleri',
    desc: 'Malign hipertermi kriz yönetimi (Dantrolen hazırlığı & soğutma), perioperatif kardiyak arrest (ACLS), şiddetli anafilaksi (İM adrenalin) ve kriz algoritmaları.',
    clinicalKey: 'Ameliyathane krizlerinde gecikmeksizin uygulanacak öncelikli adım adım medikal eylem kontrol listeleri.',
    icon: ShieldAlert,
    iconBgDark: 'bg-red-500/15',
    iconBgLight: 'bg-red-50',
    iconColorDark: 'text-red-400',
    iconColorLight: 'text-red-700',
    borderHoverDark: 'hover:border-red-500/40',
    borderHoverLight: 'hover:border-red-400',
    titleHoverDark: 'group-hover:text-red-300',
    titleHoverLight: 'group-hover:text-red-800',
    ringClassDark: 'ring-1 ring-red-500/20',
    ringClassLight: 'ring-1 ring-red-500/10'
  },
  infographics: {
    id: 'infographics',
    title: 'Klinik İnfografikler',
    badge: 'İnfografikler',
    badgeHighlight: true,
    desc: 'Zor havayolu algoritmaları, preoperatif açlık süreleri (2-4-6-8 kuralı), masif transfüzyon protokolü ve perioperatif risk sınıflamaları görsel rehberi.',
    clinicalKey: 'Hızlı görsel hafıza ve vaka öncesi hazırlık için yüksek çözünürlüklü asistan infografik arşivi.',
    icon: BarChart3,
    iconBgDark: 'bg-violet-500/15',
    iconBgLight: 'bg-violet-50',
    iconColorDark: 'text-violet-400',
    iconColorLight: 'text-violet-700',
    borderHoverDark: 'hover:border-violet-500/40',
    borderHoverLight: 'hover:border-violet-400',
    titleHoverDark: 'group-hover:text-violet-300',
    titleHoverLight: 'group-hover:text-violet-800',
    ringClassDark: 'ring-1 ring-violet-500/20',
    ringClassLight: 'ring-1 ring-violet-500/10'
  },
  podcast: {
    id: 'podcast',
    title: 'Etfal Anestezi Podcast',
    badge: '2 Kanal · Spotify',
    badgeHighlight: true,
    desc: 'Çömez Podcast Kanalı (temel anestezi & ilk nöbetler) ve İleri Düzey Podcast Kanalı (Miller’s Anesthesia serisi): hız kontrollü (1x–2x) yerleşik oynatıcı, kaldığı yerden devam, kategori filtresi ve notlar.',
    clinicalKey: 'Çömez ve İleri Düzey kanallarına eklenen yeni Spotify bölümleri portala otomatik olarak yansır.',
    icon: Headphones,
    iconBgDark: 'bg-violet-500/15',
    iconBgLight: 'bg-violet-50',
    iconColorDark: 'text-violet-400',
    iconColorLight: 'text-violet-700',
    borderHoverDark: 'hover:border-violet-500/40',
    borderHoverLight: 'hover:border-violet-400',
    titleHoverDark: 'group-hover:text-violet-300',
    titleHoverLight: 'group-hover:text-violet-800',
    ringClassDark: 'ring-1 ring-violet-500/20',
    ringClassLight: 'ring-1 ring-violet-500/10'
  },
  'question-bank': {
    id: 'question-bank',
    title: 'Soru Bankası',
    badge: 'High-Yield D/Y',
    badgeHighlight: true,
    desc: 'Miller\'s Anesthesia kaynaklı yüksek verimli (high-yield) Doğru/Yanlış setleri, anlık açıklamalı çalışma, sınav modu, yanlış tekrarı ve yeni set ekleme.',
    clinicalKey: 'Anlık çözüm + sınav analizi + metin yapıştırarak yeni set ekleme desteğiyle aktif.',
    icon: HelpCircle,
    iconBgDark: 'bg-indigo-500/15',
    iconBgLight: 'bg-indigo-50',
    iconColorDark: 'text-indigo-400',
    iconColorLight: 'text-indigo-700',
    borderHoverDark: 'hover:border-indigo-500/40',
    borderHoverLight: 'hover:border-indigo-400',
    titleHoverDark: 'group-hover:text-indigo-300',
    titleHoverLight: 'group-hover:text-indigo-800',
    ringClassDark: 'ring-1 ring-indigo-500/20',
    ringClassLight: 'ring-1 ring-indigo-500/10'
  },
  contacts: {
    id: 'contacts',
    title: 'Klinik ve Dahili Hatlar',
    badge: 'Dahili Hatlar',
    badgeHighlight: true,
    desc: 'Seyrantepe ve Çayırbaşı yerleşkeleri ameliyathane salonları, anestezi odaları, YBÜ, kan merkezi, radyoloji ve nöbetçi kıdemli hızlı dahili rehberi.',
    clinicalKey: 'Kritik vaka içi bildirimlerde ve acil konsültasyonlarda yerleşkeler arası tek tıkla dahili arama.',
    icon: Phone,
    iconBgDark: 'bg-indigo-500/10',
    iconBgLight: 'bg-indigo-50',
    iconColorDark: 'text-indigo-400',
    iconColorLight: 'text-indigo-700',
    borderHoverDark: 'hover:border-teal-500/40',
    borderHoverLight: 'hover:border-teal-400',
    titleHoverDark: 'group-hover:text-teal-300',
    titleHoverLight: 'group-hover:text-teal-800'
  },
  roster: {
    id: 'roster',
    title: 'Asistan Nöbet Çizelgesi',
    badge: 'Ekim 2026',
    badgeHighlight: true,
    desc: 'Seyrantepe ve Çayırbaşı güncel aylık asistan nöbet listesi, salon dağılımları, hekim nöbet takas yönetimi ve Excel (.xlsx) dışa/içe aktarma desteği.',
    clinicalKey: 'Klinik içi nöbet organizasyonu, günlük nöbetçi hekim listesi ve adil çalışma düzeni takibi.',
    icon: Calendar,
    iconBgDark: 'bg-emerald-500/15',
    iconBgLight: 'bg-emerald-50',
    iconColorDark: 'text-emerald-400',
    iconColorLight: 'text-emerald-700',
    borderHoverDark: 'hover:border-emerald-500/40',
    borderHoverLight: 'hover:border-emerald-400',
    titleHoverDark: 'group-hover:text-emerald-300',
    titleHoverLight: 'group-hover:text-emerald-800',
    ringClassDark: 'ring-1 ring-emerald-500/20',
    ringClassLight: 'ring-1 ring-emerald-500/10'
  },
  schedule: {
    id: 'schedule',
    title: 'Haftalık Çalışma Programı',
    badge: '26-30 Ekim',
    badgeHighlight: true,
    desc: 'Haftalık ameliyathane salonları, yoğun bakımlar ve poliklinik hekim yerleşimleri. Günün Seyrantepe & Sarıyer post-op sorumluları ve hekim bazlı arama.',
    clinicalKey: 'Haftalık ameliyathane salon dağılımı, günün post-op hekimleri ve hekim görev yeri sorgulama.',
    icon: Calendar,
    iconBgDark: 'bg-teal-500/15',
    iconBgLight: 'bg-teal-50',
    iconColorDark: 'text-teal-400',
    iconColorLight: 'text-teal-700',
    borderHoverDark: 'hover:border-teal-500/40',
    borderHoverLight: 'hover:border-teal-400',
    titleHoverDark: 'group-hover:text-teal-300',
    titleHoverLight: 'group-hover:text-teal-800',
    ringClassDark: 'ring-1 ring-teal-500/20',
    ringClassLight: 'ring-1 ring-teal-500/10'
  },
  icu: {
    id: 'icu',
    title: 'Yoğun Bakım',
    badge: 'Kabul Kriterleri',
    badgeHighlight: true,
    desc: 'SCCM, ESICM ve T.C. Sağlık Bakanlığı Yoğun Bakım Endikasyonları (Kabul Kriterleri). 4 Model: Triyaj (Priority 1-4), 9 Organ Sistemi, Kritik Eşikler ve Basamaklar/Skorlama (SOFA, NEWS2).',
    clinicalKey: 'Kritik hasta kabulünde reversibilite, organ yetmezliği basamakları ve objektif kritik eşik değerlerine dayalı YBÜ yatış protokolü.',
    icon: Activity,
    iconBgDark: 'bg-rose-500/15',
    iconBgLight: 'bg-rose-50',
    iconColorDark: 'text-rose-400',
    iconColorLight: 'text-rose-700',
    borderHoverDark: 'hover:border-rose-500/40',
    borderHoverLight: 'hover:border-rose-400',
    titleHoverDark: 'group-hover:text-rose-300',
    titleHoverLight: 'group-hover:text-rose-800',
    ringClassDark: 'ring-1 ring-rose-500/20',
    ringClassLight: 'ring-1 ring-rose-500/10'
  },
  procedures: {
    id: 'procedures',
    title: 'Sistematik Prosedür Bazlı Anestezi Yönetimi',
    badge: 'Cerrahi Rehber',
    badgeHighlight: true,
    desc: 'Cerrahi branşlara göre prosedür bazlı anestezi yönetimi. 5 temel aşama: Tanım/Süre, Anestezi Teknikleri, Pre-op, İntra-op (havayolu, vasküler, cerrahi kritik anlar), Post-op (ağrı, ERAS & PROSPECT).',
    clinicalKey: 'Jaffe 5. Baskı, ERAS ve PROSPECT rehberleriyle uyumlu sistematik cerrahi anestezi yönetimi.',
    icon: BookOpen,
    iconBgDark: 'bg-blue-500/15',
    iconBgLight: 'bg-blue-50',
    iconColorDark: 'text-blue-400',
    iconColorLight: 'text-blue-700',
    borderHoverDark: 'hover:border-blue-500/40',
    borderHoverLight: 'hover:border-blue-400',
    titleHoverDark: 'group-hover:text-blue-300',
    titleHoverLight: 'group-hover:text-blue-800',
    ringClassDark: 'ring-1 ring-blue-500/20',
    ringClassLight: 'ring-1 ring-blue-500/10'
  },
  ekt: {
    id: 'ekt',
    title: 'EKT Vaka Takip & Zamanlayıcı',
    badge: 'CRF & Zamanlayıcı',
    badgeHighlight: true,
    desc: 'Elektrokonvülsif Tedavi (EKT) vaka takibi, Ketofol indüksiyon kronometresi, PSi derinlik takibi, 15sn-1dk-3dk-10dk hemodinami uyarıları ve otomatik CRF loglayıcı.',
    clinicalKey: 'Ketofol indüksiyonu ve EKT şoku sonrası otonomik hemodinami zirvelerini saniyesi saniyesine kayıt altına alan araştırma/klinik takip aracı.',
    icon: Zap,
    iconBgDark: 'bg-amber-500/15',
    iconBgLight: 'bg-amber-50',
    iconColorDark: 'text-amber-400',
    iconColorLight: 'text-amber-700',
    borderHoverDark: 'hover:border-amber-500/40',
    borderHoverLight: 'hover:border-amber-400',
    titleHoverDark: 'group-hover:text-amber-300',
    titleHoverLight: 'group-hover:text-amber-800',
    ringClassDark: 'ring-1 ring-amber-500/20',
    ringClassLight: 'ring-1 ring-amber-500/10'
  },
  references: {
    id: 'references',
    title: 'KAYNAKLAR VE İLERİ OKUMA',
    badge: 'PubMed · DOI',
    badgeHighlight: true,
    desc: 'Portal genelinde kullanılan tüm textbooklar, uluslararası kılavuzlar ve dönüm noktası çalışmalarının mükerrersiz, sistematik bibliyografyası (PubMed & DOI bağlantılarıyla).',
    clinicalKey: 'Her yeni eklenen kılavuz veya protokolün kaynakları bu merkezi dizinde tekilleştirilerek otomatik listelenir.',
    icon: Library,
    iconBgDark: 'bg-teal-500/15',
    iconBgLight: 'bg-teal-50',
    iconColorDark: 'text-teal-400',
    iconColorLight: 'text-teal-700',
    borderHoverDark: 'hover:border-teal-500/40',
    borderHoverLight: 'hover:border-teal-400',
    titleHoverDark: 'group-hover:text-teal-300',
    titleHoverLight: 'group-hover:text-teal-800',
    ringClassDark: 'ring-1 ring-teal-500/20',
    ringClassLight: 'ring-1 ring-teal-500/10'
  }
};

export const DEFAULT_TOOL_ORDER: ToolTabId[] = [
  'monitoring',
  'procedures',
  'icu',
  'abg',
  'calculator',
  'intraop',
  'infusion',
  'preop',
  'airway',
  'treatments',
  'nerve-blocks',
  'vascular-access',
  'emergencies',
  'infographics',
  'podcast',
  'question-bank',
  'schedule',
  'roster',
  'contacts',
  'ekt',
  'references',
  'mechanical-ventilation',
  'basics'
];
export const TOOL_ORDER_STORAGE_KEY = 'etfal_clinical_tools_order_v30';

interface PortalWorkspaceProps {
  onBackToWelcome: () => void;
  onOpenDisclaimer: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  initialRoute?: ParsedHashRoute;
}

export const PortalWorkspace: React.FC<PortalWorkspaceProps> = ({ 
  onBackToWelcome, 
  onOpenDisclaimer,
  isDark,
  onToggleTheme,
  initialRoute
}) => {
  const [activeTab, setActiveTab] = useState<'tools' | ToolTabId>(() => {
    const route = (initialRoute?.type && initialRoute.id) ? initialRoute : parseHashRoute();
    if (route?.type === 'infografik') {
      return 'infographics';
    }
    if (route?.type === 'tedavi') {
      return 'treatments';
    }
    if (route?.type === 'blok') {
      return 'nerve-blocks';
    }
    if (route?.type === 'arac' && (route.id === 'dashboard' || route.id === 'tools')) {
      return 'tools';
    }
    if (route?.type === 'arac' && route.id && route.id in ALL_CLINICAL_TOOLS) {
      return route.id as ToolTabId;
    }
    return 'tools';
  });

  // Keep activeTab synced if initialRoute changes via hash
  useEffect(() => {
    const route = (initialRoute?.type && initialRoute.id) ? initialRoute : parseHashRoute();
    if (route?.type === 'infografik') {
      setActiveTab('infographics');
      setSelectedInfographicId(route.id || null);
    } else if (route?.type === 'tedavi') {
      setActiveTab('treatments');
      setSelectedTreatmentProtocolId(route.id || null);
    } else if (route?.type === 'blok') {
      setActiveTab('nerve-blocks');
      setSelectedNerveBlockId(route.id || null);
    } else if (route?.type === 'arac' && (route.id === 'dashboard' || route.id === 'tools')) {
      setActiveTab('tools');
    } else if (route?.type === 'arac' && route.id && route.id in ALL_CLINICAL_TOOLS) {
      setActiveTab(route.id as ToolTabId);
      if (route.id === 'nerve-blocks') {
        setSelectedNerveBlockId(route.subId || null);
      } else if (route.id === 'basics') {
        setSelectedBasicsCardId(route.subId || null);
      } else if (route.id === 'mechanical-ventilation') {
        setSelectedVentilationCardId(route.subId || null);
      } else if (route.id === 'monitoring') {
        setSelectedMonitoringModuleId(route.subId || null);
      } else if (route.id === 'procedures') {
        setSelectedProcedureId(route.subId || null);
      } else if (route.id === 'vascular-access') {
        setSelectedVascularSubId(route.subId || null);
      } else if (route.id === 'icu') {
        setSelectedIcuSubId(route.subId || null);
      } else if (route.id === 'emergencies') {
        setSelectedEmergencyProtocolId(route.subId || null);
      }
    }
  }, [initialRoute]);

  const handleSelectTab = (
    tabId: 'tools' | ToolTabId,
    options?: {
      preservePreopTool?: boolean;
      preserveTreatmentProtocol?: boolean;
      preserveAirwayCard?: boolean;
      preserveEmergencyProtocol?: boolean;
      preserveNerveBlock?: boolean;
      preserveBasicsCard?: boolean;
      preserveVentilationCard?: boolean;
      preserveMonitoringModule?: boolean;
      preserveProcedure?: boolean;
      preserveVascularSub?: boolean;
      preserveIcuSub?: boolean;
      preserveInfographic?: boolean;
    }
  ) => {
    setActiveTab(tabId);
    if (!options?.preservePreopTool) {
      setSelectedPreopToolId(null);
    }
    if (!options?.preserveTreatmentProtocol) {
      setSelectedTreatmentProtocolId(null);
    }
    if (!options?.preserveAirwayCard) {
      setSelectedAirwayCardId(null);
    }
    if (!options?.preserveEmergencyProtocol) {
      setSelectedEmergencyProtocolId(null);
    }
    if (!options?.preserveNerveBlock) {
      setSelectedNerveBlockId(null);
    }
    if (!options?.preserveBasicsCard) {
      setSelectedBasicsCardId(null);
    }
    if (!options?.preserveVentilationCard) {
      setSelectedVentilationCardId(null);
    }
    if (!options?.preserveMonitoringModule) {
      setSelectedMonitoringModuleId(null);
    }
    if (!options?.preserveProcedure) {
      setSelectedProcedureId(null);
    }
    if (!options?.preserveVascularSub) {
      setSelectedVascularSubId(null);
    }
    if (!options?.preserveIcuSub) {
      setSelectedIcuSubId(null);
    }
    if (!options?.preserveInfographic) {
      setSelectedInfographicId(null);
    }
    if (tabId === 'tools') {
      updateHashRoute('arac', 'dashboard');
    } else if (tabId !== 'infographics') {
      updateHashRoute('arac', tabId);
    }
  };

  const [intraopInitialStrategy, setIntraopInitialStrategy] = useState<'liberal' | 'restrictive' | 'gdft'>('liberal');

  // Tool Order state with localStorage persistence
  const [toolOrder, setToolOrder] = useState<ToolTabId[]>(() => {
    try {
      const saved = localStorage.getItem(TOOL_ORDER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === DEFAULT_TOOL_ORDER.length) {
          const isValid = DEFAULT_TOOL_ORDER.every(id => parsed.includes(id));
          if (isValid) return parsed as ToolTabId[];
        }
      }

      // Check previous storage versions and migrate existing order (keeping monitoring at top and moving mechanical-ventilation & basics to the end)
      for (const oldKey of ['etfal_clinical_tools_order_v29', 'etfal_clinical_tools_order_v28', 'etfal_clinical_tools_order_v27', 'etfal_clinical_tools_order_v26', 'etfal_clinical_tools_order_v25', 'etfal_clinical_tools_order_v24', 'etfal_clinical_tools_order_v23', 'etfal_clinical_tools_order_v22', 'etfal_clinical_tools_order_v21', 'etfal_clinical_tools_order_v20', 'etfal_clinical_tools_order_v19', 'etfal_clinical_tools_order_v18', 'etfal_clinical_tools_order_v17', 'etfal_clinical_tools_order_v16', 'etfal_clinical_tools_order_v11', 'etfal_clinical_tools_order_v10', 'etfal_clinical_tools_order_v7', 'etfal_clinical_tools_order_v6', 'etfal_clinical_tools_order_v5', 'etfal_clinical_tools_order_v4']) {
        const prevSaved = localStorage.getItem(oldKey);
        if (prevSaved) {
          const parsedOld = JSON.parse(prevSaved);
          if (Array.isArray(parsedOld)) {
            const updated = parsedOld.filter(id => (id in ALL_CLINICAL_TOOLS));
            if (!updated.includes('podcast')) {
              const infoIdx = updated.indexOf('infographics');
              if (infoIdx !== -1) {
                updated.splice(infoIdx + 1, 0, 'podcast');
              } else {
                updated.push('podcast');
              }
            }
            if (!updated.includes('question-bank')) {
              const podIdx = updated.indexOf('podcast');
              if (podIdx !== -1) {
                updated.splice(podIdx + 1, 0, 'question-bank');
              } else {
                updated.push('question-bank');
              }
            }
            if (!updated.includes('abg')) {
              const icuIdx = updated.indexOf('icu');
              if (icuIdx !== -1) {
                updated.splice(icuIdx + 1, 0, 'abg');
              } else {
                updated.unshift('abg');
              }
            }
            if (!updated.includes('airway')) {
              const preopIdx = updated.indexOf('preop');
              if (preopIdx !== -1) {
                updated.splice(preopIdx + 1, 0, 'airway');
              } else {
                updated.push('airway');
              }
            }
            if (!updated.includes('nerve-blocks')) {
              const treatIdx = updated.indexOf('treatments');
              if (treatIdx !== -1) {
                updated.splice(treatIdx + 1, 0, 'nerve-blocks');
              } else {
                updated.push('nerve-blocks');
              }
            }
            if (!updated.includes('vascular-access')) {
              const nbIdx = updated.indexOf('nerve-blocks');
              if (nbIdx !== -1) {
                updated.splice(nbIdx + 1, 0, 'vascular-access');
              } else {
                updated.push('vascular-access');
              }
            }
            if (!updated.includes('emergencies')) {
              const vaIdx = updated.indexOf('vascular-access');
              if (vaIdx !== -1) {
                updated.splice(vaIdx + 1, 0, 'emergencies');
              } else {
                updated.push('emergencies');
              }
            }
            if (!updated.includes('roster')) {
              updated.push('roster');
            }
            if (!updated.includes('ekt')) {
              updated.push('ekt');
            }
            if (!updated.includes('references')) {
              updated.push('references');
            }
            const reordered = updated.filter(id => id !== 'mechanical-ventilation' && id !== 'monitoring' && id !== 'basics');
            reordered.unshift('monitoring');
            reordered.push('mechanical-ventilation', 'basics');
            if (reordered.length === DEFAULT_TOOL_ORDER.length && DEFAULT_TOOL_ORDER.every(id => reordered.includes(id))) {
              return reordered as ToolTabId[];
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_TOOL_ORDER;
  });

  const [draggedToolId, setDraggedToolId] = useState<ToolTabId | null>(null);
  const [dragOverToolId, setDragOverToolId] = useState<ToolTabId | null>(null);
  const [isRosterModalOpen, setIsRosterModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [selectedEmergencyProtocolId, setSelectedEmergencyProtocolId] = useState<string | null>(() => {
    const route = (initialRoute?.type && initialRoute.id) ? initialRoute : parseHashRoute();
    if (route?.type === 'arac' && route.id === 'emergencies' && route.subId) {
      return route.subId;
    }
    return null;
  });
  const [selectedPreopToolId, setSelectedPreopToolId] = useState<PreopToolId | null>(() => {
    const route = (initialRoute?.type && initialRoute.id) ? initialRoute : parseHashRoute();
    if (route?.type === 'arac' && route.id === 'preop' && route.subId) {
      return route.subId as PreopToolId;
    }
    return null;
  });
  const [selectedAirwayCardId, setSelectedAirwayCardId] = useState<AirwayCardId | null>(() => {
    const route = (initialRoute?.type && initialRoute.id) ? initialRoute : parseHashRoute();
    if (route?.type === 'arac' && route.id === 'airway' && route.subId) {
      return route.subId as AirwayCardId;
    }
    return null;
  });
  const [selectedTreatmentProtocolId, setSelectedTreatmentProtocolId] = useState<string | null>(null);
  const [selectedNerveBlockId, setSelectedNerveBlockId] = useState<string | null>(null);
  const [activeNerveBlockSubId, setActiveNerveBlockSubId] = useState<string | null>(null);
  const [selectedBasicsCardId, setSelectedBasicsCardId] = useState<string | null>(() => {
    const route = (initialRoute?.type && initialRoute.id) ? initialRoute : parseHashRoute();
    if (route?.type === 'arac' && route.id === 'basics' && route.subId) {
      return route.subId;
    }
    return null;
  });
  const [selectedVentilationCardId, setSelectedVentilationCardId] = useState<string | null>(() => {
    const route = (initialRoute?.type && initialRoute.id) ? initialRoute : parseHashRoute();
    if (route?.type === 'arac' && route.id === 'mechanical-ventilation' && route.subId) {
      return route.subId;
    }
    return null;
  });
  const [selectedMonitoringModuleId, setSelectedMonitoringModuleId] = useState<string | null>(() => {
    const route = (initialRoute?.type && initialRoute.id) ? initialRoute : parseHashRoute();
    if (route?.type === 'arac' && route.id === 'monitoring' && route.subId) {
      return route.subId;
    }
    return null;
  });
  const [selectedProcedureId, setSelectedProcedureId] = useState<string | null>(() => {
    const route = (initialRoute?.type && initialRoute.id) ? initialRoute : parseHashRoute();
    if (route?.type === 'arac' && route.id === 'procedures' && route.subId) {
      return route.subId;
    }
    return null;
  });
  const [selectedVascularSubId, setSelectedVascularSubId] = useState<string | null>(() => {
    const route = (initialRoute?.type && initialRoute.id) ? initialRoute : parseHashRoute();
    if (route?.type === 'arac' && route.id === 'vascular-access' && route.subId) {
      return route.subId;
    }
    return null;
  });
  const [selectedIcuSubId, setSelectedIcuSubId] = useState<string | null>(() => {
    const route = (initialRoute?.type && initialRoute.id) ? initialRoute : parseHashRoute();
    if (route?.type === 'arac' && route.id === 'icu' && route.subId) {
      return route.subId;
    }
    return null;
  });
  const [selectedInfographicId, setSelectedInfographicId] = useState<string | null>(() => {
    const route = (initialRoute?.type && initialRoute.id) ? initialRoute : parseHashRoute();
    if (route?.type === 'infografik' && route.id) {
      return route.id;
    }
    return null;
  });

  // Global keyboard shortcut for quick search: ⌘K, Ctrl+K or '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(prev => !prev);
      } else if (e.key === '/' && !isSearchModalOpen) {
        const target = e.target as HTMLElement;
        if (target && target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setIsSearchModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen]);

  // Declarative deep-link dispatcher: driven directly by item.tabId + item.subId
  const handleSelectSearchResult = (item: PortalSearchItem) => {
    const subId = item.subId ?? null;

    if (item.tabId === 'disclaimer') {
      onOpenDisclaimer();
      return;
    }

    switch (item.tabId) {
      case 'infographics': {
        const targetInfoId = subId || (item.id.startsWith('info-') ? item.id.replace('info-', '') : null);
        setSelectedInfographicId(targetInfoId);
        handleSelectTab('infographics', { preserveInfographic: true });
        if (targetInfoId) {
          updateHashRoute('infografik', targetInfoId);
        }
        break;
      }
      case 'monitoring': {
        setSelectedMonitoringModuleId(subId);
        handleSelectTab('monitoring', { preserveMonitoringModule: true });
        updateHashRoute('arac', subId ? `monitoring&sub=${subId}` : 'monitoring');
        break;
      }
      case 'procedures': {
        setSelectedProcedureId(subId);
        handleSelectTab('procedures', { preserveProcedure: true });
        updateHashRoute('arac', subId ? `procedures&sub=${subId}` : 'procedures');
        break;
      }
      case 'vascular-access': {
        setSelectedVascularSubId(subId);
        handleSelectTab('vascular-access', { preserveVascularSub: true });
        updateHashRoute('arac', subId ? `vascular-access&sub=${subId}` : 'vascular-access');
        break;
      }
      case 'icu': {
        setSelectedIcuSubId(subId);
        handleSelectTab('icu', { preserveIcuSub: true });
        updateHashRoute('arac', subId ? `icu&sub=${subId}` : 'icu');
        break;
      }
      case 'emergencies': {
        setSelectedEmergencyProtocolId(subId);
        handleSelectTab('emergencies', { preserveEmergencyProtocol: true });
        if (subId) {
          updateHashRoute('arac', `emergencies&sub=${subId}`);
        }
        break;
      }
      case 'treatments': {
        setSelectedTreatmentProtocolId(subId);
        handleSelectTab('treatments', { preserveTreatmentProtocol: true });
        if (subId) {
          updateHashRoute('tedavi', subId);
        }
        break;
      }
      case 'nerve-blocks': {
        setSelectedNerveBlockId(subId);
        handleSelectTab('nerve-blocks', { preserveNerveBlock: true });
        if (subId) {
          updateHashRoute('blok', subId);
        }
        break;
      }
      case 'basics': {
        setSelectedBasicsCardId(subId);
        handleSelectTab('basics', { preserveBasicsCard: true });
        if (subId) {
          updateHashRoute('arac', `basics&sub=${subId}`);
        }
        break;
      }
      case 'mechanical-ventilation': {
        setSelectedVentilationCardId(subId);
        handleSelectTab('mechanical-ventilation', { preserveVentilationCard: true });
        if (subId) {
          updateHashRoute('arac', `mechanical-ventilation&sub=${subId}`);
        }
        break;
      }
      case 'preop': {
        setSelectedPreopToolId((subId as PreopToolId) || null);
        handleSelectTab('preop', { preservePreopTool: true });
        updateHashRoute('arac', subId ? `preop&sub=${subId}` : 'preop');
        break;
      }
      case 'airway': {
        setSelectedAirwayCardId((subId as AirwayCardId) || null);
        handleSelectTab('airway', { preserveAirwayCard: true });
        updateHashRoute('arac', subId ? `airway&sub=${subId}` : 'airway');
        break;
      }
      case 'intraop': {
        setIntraopInitialStrategy('liberal');
        handleSelectTab('intraop');
        break;
      }
      default: {
        handleSelectTab(item.tabId);
        break;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveToolOrder = (newOrder: ToolTabId[]) => {
    setToolOrder(newOrder);
    try {
      localStorage.setItem(TOOL_ORDER_STORAGE_KEY, JSON.stringify(newOrder));
    } catch (e) {
      console.error(e);
    }
  };

  const moveTool = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= toolOrder.length || fromIndex === toIndex) return;
    const updated = [...toolOrder];
    const [removed] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, removed);
    saveToolOrder(updated);
  };

  const resetToolOrder = () => {
    saveToolOrder(DEFAULT_TOOL_ORDER);
  };

  const isCustomOrder = JSON.stringify(toolOrder) !== JSON.stringify(DEFAULT_TOOL_ORDER);

  // Top navigation bar scroll & drag states
  const navTabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isJustDragged, setIsJustDragged] = useState(false);

  const checkNavScroll = () => {
    const el = navTabsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 6);
  };

  useEffect(() => {
    checkNavScroll();
    const el = navTabsRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkNavScroll, { passive: true });
    window.addEventListener('resize', checkNavScroll);
    return () => {
      el.removeEventListener('scroll', checkNavScroll);
      window.removeEventListener('resize', checkNavScroll);
    };
  }, [toolOrder]);

  const handleNavScroll = (direction: 'left' | 'right') => {
    const el = navTabsRef.current;
    if (!el) return;
    const scrollAmount = 240;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleNavWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = navTabsRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth) {
      el.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 bg-transparent ${
      isDark ? 'text-slate-100' : 'text-slate-900'
    }`}>
      {/* Top Header */}
      <header className={`border-b sticky top-0 z-30 transition-colors ${
        isDark ? 'bg-slate-900/95 border-slate-800 backdrop-blur' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToWelcome}
              className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4 text-teal-500" />
              <span className="hidden sm:inline">Karşılama Sayfası</span>
            </button>
            <div className={`h-4 w-px hidden sm:block ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
            <h1 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <a
                href="#arac=dashboard"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    handleSelectTab('tools');
                  }
                }}
                title="Dashboard (Yeni sekmede açmak için sağ tıklayın)"
                className="hover:text-teal-500 transition-colors cursor-pointer"
              >
                DASHBOARD
              </a>
            </h1>
          </div>

          {/* Top-Right: Search, Duty Roster, Live Clock & Theme Switch */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setIsSearchModalOpen(true)}
              title="Hızlı ara (Kısayol: ⌘K veya Ctrl+K)"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                isDark 
                  ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white' 
                  : 'bg-slate-100/90 hover:bg-slate-200/90 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-teal-500" />
              <span className="hidden md:inline">Ara</span>
              <kbd className="hidden lg:inline text-[9px] font-mono opacity-60">⌘K</kbd>
            </button>

            <a
              href="#arac=schedule"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  handleSelectTab('schedule');
                }
              }}
              title="Haftalık Çalışma Programı ve Salon Dağılımlarını Aç"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                activeTab === 'schedule'
                  ? 'bg-teal-600 text-white border-teal-600 shadow-teal-500/20'
                  : isDark 
                    ? 'bg-teal-500/15 hover:bg-teal-500/25 border-teal-500/30 text-teal-300' 
                    : 'bg-teal-50 hover:bg-teal-100 border-teal-200 text-teal-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-teal-500" />
              <span className="hidden sm:inline">Haftalık Program</span>
            </a>

            <a
              href="#arac=roster"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  handleSelectTab('roster');
                }
              }}
              title="Aylık Nöbet Çizelgesi Aracını Aç"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                activeTab === 'roster'
                  ? 'bg-teal-600 text-white border-teal-600 shadow-teal-500/20'
                  : isDark 
                    ? 'bg-teal-500/15 hover:bg-teal-500/25 border-teal-500/30 text-teal-300' 
                    : 'bg-teal-50 hover:bg-teal-100 border-teal-200 text-teal-800'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-teal-500" />
              <span className="hidden sm:inline">Nöbet Listesi</span>
            </a>
            <LiveClock isDark={isDark} />
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </div>
        </div>
      </header>

      {/* Top Campus Weather & Distance Bar [MODULAR_CAMPUS_WIDGET] */}
      <CampusWeatherBar isDark={isDark} />

      {/* Navigation Sub-bar (Follows custom tool ordering, draggable & scrollable) */}
      <div className={`border-b transition-colors relative ${
        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-5xl mx-auto px-2 sm:px-6 relative flex items-center">
          {/* Scroll Left Button */}
          {canScrollLeft && (
            <div className={`absolute left-0 top-0 bottom-0 z-20 flex items-center pl-1 sm:pl-2 pr-3 bg-gradient-to-r pointer-events-auto ${
              isDark ? 'from-slate-900 via-slate-900/90 to-transparent' : 'from-white via-white/90 to-transparent'
            }`}>
              <button
                type="button"
                onClick={() => handleNavScroll('left')}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer shadow-xs ${
                  isDark 
                    ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
                title="Sola kaydır"
                aria-label="Sola kaydır"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Scrolling Tabs Container */}
          <div 
            ref={navTabsRef}
            onWheel={handleNavWheel}
            className="flex-1 flex items-center gap-1 overflow-x-auto py-2 no-scrollbar scroll-smooth"
          >
            {/* Fixed First Tab: Genel Bakış */}
            <a
              key="tools"
              href="#arac=dashboard"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  if (isJustDragged) return;
                  handleSelectTab('tools');
                }
              }}
              onDragOver={(e) => {
                if (draggedToolId) {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                  if (dragOverToolId !== ('tools' as any)) {
                    setDragOverToolId('tools' as any);
                  }
                }
              }}
              onDragLeave={() => {
                if (dragOverToolId === ('tools' as any)) {
                  setDragOverToolId(null);
                }
              }}
              onDrop={(e) => {
                if (draggedToolId) {
                  e.preventDefault();
                  setDragOverToolId(null);
                  const fromIdx = toolOrder.indexOf(draggedToolId);
                  if (fromIdx !== -1) {
                    moveTool(fromIdx, 0);
                  }
                  setDraggedToolId(null);
                }
              }}
              title="Genel Bakış paneli"
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                dragOverToolId === ('tools' as any)
                  ? 'ring-2 ring-teal-500 ring-offset-1 bg-teal-500/10 border-teal-500 text-teal-600 dark:text-teal-400'
                  : activeTab === 'tools'
                    ? isDark 
                      ? 'bg-slate-800 text-teal-300 font-semibold border-teal-500/30' 
                      : 'bg-teal-50 text-teal-800 font-semibold border-teal-200/80 shadow-xs'
                    : isDark
                      ? 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Activity className={`w-3.5 h-3.5 shrink-0 ${
                activeTab === 'tools' 
                  ? isDark ? 'text-teal-400' : 'text-teal-700' 
                  : isDark ? 'text-slate-500' : 'text-slate-400'
              }`} />
              <span>Genel Bakış</span>
            </a>

            {/* Draggable & Reorderable Tool Tabs */}
            {toolOrder.map((toolId) => {
              const t = ALL_CLINICAL_TOOLS[toolId];
              if (!t) return null;
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              const isDragging = draggedToolId === t.id;
              const isOver = dragOverToolId === t.id;

              return (
                <a
                  key={t.id}
                  href={`#arac=${t.id}`}
                  draggable
                  onDragStart={(e) => {
                    setIsJustDragged(true);
                    setDraggedToolId(t.id);
                    e.dataTransfer.setData('text/plain', t.id);
                    e.dataTransfer.effectAllowed = 'move';
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                    if (dragOverToolId !== t.id) {
                      setDragOverToolId(t.id);
                    }
                  }}
                  onDragLeave={() => {
                    if (dragOverToolId === t.id) {
                      setDragOverToolId(null);
                    }
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOverToolId(null);
                    if (draggedToolId && draggedToolId !== t.id) {
                      const fromIdx = toolOrder.indexOf(draggedToolId);
                      const toIdx = toolOrder.indexOf(t.id);
                      if (fromIdx !== -1 && toIdx !== -1) {
                        moveTool(fromIdx, toIdx);
                      }
                    }
                    setDraggedToolId(null);
                  }}
                  onDragEnd={() => {
                    setDraggedToolId(null);
                    setDragOverToolId(null);
                    setTimeout(() => setIsJustDragged(false), 150);
                  }}
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                      e.preventDefault();
                      if (isJustDragged) return;
                      handleSelectTab(t.id as any);
                    }
                  }}
                  title={`${t.title} — Yeni sekmede açmak için sağ tıklayın veya sırasını değiştirmek için sürükleyin`}
                  className={`group flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer active:cursor-grabbing select-none border ${
                    isDragging
                      ? 'opacity-30 scale-95 border-dashed border-teal-500 bg-teal-500/5'
                      : isOver
                        ? 'ring-2 ring-teal-500 ring-offset-1 scale-[1.02] border-teal-500 bg-teal-500/10 text-teal-600 dark:text-teal-400'
                        : isActive
                          ? isDark 
                            ? 'bg-slate-800 text-teal-300 font-semibold border-teal-500/30' 
                            : 'bg-teal-50 text-teal-800 font-semibold border-teal-200/80 shadow-xs'
                          : isDark
                            ? 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                            : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <GripVertical className="w-3 h-3 text-slate-400/60 group-hover:text-slate-400 opacity-40 group-hover:opacity-100 transition-opacity shrink-0 -mr-0.5" />
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${
                    isActive 
                      ? isDark ? 'text-teal-400' : 'text-teal-700' 
                      : isDark ? 'text-slate-500' : 'text-slate-400'
                  }`} />
                  <span>{t.title}</span>
                </a>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          {canScrollRight && (
            <div className={`absolute right-0 top-0 bottom-0 z-20 flex items-center pr-1 sm:pr-2 pl-3 bg-gradient-to-l pointer-events-auto ${
              isDark ? 'from-slate-900 via-slate-900/90 to-transparent' : 'from-white via-white/90 to-transparent'
            }`}>
              <button
                type="button"
                onClick={() => handleNavScroll('right')}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer shadow-xs ${
                  isDark 
                    ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
                title="Sağa kaydır"
                aria-label="Sağa kaydır"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* 1. Overview */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div className={`border-b pb-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3.5 ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <div>
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Şişli Etfal Dashboard
                </h2>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Anesteziyoloji ve Reanimasyon Kliniği hızlı klinik karar destek ve hesaplama araçları
                </p>
              </div>

              {/* Sleek, Non-Intrusive Quick Search Bar & Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 self-stretch md:self-auto">
                <DashboardSearchBar 
                  onClick={() => setIsSearchModalOpen(true)}
                  isDark={isDark}
                />

                {isCustomOrder && (
                  <button
                    onClick={resetToolOrder}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer shrink-0 ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
                    }`}
                    title="Varsayılan araç sıralamasına geri dön"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Sıralamayı Sıfırla</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {toolOrder.map((toolId, index) => {
                const tool = ALL_CLINICAL_TOOLS[toolId];
                if (!tool) return null;
                const Icon = tool.icon;
                const isDragging = draggedToolId === toolId;
                const isOver = dragOverToolId === toolId;

                return (
                  <div
                    key={tool.id}
                    draggable
                    onDragStart={(e) => {
                      setDraggedToolId(tool.id);
                      e.dataTransfer.setData('text/plain', tool.id);
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                      if (dragOverToolId !== tool.id) {
                        setDragOverToolId(tool.id);
                      }
                    }}
                    onDragLeave={() => {
                      if (dragOverToolId === tool.id) {
                        setDragOverToolId(null);
                      }
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOverToolId(null);
                      if (draggedToolId && draggedToolId !== tool.id) {
                        const fromIdx = toolOrder.indexOf(draggedToolId);
                        const toIdx = toolOrder.indexOf(tool.id);
                        if (fromIdx !== -1 && toIdx !== -1) {
                          moveTool(fromIdx, toIdx);
                        }
                      }
                      setDraggedToolId(null);
                    }}
                    onDragEnd={() => {
                      setDraggedToolId(null);
                      setDragOverToolId(null);
                    }}
                    className={`relative text-left p-5 rounded-xl border transition-all space-y-2 group flex flex-col justify-between cursor-pointer select-none ${
                      isDragging 
                        ? 'opacity-35 scale-95 border-dashed border-teal-500 bg-teal-500/5' 
                        : isOver 
                          ? 'ring-2 ring-teal-500 ring-offset-2 scale-[1.02] border-teal-500 shadow-lg' 
                          : isDark
                            ? `bg-slate-900 border-slate-800 ${tool.borderHoverDark} text-slate-100 ${tool.ringClassDark || ''}`
                            : `bg-white border-slate-200 ${tool.borderHoverLight} text-slate-900 shadow-xs ${tool.ringClassLight || ''}`
                    }`}
                  >
                    {/* Stretched Native Anchor Overlay: enables right-click "Open link in new tab", middle-click & Ctrl/Cmd+click */}
                    <a
                      href={`#arac=${tool.id}`}
                      draggable={false}
                      aria-label={tool.title}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                          e.preventDefault();
                          handleSelectTab(tool.id);
                        }
                      }}
                      className="absolute inset-0 z-10 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                    />

                    <div>
                      {/* Top Action Row: Icon, Badge, Grip Handle & Reorder arrows */}
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg ${
                          isDark ? `${tool.iconBgDark} ${tool.iconColorDark}` : `${tool.iconBgLight} ${tool.iconColorLight}`
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="relative z-20 flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          {tool.badge && (
                            <span className={`text-[11px] font-mono ${
                              tool.badgeHighlight 
                                ? isDark ? 'text-teal-400 font-semibold' : 'text-teal-600 font-semibold' 
                                : isDark ? 'text-slate-500' : 'text-slate-400'
                            }`}>
                              {tool.badge}
                            </span>
                          )}

                          {/* Quick Mobile / Button Reorder Controls */}
                          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-md p-0.5 ml-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={(e) => {
                                e.stopPropagation();
                                moveTool(index, index - 1);
                              }}
                              title="Sola / Başa taşı"
                              className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${
                                index === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              disabled={index === toolOrder.length - 1}
                              onClick={(e) => {
                                e.stopPropagation();
                                moveTool(index, index + 1);
                              }}
                              title="Sağa / Sona taşı"
                              className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${
                                index === toolOrder.length - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Drag Grip Handle */}
                          <div
                            title="Sıralamayı değiştirmek için sürükleyin"
                            className="p-1 text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 cursor-grab active:cursor-grabbing"
                          >
                            <GripVertical className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                      <h3 className={`text-sm font-bold transition-colors ${
                        isDark ? `text-white ${tool.titleHoverDark}` : `text-slate-900 ${tool.titleHoverLight}`
                      }`}>
                        {tool.title}
                      </h3>

                      {/* Kısa Kritik Temel Açıklama */}
                      <p className={`text-xs mt-2 leading-relaxed ${
                        isDark ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-600 group-hover:text-slate-800'
                      }`}>
                        {tool.desc}
                      </p>
                    </div>

                    <div className="pt-2.5 mt-3 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between gap-2 text-xs">
                      {tool.id === 'nerve-blocks' ? (
                        <a
                          href="#blok=spinal-anestezi"
                          onClick={(e) => {
                            if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedNerveBlockId('spinal-anestezi');
                              handleSelectTab('nerve-blocks', { preserveNerveBlock: true });
                              updateHashRoute('blok', 'spinal-anestezi');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                          }}
                          title="Doğrudan Spinal Anestezi Klinik Talimatı & Doz / Güvenlik Rehberi'ni aç (#blok=spinal-anestezi)"
                          className={`relative z-20 inline-flex items-center gap-1 font-semibold text-xs underline underline-offset-4 transition-colors ${
                            isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-700 hover:text-cyan-800'
                          }`}
                        >
                          <span>Spinal Talimatı</span>
                          <span>→</span>
                        </a>
                      ) : (
                        <span className={`text-[11px] font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                          Klinik Protokol
                        </span>
                      )}
                      <span className={`font-semibold text-xs flex items-center gap-1 ${
                        isDark ? 'text-teal-400 group-hover:translate-x-0.5 transition-transform' : 'text-teal-700 group-hover:translate-x-0.5 transition-transform'
                      }`}>
                        <span>Aracı Aç</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Tool Navigation & Direct Share Bar */}
        {activeTab !== 'tools' && (
          <div className="flex items-center justify-between gap-3 mb-4">
            <a
              href="#arac=dashboard"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  handleSelectTab('tools');
                }
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-teal-500" />
              <span>← Tüm Bölümlere Dön</span>
            </a>

            {activeTab !== 'infographics' && (
              <ShareLinkButton
                type={activeTab === 'nerve-blocks' && activeNerveBlockSubId ? 'blok' : 'arac'}
                id={
                  activeTab === 'nerve-blocks' && activeNerveBlockSubId
                    ? activeNerveBlockSubId
                    : activeTab === 'basics' && selectedBasicsCardId
                    ? `basics&sub=${selectedBasicsCardId}`
                    : activeTab === 'mechanical-ventilation' && selectedVentilationCardId
                    ? `mechanical-ventilation&sub=${selectedVentilationCardId}`
                    : activeTab
                }
                isDark={isDark}
                title={
                  activeTab === 'nerve-blocks' && activeNerveBlockSubId === 'spinal-anestezi'
                    ? 'Spinal Anestezi Klinik Talimatı Bağlantısını Kopyala'
                    : activeTab === 'basics' && selectedBasicsCardId === 'respiratory-physiology'
                    ? 'Solunum Fizyolojisi Bağlantısını Kopyala'
                    : activeTab === 'basics' && selectedBasicsCardId === 'cardiovascular-physiology'
                    ? 'Kardiyovasküler Fizyoloji Bağlantısını Kopyala'
                    : activeTab === 'mechanical-ventilation' && selectedVentilationCardId === 'oxygen-therapy'
                    ? 'Klinik ve Perioperatif Oksijen Tedavisi Bağlantısını Kopyala'
                    : `${ALL_CLINICAL_TOOLS[activeTab]?.title || 'Bu Bölümün'} Bağlantısını Kopyala`
                }
              />
            )}
          </div>
        )}

        {/* 2. Custom Calculator: Kilo, MV Volüm, İdame Sıvı Hesaplayıcısı */}
        {activeTab === 'calculator' && (
          <WeightFluidCalculator isDark={isDark} />
        )}

        {/* 2B. Yatak Başı Kan Gazı Analizi */}
        {activeTab === 'abg' && (
          <BedsideAbgAnalyzer isDark={isDark} />
        )}

        {/* 2C. Solunumsal Destek */}
        {activeTab === 'mechanical-ventilation' && (
          <MechanicalVentilationWorkspace
            isDark={isDark}
            initialCardId={selectedVentilationCardId}
            onActiveCardChange={setSelectedVentilationCardId}
          />
        )}

        {/* 2D. Monitörizasyon */}
        {activeTab === 'monitoring' && (
          <MonitoringWorkspace
            isDark={isDark}
            initialModuleId={selectedMonitoringModuleId}
            onActiveModuleChange={setSelectedMonitoringModuleId}
          />
        )}

        {/* 2E. Temel Bilgiler */}
        {activeTab === 'basics' && (
          <BasicsWorkspace
            isDark={isDark}
            initialCardId={selectedBasicsCardId}
            onActiveCardChange={setSelectedBasicsCardId}
          />
        )}

        {/* 3. Intraop Fluid Management Strategies (Liberal, Restrictive, GDFT + Embedded Liberal Calculator) */}
        {activeTab === 'intraop' && (
          <FluidManagementStrategiesInfographic
            isDark={isDark}
            initialStrategy={intraopInitialStrategy}
          />
        )}

        {/* 4. Infusion Rate Calculator */}
        {activeTab === 'infusion' && (
          <InfusionRateCalculator isDark={isDark} />
        )}

        {/* 5. Preoperative Evaluation (contains MACE, DASI, ASA, Fasting) */}
        {(activeTab === 'preop' || (activeTab as string) === 'asa') && (
          <PreoperativeEvaluation
            isDark={isDark}
            initialTool={(activeTab as string) === 'asa' ? 'asa' : selectedPreopToolId}
            onOpenGastricUsg={() => {
              setSelectedAirwayCardId('gastric-usg');
              handleSelectTab('airway', { preserveAirwayCard: true });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 7. Havayolu Yönetimi */}
        {activeTab === 'airway' && (
          <AirwayManagementView isDark={isDark} initialCardId={selectedAirwayCardId} />
        )}

        {/* 8. Tedaviler ve İlaçlar */}
        {activeTab === 'treatments' && (
          <TreatmentsWorkspace 
            isDark={isDark} 
            initialProtocolId={
              selectedTreatmentProtocolId ||
              (initialRoute?.type === 'tedavi'
                ? initialRoute.id
                : (initialRoute?.type === 'arac' && initialRoute.id?.includes('tedavi=')
                    ? initialRoute.id.split('tedavi=')[1]
                    : initialRoute?.subId || null))
            }
          />
        )}

        {/* 9. Sinir Blokları & LAST */}
        {activeTab === 'nerve-blocks' && (
          <NerveBlocksWorkspace 
            isDark={isDark}
            onActiveSubChange={setActiveNerveBlockSubId}
            initialBlockId={
              selectedNerveBlockId ||
              (initialRoute?.type === 'blok'
                ? initialRoute.id
                : (initialRoute?.type === 'arac' && initialRoute.id?.includes('blok=')
                    ? initialRoute.id.split('blok=')[1]
                    : initialRoute?.subId || null))
            }
          />
        )}

        {/* 9B. Güvenli Vasküler Erişim */}
        {activeTab === 'vascular-access' && (
          <VascularAccessWorkspace
            isDark={isDark}
            initialSubModule={selectedVascularSubId}
          />
        )}

        {/* 10. Anestezi Acilleri */}
        {activeTab === 'emergencies' && (
          <AnesthesiaEmergenciesView 
            isDark={isDark} 
            initialEmergencyId={
              selectedEmergencyProtocolId ||
              (initialRoute?.type === 'arac' && initialRoute.id === 'emergencies'
                ? initialRoute.subId || null
                : null)
            }
          />
        )}

        {/* 11. Clinical Infographics */}
        {activeTab === 'infographics' && (
          <InfographicsView 
            isDark={isDark} 
            initialInfographicId={
              selectedInfographicId ||
              (initialRoute?.type === 'infografik' ? initialRoute.id : null)
            }
          />
        )}

        {/* 11B. Podcast */}
        {activeTab === 'podcast' && (
          <PodcastWorkspace isDark={isDark} />
        )}

        {/* 11C. Soru Bankası */}
        {activeTab === 'question-bank' && (
          <QuestionBankWorkspace isDark={isDark} />
        )}

        {/* 8. Contacts */}
        {activeTab === 'contacts' && (
          <ClinicContactsView isDark={isDark} />
        )}

        {/* 9. Duty Roster Tool */}
        {activeTab === 'roster' && (
          <DutyRosterToolView isDark={isDark} />
        )}

        {/* 10. Weekly Schedule Tool */}
        {activeTab === 'schedule' && (
          <WeeklyScheduleToolView isDark={isDark} />
        )}

        {/* 11. Yoğun Bakım (ICU) Tool */}
        {activeTab === 'icu' && (
          <IcuWorkspace
            isDark={isDark}
            initialSubId={selectedIcuSubId}
          />
        )}

        {/* 12. Sistematik Prosedür Bazlı Anestezi Yönetimi */}
        {activeTab === 'procedures' && (
          <ProceduresWorkspace 
            isDark={isDark} 
            initialProcedureId={
              selectedProcedureId ||
              (initialRoute?.type === 'arac' && initialRoute.id === 'procedures'
                ? initialRoute.subId || null
                : null)
            }
          />
        )}

        {/* 13. EKT Vaka Takip & Zamanlayıcı */}
        {activeTab === 'ekt' && (
          <EktTrackerView isDark={isDark} />
        )}

        {/* 15. KAYNAKLAR VE İLERİ OKUMA */}
        {activeTab === 'references' && (
          <ReferencesLibraryView isDark={isDark} />
        )}
      </main>

      {/* Footer */}
      <footer className={`mt-auto border-t py-4 px-4 sm:px-6 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
      }`}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>Şişli Hamidiye Etfal EAH · Anestezi ve Reanimasyon Kliniği Asistan Portalı</span>
          
          {/* Instagram Account Link */}
          <a
            href="https://www.instagram.com/etfalanestezi/"
            target="_blank"
            rel="noopener noreferrer"
            title="Şişli Etfal Anestezi Resmi Instagram Hesabı: @etfalanestezi"
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium transition-all group cursor-pointer ${
              isDark 
                ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-pink-400 hover:border-pink-500/50 hover:bg-slate-800' 
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-pink-600 hover:border-pink-300 hover:shadow-2xs'
            }`}
          >
            <Instagram className="w-3.5 h-3.5 text-pink-500 group-hover:scale-110 transition-transform" />
            <span>@etfalanestezi</span>
          </a>

          <button
            onClick={onOpenDisclaimer}
            className={`transition-colors underline underline-offset-4 cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-teal-400' : 'text-slate-600 hover:text-teal-700'
            }`}
          >
            Sorumluluk Reddi
          </button>
        </div>
      </footer>

      {/* Monthly Duty Roster Modal [MODULAR_DUTY_ROSTER] */}
      <DutyRosterModal
        isOpen={isRosterModalOpen}
        onClose={() => setIsRosterModalOpen(false)}
        isDark={isDark}
      />

      {/* Global Quick Search Modal */}
      <PortalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectItem={handleSelectSearchResult}
        isDark={isDark}
      />
    </div>
  );
};
