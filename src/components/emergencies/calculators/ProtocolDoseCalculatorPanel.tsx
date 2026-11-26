import React from 'react';
import {
  AlertTriangle,
  Calculator,
  Flame,
  HeartPulse,
  ShieldAlert,
  Syringe,
  Wind,
  Droplets,
  Activity,
  Zap,
} from 'lucide-react';
import { EmergencyDoses } from './emergencyDoseCalculations';

export interface ProtocolDoseCalculatorPanelProps {
  protocolId: string;
  patientWeight: string;
  onWeightChange: (val: string) => void;
  doses: EmergencyDoses;
  isDark: boolean;
}

type CardTone = 'red' | 'amber' | 'emerald' | 'blue' | 'purple' | 'neutral';

interface DoseCardProps {
  label: string;
  value: React.ReactNode;
  detail?: React.ReactNode;
  warning?: React.ReactNode;
  tone?: CardTone;
  isDark: boolean;
  className?: string;
}

const DoseCard: React.FC<DoseCardProps> = ({
  label,
  value,
  detail,
  warning,
  tone = 'neutral',
  isDark,
  className = '',
}) => {
  const toneClasses: Record<CardTone, { box: string; label: string; value: string; warn: string }> = {
    red: {
      box: isDark
        ? 'bg-red-950/50 border-red-500/40'
        : 'bg-red-50 border-red-200',
      label: isDark ? 'text-red-300' : 'text-red-700',
      value: isDark ? 'text-white' : 'text-red-950',
      warn: isDark
        ? 'bg-red-900/60 text-red-200 border-red-500/40'
        : 'bg-red-100 text-red-900 border-red-300',
    },
    amber: {
      box: isDark
        ? 'bg-amber-950/40 border-amber-500/40'
        : 'bg-amber-50 border-amber-200',
      label: isDark ? 'text-amber-300' : 'text-amber-800',
      value: isDark ? 'text-white' : 'text-amber-950',
      warn: isDark
        ? 'bg-amber-900/50 text-amber-200 border-amber-500/40'
        : 'bg-amber-100 text-amber-900 border-amber-300',
    },
    emerald: {
      box: isDark
        ? 'bg-emerald-950/40 border-emerald-500/40'
        : 'bg-emerald-50 border-emerald-200',
      label: isDark ? 'text-emerald-300' : 'text-emerald-800',
      value: isDark ? 'text-white' : 'text-emerald-950',
      warn: isDark
        ? 'bg-emerald-900/50 text-emerald-200 border-emerald-500/40'
        : 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
    blue: {
      box: isDark
        ? 'bg-sky-950/40 border-sky-500/40'
        : 'bg-sky-50 border-sky-200',
      label: isDark ? 'text-sky-300' : 'text-sky-800',
      value: isDark ? 'text-white' : 'text-sky-950',
      warn: isDark
        ? 'bg-sky-900/50 text-sky-200 border-sky-500/40'
        : 'bg-sky-100 text-sky-900 border-sky-300',
    },
    purple: {
      box: isDark
        ? 'bg-purple-950/40 border-purple-500/40'
        : 'bg-purple-50 border-purple-200',
      label: isDark ? 'text-purple-300' : 'text-purple-800',
      value: isDark ? 'text-white' : 'text-purple-950',
      warn: isDark
        ? 'bg-purple-900/50 text-purple-200 border-purple-500/40'
        : 'bg-purple-100 text-purple-900 border-purple-300',
    },
    neutral: {
      box: isDark
        ? 'bg-slate-800/80 border-slate-700'
        : 'bg-white border-slate-200',
      label: isDark ? 'text-slate-300' : 'text-slate-600',
      value: isDark ? 'text-white' : 'text-slate-900',
      warn: isDark
        ? 'bg-slate-900/70 text-amber-300 border-amber-500/30'
        : 'bg-amber-50 text-amber-900 border-amber-200',
    },
  };

  const t = toneClasses[tone];

  return (
    <div className={`rounded-xl border p-3.5 flex flex-col justify-between gap-1.5 ${t.box} ${className}`}>
      <div className={`text-[11px] font-bold uppercase tracking-wider leading-tight ${t.label}`}>
        {label}
      </div>
      <div className={`text-lg sm:text-xl font-black tracking-tight leading-snug ${t.value}`}>
        {value}
      </div>
      {detail && (
        <div className={`text-xs leading-snug ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {detail}
        </div>
      )}
      {warning && (
        <div className={`mt-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border leading-snug ${t.warn}`}>
          {warning}
        </div>
      )}
    </div>
  );
};

interface ProtocolHeaderMeta {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

function getProtocolHeaderMeta(protocolId: string): ProtocolHeaderMeta {
  switch (protocolId) {
    case 'mh':
    case 'dantrolene':
      return {
        title: 'Malign Hipertermi — Dantrolen Doz Hesaplayıcı',
        subtitle: 'Başlangıç 2.5 mg/kg IV · Flakon & Steril Su Hazırlığı',
        icon: <Flame className="w-5 h-5 text-red-500" />,
      };
    case 'bronchospasm':
      return {
        title: 'Bronkospazm — Acil İlaç Dozları',
        subtitle: 'Salbutamol, MgSO₄, Ketamin, Titre IV Adrenalin & Steroid',
        icon: <Wind className="w-5 h-5 text-sky-500" />,
      };
    case 'laryngospasm':
      return {
        title: 'Laringospazm — Kırma & Kurtarma Dozları',
        subtitle: 'Propofol, Süksinilkolin IV/IM, Atropin & Rokuronyum Kurtarma',
        icon: <Syringe className="w-5 h-5 text-amber-500" />,
      };
    case 'airway-crisis':
    case 'cico':
      return {
        title: 'CICO / Havayolu Krizi — Sugammadeks & eFONA',
        subtitle: 'Acil Reversal (16 mg/kg) & Yaşa Uygun eFONA Ekipmanı',
        icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      };
    case 'airway-obstruction':
      return {
        title: 'Üst Havayolu Obstrüksiyonu — Doz & Ekipman',
        subtitle: 'Deksametazon, Nebülize L-Adrenalin & Propofol',
        icon: <Wind className="w-5 h-5 text-amber-500" />,
      };
    case 'aspiration':
      return {
        title: 'Pulmoner Aspirasyon — Havayolu & Ventilasyon',
        subtitle: 'Kaflı ETT, NGT, Akciğer Koruyucu VT & PEEP',
        icon: <Activity className="w-5 h-5 text-sky-500" />,
      };
    case 'pe':
      return {
        title: 'Masif Pulmoner Emboli — Trombolitik & Antikoagülan',
        subtitle: 'Alteplase (2 sa / 15 dk), Tenecteplase & UFH',
        icon: <HeartPulse className="w-5 h-5 text-red-500" />,
      };
    case 'vae':
      return {
        title: 'Venöz Hava Embolisi (VAE) — CVC & İnfüzyon',
        subtitle: 'Kavo-atriyal CVC Derinliği & Adrenalin İnfüzyonu',
        icon: <Droplets className="w-5 h-5 text-sky-500" />,
      };
    case 'last':
      return {
        title: 'LAST (ASRA 2020) — %20 Intralipid & LA Tavanları',
        subtitle: 'Ağırlık Bazlı Lipid Protokolü & Düşük Doz Adrenalin Tavanı',
        icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      };
    case 'anaphylaxis':
      return {
        title: 'Perioperatif Anafilaksi — Evre Bazlı Adrenalin & Sıvı',
        subtitle: 'Evre II/III IV Adrenalin, IM Adrenalin, Kristalloid & Steroid',
        icon: <Syringe className="w-5 h-5 text-red-500" />,
      };
    case 'acls':
      return {
        title: 'ACLS / PALS — Kardiyak Arrest Dozları',
        subtitle: 'Adrenalin, Defibrilasyon, Anti-aritmikler & Ventilasyon',
        icon: <Zap className="w-5 h-5 text-red-500" />,
      };
    case 'mtp':
      return {
        title: 'Masif Transfüzyon Protokolü (MTP) — Hemostaz & Kan Ürünleri',
        subtitle: 'EBV, TXA, %10 CaCl₂, Fibrinojen, TDP, 4F-PCC & rFVIIa',
        icon: <Droplets className="w-5 h-5 text-red-500" />,
      };
    case 'tension-pneumothorax':
      return {
        title: 'Tansiyon Pnömotoraks — Dekompresyon & Toraks Tüpü',
        subtitle: 'ATLS 10 Anatomik Bölge, Kateter & Göğüs Tüpü Boyutları',
        icon: <Wind className="w-5 h-5 text-amber-500" />,
      };
    case 'airway-fire':
      return {
        title: 'Havayolu Yangını — Re-entübasyon & Ödem Kontrolü',
        subtitle: 'Küçük Çaplı Kaflı ETT & IV Deksametazon',
        icon: <Flame className="w-5 h-5 text-orange-500" />,
      };
    case 'fes':
      return {
        title: 'Yağ Embolizm Sendromu (FES) — Akciğer & Hemodinamik Destek',
        subtitle: 'ARDSNet Vt (4–6 mL/kg PBW), Noradrenalin, Övolemi & İlaç Uyarıları',
        icon: <Activity className="w-5 h-5 text-amber-500" />,
      };
    case 'total-spinal':
      return {
        title: 'Yüksek / Total Spinal — Erken Adrenalin, Kronotropi & Farkındalık Dozları',
        subtitle: 'Kardiyoakceleratör (T1–T4) & Frenik (C3–C5) Blokajında ABC + Perfüzyon Kurtarma',
        icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      };
    case 'intraop-mi':
      return {
        title: 'İntraoperatif Miyokard İnfarktüsü — MVO₂, Nitrat & Antitrombotik Dozları',
        subtitle: 'Esmolol, Nitrogliserin (RV/PDE-5 Uyarılı), Aspirin & Cerrahi Onaylı UFH',
        icon: <HeartPulse className="w-5 h-5 text-red-500" />,
      };
    case 'malignant-arrhythmias':
      return {
        title: 'Malign Aritmiler — Defibrilasyon, Kardiyoversiyon & Antiaritmik Dozları',
        subtitle: 'VF/pVT, Unstabil VT/SVT/AF, Torsades (MgSO₄) & WPW Kuralı',
        icon: <Zap className="w-5 h-5 text-red-500" />,
      };
    case 'intraop-bradycardia':
      return {
        title: 'İntraoperatif Bradikardi — Atropin, Kronotropi & Pacing Dozları',
        subtitle: 'AHA 2020 Atropin 1 mg, Adrenalin/Dopamin İnfüzyon & Mobitz II / Tam Blok İstisnası',
        icon: <Activity className="w-5 h-5 text-amber-500" />,
      };
    case 'intraop-hypoglycemia':
      return {
        title: 'İntraoperatif Hipoglisemi — İV Dekstroz, Tiamin & Glukagon Dozları',
        subtitle: 'Erişkin %10/%50 Dekstroz, Pediatrik Rule of 50 (%10!) & Wernicke Koruması',
        icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      };
    case 'myxedema-coma':
      return {
        title: 'Miksödem Koması — Önce Hidrokortizon, Ardından İV T4 / T3 Dozları',
        subtitle: 'ATA Kılavuzu Hormon Sırası, Pasif Isıtma & Hiponatremi Güvenliği',
        icon: <ShieldAlert className="w-5 h-5 text-purple-500" />,
      };
    case 'pheochromocytoma-crisis':
      return {
        title: 'Feokromositoma Krizi — Bifazik α-Blokaj & Post-Rezeksiyon Vazopleji',
        subtitle: 'Faz 1 Fentolamin/Nikardipin/SNP/MgSO₄ · Faz 2 Noradrenalin/Vazopressin + KŞ',
        icon: <Flame className="w-5 h-5 text-rose-500" />,
      };
    case 'adrenal-crisis':
      return {
        title: 'Adrenal Kriz — İV Hidrokortizon, Hızlı Kristaloid & Vazopressör Köprüleme',
        subtitle: 'AAGBI / SfE 2020 Stres Dozu (100 mg → 200 mg/24 sa) & Elektrolit Düzeltme',
        icon: <Syringe className="w-5 h-5 text-amber-500" />,
      };
    default:
      return {
        title: 'Acil Doz Hesaplayıcı',
        subtitle: 'Hasta kilosuna göre hızlı klinik doz hesabı',
        icon: <Calculator className="w-5 h-5 text-sky-500" />,
      };
  }
}

export const ProtocolDoseCalculatorPanel: React.FC<ProtocolDoseCalculatorPanelProps> = ({
  protocolId,
  patientWeight,
  onWeightChange,
  doses,
  isDark,
}) => {
  const meta = getProtocolHeaderMeta(protocolId);

  const renderProtocolDoses = () => {
    switch (protocolId) {
      case 'mh':
      case 'dantrolene':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <DoseCard
              label="Başlangıç Dantrolen IV"
              value={`${doses.initialDoseMg} mg`}
              detail="2.5 mg/kg hızlı IV bolus (yanıt alınamazsa 10 mg/kg'a kadar tekrarla)"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Dantrium® / Revonto® (20 mg Flk)"
              value={`${doses.dantriumVials} flakon`}
              detail={`Sulandırma: ${doses.dantriumWaterMl} mL koruyucusuz steril enjeksiyonluk su (60 mL / flakon)`}
              warning={`${doses.dantriumWaterMl} mL koruyucusuz steril enjeksiyonluk su — SF/D5W KULLANMA!`}
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="Ryanodex® (250 mg Flk)"
              value={`${doses.ryanodexVials} flakon`}
              detail={`Sulandırma: ${doses.ryanodexWaterMl} mL koruyucusuz steril enjeksiyonluk su (5 mL / flakon)`}
              tone="emerald"
              isDark={isDark}
            />
          </div>
        );

      case 'bronchospasm':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <DoseCard
              label="Salbutamol (Albuterol)"
              value="8–10 puf MDI"
              detail="ETT adaptörü ile inhale (veya 2.5–5 mg nebülize)"
              tone="blue"
              isDark={isDark}
            />
            <DoseCard
              label="Magnezyum Sülfat (MgSO₄)"
              value={`${doses.magnesiumGrams} g IV`}
              detail="40–50 mg/kg, maks 2 g (20 dk yavaş IV infüzyon)"
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="Ketamin IV Bolus"
              value={`${doses.ketamineBolusMg} mg IV`}
              detail="0.5 mg/kg IV (bronkodilatör etki)"
              tone="purple"
              isDark={isDark}
            />
            <DoseCard
              label="Adrenalin IV (Titre)"
              value={`${doses.adrenalinBolusMcg} mcg IV`}
              detail="Refrakter / ağır bronkospazmda küçük titre bolus"
              warning="Titre et — nabızlı hastada 1 mg VERME!"
              tone="red"
              isDark={isDark}
              className="sm:col-span-2 lg:col-span-2"
            />
            <DoseCard
              label="Metilprednizolon IV"
              value={`${doses.methylpredBronchoMg} mg IV`}
              detail="1–2 mg/kg IV (maks 125 mg)"
              tone="neutral"
              isDark={isDark}
            />
          </div>
        );

      case 'laryngospasm':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DoseCard
              label="Propofol IV (Derinleştirme)"
              value={`${doses.propofolLaryngoMg} mg IV`}
              detail="0.5 mg/kg IV (CPAP + Larson manevrasına yanıtsızsa)"
              tone="blue"
              isDark={isDark}
            />
            <DoseCard
              label="Süksinilkolin (IV / IM)"
              value={`${doses.succinylcholineIvMg} mg IV / ${doses.succinylcholineImMg} mg IM`}
              detail="IV: 0.25 mg/kg (maks 40 mg) · Damar yolu yoksa IM: 3.5–4 mg/kg (maks 200 mg)"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Atropin IV"
              value={`${doses.atropineLaryngoMg} mg IV`}
              detail="0.02 mg/kg IV (bradikardi profilaksisi / tedavisi, maks 0.5 mg)"
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="Rokuronyum Kurtarma"
              value={`${doses.rocuroniumLaryngoMg} mg IV`}
              detail="1.2 mg/kg IV (hızlı seri entübasyon dozu)"
              warning="Süksinilkolin kontrendike ise (hiperkalemi, MH şüphesi, yanık, miyopati) kullan!"
              tone="purple"
              isDark={isDark}
            />
          </div>
        );

      case 'airway-crisis':
      case 'cico':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DoseCard
              label="Sugammadeks (Acil Reversal — 16 mg/kg)"
              value={`${doses.sugammadexMg} mg IV`}
              detail={`${doses.sugammadexVials200} × 200 mg flakon  veya  ${doses.sugammadexVials500} × 500 mg flakon`}
              warning="Rokuronyum/Vekuronyum sonrası acil geri döndürme — eFONA hazırlığını geciktirme!"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Atropin IV"
              value={`${doses.atropineCicoMg} mg IV`}
              detail="0.02 mg/kg IV (hipoksik bradikardi için, maks 1 mg)"
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="eFONA Ekipman Önerisi"
              value={doses.cicoEfonaRecommendation}
              warning={
                doses.isPediatric
                  ? 'PEDİATRİK UYARI: <40 kg / küçük çocukta cerrahi krikotirotomi KONTRENDİKE! İğne krikotirotomi veya KBB acil trakeostomi uygula.'
                  : 'DAS 2015 Skalpel-Buji-Tüp tekniği: Krikotiroid membran palpe edilemiyorsa 8–10 cm dikey cilt insizyonu.'
              }
              tone={doses.isPediatric ? 'red' : 'blue'}
              isDark={isDark}
              className="sm:col-span-2"
            />
          </div>
        );

      case 'airway-obstruction':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <DoseCard
              label="Deksametazon IV"
              value={`${doses.dexamethasoneObsMg} mg IV`}
              detail="0.2 mg/kg IV (maks 16 mg) — ödem azaltıcı"
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="Nebülize L-Adrenalin (1:1000)"
              value={`${doses.nebAdrenalineMl} mL`}
              detail="0.5 mL/kg (maks 5 mL, 1 mg/mL solüsyon)"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Propofol IV"
              value={`${doses.propofolObsMg} mg IV`}
              detail="1.5 mg/kg IV (entübasyon / derinleştirme gerekirse)"
              tone="blue"
              isDark={isDark}
            />
          </div>
        );

      case 'aspiration':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <DoseCard
              label="Endotrakeal Tüp (ETT)"
              value={doses.aspirationEttNote}
              detail="Hızlı seri entübasyon (RSI) — kaflı tüp ile havayolu güvenliği"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Nazogastrik Sonda (NGT)"
              value={doses.aspirationNgtNote}
              detail="Entübasyon sonrası mide dekompresyonu"
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="Koruyucu Tidal Volüm (VT)"
              value={`${doses.aspirationVtMin}–${doses.aspirationVtMax} mL`}
              detail="6–8 mL/kg (ideal vücut ağırlığına göre akciğer koruyucu)"
              tone="blue"
              isDark={isDark}
            />
            <DoseCard
              label="PEEP"
              value="6–10 cmH₂O"
              detail="Alveoler rekruitment & hipoksemi kontrolü (FiO₂ titre et)"
              tone="emerald"
              isDark={isDark}
            />
          </div>
        );

      case 'pe':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DoseCard
              label="Alteplase 2-Saatlik İnfüzyon"
              value={`${doses.alteplase2hMg} mg`}
              detail="≥65 kg: 100 mg / 2 saat · <65 kg: 1.5 mg/kg / 2 saat"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Alteplase 15-dk Hızlı / Peri-Arrest"
              value={`${doses.alteplase15mMg} mg`}
              detail="0.6 mg/kg (maks 50 mg) 15 dk IV"
              warning="Arrestte 50 mg 1–2 dk IV bolus + 60–90 dk KPR devam!"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Tenecteplase (Tek Bolus)"
              value={`${doses.tenecteplaseMg} mg (${doses.tenecteplaseIU} IU)`}
              detail="Ağırlık basamağına göre 5–10 sn tek IV bolus"
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="UFH (Unfraksiyone Heparin)"
              value={`${doses.ufhBolusUnits} IU bolus / ${doses.ufhInfusionUnitsHr} IU/saat`}
              detail="80 IU/kg bolus (maks 10.000 IU) · 18 IU/kg/saat (maks 2.000 IU/saat)"
              warning="Tromboliz sırasında UFH durdurulur!"
              tone="blue"
              isDark={isDark}
            />
          </div>
        );

      case 'vae':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DoseCard
              label="CVC Derinliği (Hava Aspirasyonu)"
              value={doses.vaeCvcDepthNote}
              detail="Çok lümenli kateter ucu kavo-atriyal bileşkede konumlandırılır"
              tone="blue"
              isDark={isDark}
            />
            <DoseCard
              label="Adrenalin İnfüzyonu"
              value={`${doses.vaeAdrenalineLowMcgMin}–${doses.vaeAdrenalineHighMcgMin} mcg/dk`}
              detail="0.05–0.2 mcg/kg/dk (RV kontraktilite ve sistemik perfüzyon desteği)"
              tone="red"
              isDark={isDark}
            />
          </div>
        );

      case 'last':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <DoseCard
                label="ASRA 2020 %20 Intralipid — Bolus"
                value={`${doses.lastLipidBolusMl} mL`}
                detail={
                  doses.isLastAdultFixed
                    ? '≥70 kg sabit rejim: 100 mL IV (2–3 dk)'
                    : '<70 kg ağırlık bazlı: 1.5 mL/kg IV (2–3 dk)'
                }
                tone="red"
                isDark={isDark}
              />
              <DoseCard
                label="ASRA 2020 %20 Intralipid — İnfüzyon"
                value={`${doses.lastLipidInfusionMlHr} mL/saat`}
                detail={
                  doses.isLastAdultFixed
                    ? '≥70 kg sabit rejim: 200–250 mL / 15–20 dk'
                    : `<70 kg: 0.25 mL/kg/dk (${doses.lastLipidInfusionMlMin} mL/dk)`
                }
                tone="amber"
                isDark={isDark}
              />
              <DoseCard
                label="%20 Intralipid Maksimum Toplam"
                value={`${doses.lastLipidMaxMl} mL`}
                detail="Maks ~12 mL/kg IBW (üst sınır 1000 mL / ilk 30 dk)"
                tone="blue"
                isDark={isDark}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DoseCard
                label="Adrenalin Tavanı (LAST)"
                value={`≤${doses.lastAdrenalineMaxMcg} mcg IV`}
                detail="<1 mcg/kg küçük boluslarla titre et — Vazopresin, CCB, Beta-bloker ve Lidokain KULLANMA!"
                warning="1 mg / 100 mL SF = 10 mcg/mL dilüsyon hazırla! Standart 1 mg ACLS bolusu VERME!"
                tone="red"
                isDark={isDark}
              />
              <DoseCard
                label="Lokal Anestezik Maksimum Dozlar"
                value={`Bupi ${doses.lastBupiMaxMg} mg · Lido ${doses.lastLidoMaxMg} mg`}
                detail={`Lidokain + Epinefrin: maks ${doses.lastLidoEpiMaxMg} mg (Bupivakain 2 mg/kg · Lidokain 4.5 mg/kg · Lido+Epi 7 mg/kg)`}
                tone="neutral"
                isDark={isDark}
              />
            </div>
          </div>
        );

      case 'anaphylaxis':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <DoseCard
              label="Evre II IV Adrenalin"
              value={`${doses.anaphylaxisGrade2Mcg} mcg IV`}
              detail={doses.isPediatric ? '0.5 mcg/kg IV titre' : '20 mcg IV titre (1–2 dk arayla)'}
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="Evre III IV Adrenalin"
              value={`${doses.anaphylaxisGrade3Mcg} mcg IV`}
              detail={doses.isPediatric ? '1 mcg/kg titre' : '50–200 mcg titre'}
              warning="Ciddi hipotansiyon / bronkospazm — 1–2 dk arayla titre et, yanıt yoksa infüzyon başlat!"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="IM Adrenalin (IV Yol Yoksa)"
              value={`${doses.anaphylaxisImMg} mg IM`}
              detail="Uyluk anterolateral (1:1000) · 5 dk'da bir tekrarlanabilir"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Kristalloid Bolus"
              value={`${doses.anaphylaxisFluidBolusMl} mL`}
              detail="20 mL/kg hızlı IV izotonik kristalloid (maks 2000 mL / bolus)"
              tone="blue"
              isDark={isDark}
            />
            <DoseCard
              label="Metilprednizolon IV"
              value={`${doses.anaphylaxisMethylpredMg} mg IV`}
              detail="1–2 mg/kg IV (maks 125 mg) — bifazik reaksiyon profilaksisi"
              tone="neutral"
              isDark={isDark}
            />
          </div>
        );

      case 'acls':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <DoseCard
              label="Adrenalin (Epinefrin)"
              value={doses.aclsEpiLabel}
              detail="Her 3–5 dakikada bir IV/IO"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Defibrilasyon (VF / Nabızsız VT)"
              value={doses.aclsDefibLabel}
              detail="Şok sonrası hemen kesintisiz KPR'a dön"
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="Amiodaron IV/IO"
              value={`${doses.aclsAmio1Mg} mg`}
              detail={`2. doz: ${doses.aclsAmio2Mg} mg (refrakter VF/nVT)`}
              tone="purple"
              isDark={isDark}
            />
            <DoseCard
              label="Lidokain IV/IO (Alternatif)"
              value={`${doses.aclsLidoMinMg}–${doses.aclsLidoMaxMg} mg`}
              detail="Amiodaron yoksa veya kontrendike ise 1–1.5 mg/kg"
              tone="neutral"
              isDark={isDark}
            />
            <DoseCard
              label="Ventilasyon (İleri Havayolu)"
              value={doses.aclsVentRateLabel}
              warning={
                doses.isPediatric
                  ? 'Pediatrik: 20–30/dk (2–3 sn/soluk) — göğüs kompresyonlarına ara verme!'
                  : 'Erişkin: 10/dk (6 sn/soluk) — Hiperventilasyondan kaçın!'
              }
              tone="blue"
              isDark={isDark}
            />
            <DoseCard
              label="Sıvı Bolus (Hipovolemi Şüphesi)"
              value={`${doses.aclsFluidBolusMl} mL`}
              detail="20 mL/kg izotonik kristalloid (maks 2000 mL)"
              tone="emerald"
              isDark={isDark}
            />
          </div>
        );

      case 'mtp':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <DoseCard
              label="Tahmini Kan Hacmi (EBV)"
              value={`${doses.mtpEbvMl} mL`}
              detail={`~70 mL/kg · %50 kayıp eşiği: ${doses.mtpFiftyPercentLossMl} mL`}
              tone="neutral"
              isDark={isDark}
            />
            <DoseCard
              label="Traneksamik Asit (TXA)"
              value={doses.mtpTxaLabel}
              detail="İlk 3 saat içinde başlanmalı"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="%10 Kalsiyum Klorür (CaCl₂)"
              value={doses.mtpCaCl2Label}
              detail="Hedef iyonize Ca²⁺ > 1.1 mmol/L (sitrat toksisitesi)"
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="Fibrinojen Konsantresi"
              value={`${doses.mtpFibrinogenMinG}–${doses.mtpFibrinogenMaxG} g`}
              detail="Hedef fibrinojen > 1.5–2.0 g/L (obstetrik > 2 g/L)"
              tone="purple"
              isDark={isDark}
            />
            <DoseCard
              label="Taze Donmuş Plazma (TDP)"
              value={`${doses.mtpFfpMinMl}–${doses.mtpFfpMaxMl} mL`}
              detail="15–20 mL/kg (ES:TDP:Trombosit 1:1:1 oranı)"
              tone="blue"
              isDark={isDark}
            />
            <DoseCard
              label="4F-PCC"
              value={`${doses.mtpPccMinIU}–${doses.mtpPccMaxIU} IU`}
              detail="15–25 IU/kg (antikoagülan / refrakter koagülopati)"
              tone="neutral"
              isDark={isDark}
            />
            <DoseCard
              label="rFVIIa (Kurtarma)"
              value={`${doses.mtpRf7aMg} mg`}
              detail="90 mcg/kg IV (yalnızca pH/Ca²⁺/ısı/fibrinojen düzeltildikten sonra)"
              tone="red"
              isDark={isDark}
              className="sm:col-span-2"
            />
          </div>
        );

      case 'tension-pneumothorax':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <DoseCard
              label="İğne Dekompresyon Yeri"
              value={
                doses.isPedsPneumo
                  ? '2. İKA Midklaviküler Hat (MCL)'
                  : '4–5. İKA Ön/Orta Aksiller Hat (ATLS 10)'
              }
              detail="Kotun üst kenarından dik girerek plevral boşluğa ulaş"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Dekompresyon Kateteri"
              value={doses.isPedsPneumo ? '16–18G × 3.8–5 cm' : '14G × ≥5 cm'}
              detail={
                doses.isPedsPneumo
                  ? 'Pediatrik göğüs duvarına uygun uzunlukta anjiyokat'
                  : 'Erişkinde 5–8 cm uzunluk (kısa kateter yetmezliği riski)'
              }
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="Göğüs Tüpü (Tüp Torakostomi)"
              value={doses.isPedsPneumo ? '10–20 Fr' : '24–28 Fr Travma / 10–14 Fr Basit'}
              detail="İğne dekompresyon sonrası kesin tedavi — trokar kullanma"
              tone="blue"
              isDark={isDark}
            />
          </div>
        );

      case 'airway-fire':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DoseCard
              label="Re-entübasyon ETT"
              value={doses.airwayFireEttNote}
              detail="Termal ödem beklendiği için normalden 0.5–1.0 mm küçük kaflı tüp"
              warning="Önce alevi söndür: ETT çıkar · O₂/N₂O kes · Salin dök · Maske ile ventilasyon!"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Deksametazon IV"
              value={`${doses.airwayFireDexaMg} mg IV`}
              detail="0.15 mg/kg IV (maks 10 mg) — havayolu ödemi kontrolü"
              tone="amber"
              isDark={isDark}
            />
          </div>
        );

      case 'fes':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DoseCard
              label="Akciğer Koruyucu Tidal Volüm (ARDSNet — PBW!)"
              value={`${doses.fesVtMin}–${doses.fesVtMax} mL`}
              detail={`4–6 mL/kg PBW (ARDS dışı üst sınır: ${doses.fesVtUpperNonArds} mL) · Pplat <30 cmH₂O · Driving Pressure <15 · PEEP 8–12 cmH₂O`}
              warning={
                doses.fesPbwCaution
                  ? `DİKKAT: ${doses.weightNum} kg gerçek kilo (TBW) ise obez hastada volutravma yapar! Boya göre İdeal Vücut Ağırlığı (PBW) girin — Erkek: 50 + 0,91×(boy−152,4) · Kadın: 45,5 + 0,91×(boy−152,4).`
                  : 'Tidal volüm daima boya göre İdeal Vücut Ağırlığı (PBW) ile hesaplanır (Erkek: 50 + 0,91×[boy−152,4] · Kadın: 45,5 + 0,91×[boy−152,4]).'
              }
              tone={doses.fesPbwCaution ? 'amber' : 'blue'}
              isDark={isDark}
            />
            <DoseCard
              label="Noradrenalin İnfüzyonu (RV & Perfüzyon)"
              value={`${doses.fesNoradMinMcgMin}–${doses.fesNoradMaxMcgMin} mcg/dk`}
              detail={`0,05–0,5 mcg/kg/dk IV (Hedef MAP ≥65–70 mmHg; santral: 4 mg/50 mL = 80 mcg/mL, acil periferik: 4 mg/250 mL = 16 mcg/mL) · Dobutamin: ${doses.fesDobutaMinMcgMin}–${doses.fesDobutaMaxMcgMin} mcg/dk (2–10 mcg/kg/dk)`}
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Sıvı Dengesi & Övolemi"
              value={doses.fesFluidTryLabel}
              detail="Hipovolemiden kaçın; RV yükü varsa aşırı bolustan kaçın (gereğinde %5 Albümin FFA bağlayıcı destek)"
              tone="emerald"
              isDark={isDark}
            />
            <DoseCard
              label="Kesin İlaç Kuralı (Spesifik Antidot YOK)"
              value="Heparin YASAK · Rutin Steroid YOK"
              detail="Heparin lipoprotein lipazı aktive ederek toksik serbest yağ asidi (FFA) yükünü ve kırık kanamasını artırır."
              warning="Trombotik PE kanıtlanmadıkça antikoagülasyon VERİLMEZ; yerleşik FES'te rutin yüksek doz steroid önerilmez!"
              tone="amber"
              isDark={isDark}
            />
          </div>
        );

      case 'total-spinal':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DoseCard
              label="Erken IV Adrenalin (Refrakter Bradikardi / Şok)"
              value={doses.totalSpinalEpiBridgeLabel}
              detail={`Kardiyak arrestte ACLS dozu: ${doses.totalSpinalEpiArrestLabel} · İdame vazoplejide Noradrenalin 0,05–0,5 mcg/kg/dk`}
              warning="T1–T4 kardiyoakceleratör bloğunda Atropin/Efedrin yetmezse asistoli gelişmeden erken düşük doz IV Adrenalin başlat!"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Atropin · Efedrin · Fenilefrin"
              value={`${doses.totalSpinalAtropineLabel.split(' (')[0]} · ${doses.totalSpinalEphedrineLabel}`}
              detail={`Atropin: ${doses.totalSpinalAtropineLabel} · Efedrin: ${doses.totalSpinalEphedrineLabel} · Fenilefrin (yalnızca taşikardide/obstetrikte): ${doses.totalSpinalPhenylephrineLabel}`}
              warning="Bradikardide (<50/dk) tek başına yüksek doz Fenilefrin refleks vagal deşarjla bradikardiyi derinleştirip asistoli yapabilir!"
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="Hızlı Önyük (Preload) & Güvenli Pozisyon"
              value={`${doses.totalSpinalFluidBolusMl} mL Dengeli Kristaloid`}
              detail="Geniş IV hattan hızlı bolus (10–20 mL/kg) + Pasif Bacak Kaldırma (Passive Leg Raise) + Gebede (>20 hf) Manuel Sol Uterin Deplasman (LUD)"
              warning="Hiperbarik LA sonrası ilk 15–20 dk'da DİK TRENDELENBURG (baş-aşağı) YASAK — ilacı beyin sapına sürükler! Yalnızca bacakları kaldır."
              tone="blue"
              isDark={isDark}
            />
            <DoseCard
              label="Havayolu & Farkındalık (Awareness) Koruması"
              value={`Ketamin ${doses.totalSpinalKetamineLabel} / Midazolam ${doses.totalSpinalMidazolamMg} mg`}
              detail="Apne, fısıltı ses veya bilinç kaybında %100 O₂ + erken RSI entübasyon · Dolaşım toparlanınca 0,5–0,7 MAC volatil / titre sedasyon + BIS"
              warning="Hasta apneik & hareketsiz ama BİLİNÇLİ olabilir! Şokta standart tam doz Propofol (2 mg/kg) ölümcül arrest yapar — düşük doz Ketamin/Etomidat seç."
              tone="emerald"
              isDark={isDark}
            />
          </div>
        );

      case 'intraop-mi':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DoseCard
              label="Kalp Hızı & MVO₂ Kontrolü (Esmolol)"
              value={`${doses.miEsmololBolusMg} mg bolus → ${doses.miEsmololInfMinMgMin}–${doses.miEsmololInfMaxMgMin} mg/dk`}
              detail="0,5 mg/kg IV bolus → 50–200 mcg/kg/dk (Hedef HR 60–70/dk, diyastolik koroner doluşu uzatır; alternatif Metoprolol 1–5 mg IV)"
              warning="Akut dekompanse KKY, kardiyojenik şok, bradikardi veya 2.–3. derece AV blokta β-bloker VERME!"
              tone="blue"
              isDark={isDark}
            />
            <DoseCard
              label="Koroner Vazodilatasyon (Nitrogliserin)"
              value="50–100 mcg bolus · 5–200 mcg/dk inf."
              detail="Preload ve koroner spazmı azaltır (SKB ≥100 mmHg ise). Eşzamanlı Hb ≥8–9 g/dL, SpO₂ ≥%95, normotermi ve ağrı kontrolü sağla."
              warning="İnferior/Sağ Ventrikül (RV) infarktında (D2/D3/aVF + V4R) ve son 24–48 saatte PDE-5 inhibitörü (Sildenafil/Tadalafil) alanlarda YASAK!"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Antitrombotik (Cerrahi Ekiple Ortak Karar)"
              value={`Aspirin 162–325 mg · UFH ${doses.miUfhMinIu}–${doses.miUfhMaxIu} IU`}
              detail="Aspirin çiğneme/NG/rektal (kanama kontrendikasyonu yoksa); UFH 60–70 IU/kg (maks 5000 IU) yalnızca cerrah onayıyla"
              warning="Aktif cerrahide FİBRİNOLİTİK KESİN KONTRENDİKEDİR! STEMI / yüksek riskli Tip 1 MI'da hedef acil Primer PKG (anjiyo)!"
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="Kardiyojenik Şok & Perfüzyon Hedefi"
              value={`Noradrenalin ${doses.adrenalNoradRangeMcgMin}`}
              detail="Koroner perfüzyon için MAP ≥65–70 mmHg · Düşük debi/RWMA varsa Dobutamin (2–10 mcg/kg/dk) + erken Kardiyoloji / IABP / VA-ECMO"
              tone="emerald"
              isDark={isDark}
            />
          </div>
        );

      case 'malignant-arrhythmias':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DoseCard
              label="Defibrilasyon (VF / Nabızsız VT / Polimorfik VT)"
              value={doses.arrDefibLabel}
              detail="ASENKRON (defibrilasyon) şok + hemen 2 dk kesintisiz KPR (100–120/dk) + Adrenalin 1 mg (çocuk 10 mcg/kg) her 3–5 dk"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Senkronize Kardiyoversiyon (Nabızlı Unstabil)"
              value={doses.arrCardioversionLabel}
              detail="Hipotansiyon, iskemi veya şok bulgusu varsa SENKRONİZE şok uygula (bilinçli hastada sedasyon ver; nabızsız/polimorfik VT'de senkronize ETME, defibrilasyon uygula!)."
              warning={`Stabil düzenli dar SVT'de Adenozin: ${doses.arrAdenosineLabel} · WPW pre-eksitasyonlu AF'de AV düğüm blokerleri YASAK (VF yapar)!`}
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="Antiaritmik (VF / Monomorfik VT)"
              value={doses.arrAmioLabel}
              detail="Alternatif: Lidokain 1–1,5 mg/kg IV (→ 0,5–0,75 mg/kg) · Stabil monomorfik VT'de Prokainamid 20–50 mg/dk (maks 17 mg/kg)"
              tone="blue"
              isDark={isDark}
            />
            <DoseCard
              label="Torsades de Pointes (Uzun QT · Polimorfik VT)"
              value={`IV MgSO₄ ${doses.arrTorsadesMgLabel}`}
              detail="K⁺ >4,0 mEq/L hedefle; bradikardi bağımlı edinsel uzun QT'de overdrive pacing veya İzoproterenol · Nabızsızda hemen defibrilasyon!"
              warning="Torsades de Pointes'te Amiodaron VERME (QT aralığını daha da uzatıp aritmiyi şiddetlendirir!)"
              tone="purple"
              isDark={isDark}
            />
          </div>
        );

      case 'intraop-bradycardia':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DoseCard
              label="1. Basamak: Cerrahi Uyarıyı Durdur + Atropin"
              value={doses.bradyAtropineLabel}
              detail="Önce vagal uyaranı (pnömoperitonyum, OCR/TCR, mezenter traksiyon) durdur ve %100 O₂/ventilasyonu doğrula."
              warning="Mobitz Tip II, 3. Derece (Tam) AV Blok ve Kalp Nakli (denerve kalp) hastasında Atropin ETKİSİZDİR — zaman kaybetmeden TCP/Adrenalin geç!"
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="2. Basamak: Adrenalin / Dopamin İnfüzyon"
              value={doses.bradyEpiLabel}
              detail={`Alternatif Dopamin: ${doses.bradyDopamineRangeMcgMin} (5–20 mcg/kg/dk) · Denerve kalpte İzoproterenol 2–10 mcg/dk`}
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Transkutanöz Pacing (TCP) Ayarları"
              value="Hız 70–80/dk · Akım Eşik +10 mA"
              detail="Elektrik yakalama (capture) sonrası MUTLAKA mekanik nabız (radial/femoral/pleth/arter) teyit et; bilinçli hastada analgosedasyon ver."
              tone="blue"
              isDark={isDark}
            />
            <DoseCard
              label="Pediatrik & KİBAS (Cushing) İstisnaları"
              value="Pediatrik: Önce %100 O₂ · HR<60 = KPR!"
              detail="Çocukta bradikardinin 1 numaralı nedeni HİPOKSİDİR (O₂/ventilasyona rağmen HR <60 + kötü perfüzyon → hemen KPR + Adrenalin 10 mcg/kg)."
              warning="KİBAS + Hipertansiyon + Bradikardi (Cushing Refleksi) varlığında Atropin VERME — ICP'yi düşür (Mannitol/%3 NaCl)!"
              tone="emerald"
              isDark={isDark}
            />
          </div>
        );

      case 'intraop-hypoglycemia':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DoseCard
              label="Acil İV Dekstroz Bolusu"
              value={doses.hypoDextroseLabel}
              detail={`Toplam glukoz yükü: ${doses.hypoDextroseGrams} · Periferik ven dostu %10 Dekstroz ekstravazasyon nekrozu riskini azaltır.`}
              warning={
                doses.isPediatric
                  ? 'PEDİATRİK KURAL (Rule of 50): Çocuk/yenidoğanda %50 Dekstroz YASAK (hiperozmotik venöz nekroz & İVH riski)! Yalnızca %10 Dekstroz (2–5 mL/kg; yenidoğan 2 mL/kg) ver!'
                  : 'İnsülin infüzyonunu DERHAL kapat; 15 dk sonra KŞ tekrarla (hedef 100–180 mg/dL) ve %5–10 Dekstroz idame başlat.'
              }
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Wernicke Koruması (Alkolizm / Malnütrisyon)"
              value="Tiamin 100–500 mg IV"
              detail="Alkol kullanım bozukluğu, kronik malnütrisyon, bariatrik cerrahi veya uzamış açlıkta dekstrozla birlikte (tercihen hemen önce) uygula."
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="İV Yol Yoksa: Glukagon"
              value={doses.hypoGlucagonLabel}
              detail="Hepatik glikojenoliz üzerinden etki eder (etki 10–15 dk); karaciğer yetmezliği, alkolizm ve uzun açlıkta glikojen boşsa ETKİSİZDİR!"
              tone="blue"
              isDark={isDark}
            />
            <DoseCard
              label="Sülfonilüre / İnsülinoma Nüks Koruması"
              value="Oktreotid 50–100 mcg SC/IV (6–8 sa)"
              detail="Sülfonilüre aşırı dozunda tek başına dekstroz pankreatik insülin salınımını yeniden tetikler; Oktreotid rebound hipoglisemiyi keser."
              tone="emerald"
              isDark={isDark}
            />
          </div>
        );

      case 'myxedema-coma':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DoseCard
              label="1. ÖNCE İV Hidrokortizon (Adrenal Kriz Önlemi!)"
              value={doses.myxedemaHydrocortLabel}
              detail="Bazal TSH, sT4, sT3 ve serum kortizol örneğini al — SONUCU BEKLEMEDEN tiroid hormonundan ÖNCE Hidrokortizon ver!"
              warning="Önce T4/T3 vermek kortizol yıkımını hızlandırıp ölümcül ADRENAL KRİZ tetikler!"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="2. İV Levotiroksin (T4) Yükleme"
              value={doses.myxedemaT4Label}
              detail="İdame: 50–100 mcg/gün IV (yaşlı, düşük kilolu veya KAH/aritmi riskli hastada 200 mcg alt sınırı seç)"
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="Seçili Olguda Liyotironin (T3)"
              value={doses.myxedemaT3Label}
              detail="Ağır refrakter hipotermi/şokta periferik T4→T3 dönüşümü bozuksa seçili eklenir; yüksek T3 miyokard iskemisi ve aritmi riskini artırır."
              tone="purple"
              isDark={isDark}
            />
            <DoseCard
              label="Isıtma, Havayolu & Hiponatremi Güvenliği"
              value="Pasif Isıtma · Na⁺ ≤6–8 mEq/L/24 sa"
              detail="Makroglossi/laringeal miksödem = ZOR HAVAYOLU (küçük ETT + videolaringoskop) · Minimum anestezik/opioid + BIS"
              warning="Agresif aktif eksternal ısıtma periferik vazodilatasyonla 'rewarming şoku' (kardiyak kollaps) yapar — pasif ısıtma uygula!"
              tone="blue"
              isDark={isDark}
            />
          </div>
        );

      case 'pheochromocytoma-crisis':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DoseCard
              label="Faz 1 · Önce α-Blokaj / Direkt Vazodilatasyon"
              value={`Fentolamin 1–5 mg · SNP ${doses.pheoSnpRangeMcgMin}`}
              detail="Nikardipin 5–15 mg/sa (veya Klevidipin 1–16 mg/sa) · Sodyum Nitroprussid 0,3–2 mcg/kg/dk (kısa pik maks 3–5; ışıktan koru)"
              warning="Yeterli α-blokaj sağlanmadan ASLA tek başına β-bloker veya IV Labetalol (α:β = 1:7) VERME — karşılanmamış α₁ krizi & pulmoner ödem!"
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="Faz 1 · Magnezyum Sülfat & α-Sonrası Esmolol"
              value={`MgSO₄ ${doses.pheoMgLoadLabel}`}
              detail={`MgSO₄ katekolamin salınımını inhibe eder + antiaritmik · Yeterli α-blokaj SONRASI taşiaritmi için Esmolol ${doses.pheoEsmololBolusMg} mg bolus → 50–200 mcg/kg/dk`}
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="Faz 2 · Adrenal Ven Ligasyonu Sonrası Vazopleji"
              value={`Noradrenalin ${doses.adrenalNoradRangeMcgMin} + Vazopressin`}
              detail="Ligasyon anında tüm vazodilatatörleri KAPAT! Agresif dengeli kristaloid + Noradrenalin; katekolamin direncinde Vazopressin 0,01–0,04 IU/dk"
              tone="blue"
              isDark={isDark}
            />
            <DoseCard
              label="Yasak Tetikleyiciler & Post-Rezeksiyon Hipoglisemi"
              value="30–60 dk'da bir KŞ Takibi!"
              detail="Ven ligasyonu sonrası rebound insülin salınımı ağır HİPOGLİSEMİ yapar."
              warning="KESİN KAÇIN: Metoklopramid, Droperidol, Morfin/Atrakuryum (histamin), Desfluran, Ketamin, Efedrin, Süksinilkolin ve Glukagon!"
              tone="emerald"
              isDark={isDark}
            />
          </div>
        );

      case 'adrenal-crisis':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DoseCard
              label="1. Acil İV Hidrokortizon (Sonuç Bekleme!)"
              value={doses.adrenalHydrocortLabel}
              detail="Mümkünse öncesi 1 tüp serum kortizol/ACTH al ama sonucu BEKLEME! ≥50–100 mg/gün Hidrokortizon güçlü mineralokortikoid etki de sağlar."
              warning="Deksametazon'un mineralokortikoid etkisi YOKTUR — yalnızca Hidrokortizon yoksa geçici alternatif olarak kullanılır."
              tone="red"
              isDark={isDark}
            />
            <DoseCard
              label="2. Agresif Sıvı Resüsitasyonu"
              value={doses.adrenalFluid1hLabel}
              detail="İlk 24 saatte erişkinde 3–4 L kristaloid (hemodinamiye titre) · Hiponatremi varsa düzeltme hızı ≤6–8 mEq/L/24 sa (ODS önlemi!)"
              tone="blue"
              isDark={isDark}
            />
            <DoseCard
              label="3. Noradrenalin Köprüleme"
              value={`${doses.adrenalNoradRangeMcgMin} (0,05–0,5 mcg/kg/dk)`}
              detail="Hedef MAP ≥65 mmHg · İV Hidrokortizon 1–2 saat içinde vasküler α₁-adrenerjik reseptör duyarlılığını geri kazandırır."
              tone="amber"
              isDark={isDark}
            />
            <DoseCard
              label="4. Hipoglisemi, Hiperkalemi & Etomidat Uyarısı"
              value="KŞ + K⁺ + AKG STAT Kontrol"
              detail="KŞ <70 mg/dL ise İV Dekstroz; primer krizde K⁺ >6,0/EKG değişikliği varsa %10 Ca Glukonat + İnsülin-Dekstroz"
              warning="Etomidat 11β-hidroksilazı inhibe ederek adrenal steroid sentezini 24–48 saat baskılar — riskli hastada tekrar doz/infüzyondan kaçın!"
              tone="emerald"
              isDark={isDark}
            />
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DoseCard
              label="Girilen Hasta Kilosu"
              value={`${doses.weightNum} kg`}
              detail={doses.isPediatric ? 'Pediatrik hasta (<40 kg)' : 'Erişkin hasta (≥40 kg)'}
              tone="blue"
              isDark={isDark}
            />
          </div>
        );
    }
  };

  return (
    <section
      aria-label="Protokol Doz Hesaplayıcı"
      className={`rounded-2xl border p-4 sm:p-5 transition-colors ${
        isDark
          ? 'bg-slate-900/90 border-slate-700/80 shadow-lg shadow-black/20'
          : 'bg-slate-50/90 border-slate-200 shadow-sm'
      }`}
    >
      {/* Shared Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-dashed border-slate-300/60 dark:border-slate-700">
        <div className="flex items-start gap-3">
          <div
            className={`p-2.5 rounded-xl shrink-0 ${
              isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200 shadow-xs'
            }`}
          >
            {meta.icon}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`text-base sm:text-lg font-extrabold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {meta.title}
              </h3>
              {doses.isPediatric && (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black tracking-wide border ${
                    isDark
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}
                >
                  PEDİATRİK (&lt;40 kg)
                </span>
              )}
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {meta.subtitle}
            </p>
          </div>
        </div>

        {/* Weight Input */}
        <div className="flex items-center gap-2.5 shrink-0">
          <label
            htmlFor="protocol-calc-weight"
            className={`text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            Hasta Kilosu
          </label>
          <div className="relative flex items-center">
            <input
              id="protocol-calc-weight"
              type="number"
              min={1}
              max={300}
              step="any"
              value={patientWeight}
              onChange={(e) => onWeightChange(e.target.value)}
              placeholder="70"
              aria-invalid={!doses.isValidWeight}
              className={`w-28 rounded-xl border px-3 py-2 pr-9 text-base font-black text-right tabular-nums focus:outline-none focus:ring-2 transition-colors ${
                !doses.isValidWeight
                  ? isDark
                    ? 'bg-red-950/50 border-red-500 text-red-100 focus:ring-red-500/50'
                    : 'bg-red-50 border-red-400 text-red-900 focus:ring-red-400/50'
                  : isDark
                    ? 'bg-slate-800 border-slate-600 text-white focus:ring-sky-500/50'
                    : 'bg-white border-slate-300 text-slate-900 focus:ring-sky-500/40'
              }`}
            />
            <span
              className={`pointer-events-none absolute right-3 text-xs font-bold ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              kg
            </span>
          </div>
        </div>
      </div>

      {/* Body: Invalid Weight Guard OR Protocol Dose Cards */}
      <div className="mt-4">
        {!doses.isValidWeight ? (
          <div
            role="alert"
            className={`flex items-start gap-3 rounded-xl border p-4 ${
              isDark
                ? 'bg-red-950/60 border-red-500/50 text-red-100'
                : 'bg-red-50 border-red-300 text-red-900'
            }`}
          >
            <AlertTriangle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
            <p className="text-sm font-bold leading-snug">
              Geçerli bir hasta kilosu girin (1 – 300 kg). Doz hesaplamaları hasta güvenliği için devre dışı bırakıldı.
            </p>
          </div>
        ) : (
          renderProtocolDoses()
        )}
      </div>
    </section>
  );
};
