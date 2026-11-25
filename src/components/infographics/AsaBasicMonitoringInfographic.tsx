import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Bell,
  BookOpen,
  CheckCircle2,
  Clock,
  HeartPulse,
  Info,
  ShieldCheck,
  Thermometer,
  UserCheck,
  Volume2,
  Wind
} from 'lucide-react';

interface AsaBasicMonitoringInfographicProps {
  isDark: boolean;
}

type AnesthesiaModeId = 'general' | 'sedation' | 'regional';
type PillarId = 'oxygenation' | 'ventilation' | 'circulation' | 'temperature';

interface ModeRequirement {
  pillar: PillarId;
  title: string;
  requirementLabel: string;
  requirementLevel: 'mandatory' | 'conditional' | 'clinical';
  summary: string;
  keyPoints: string[];
  alarmNote: string;
}

interface AnesthesiaModeSpec {
  id: AnesthesiaModeId;
  shortLabel: string;
  title: string;
  subtitle: string;
  monitorSummary: string;
  etco2Active: boolean;
  etco2Label: string;
  etco2Sub: string;
  fio2Required: boolean;
  disconnectAlarmRequired: boolean;
  adjunctCircRequired: boolean;
  requirements: Record<PillarId, ModeRequirement>;
}

const ANESTHESIA_MODES: Record<AnesthesiaModeId, AnesthesiaModeSpec> = {
  general: {
    id: 'general',
    shortLabel: 'Genel Anestezi',
    title: 'Genel Anestezi (ETT / SGA + Mekanik Ventilasyon)',
    subtitle: 'Tüm Standart I ve Standart II monitörleri ile sesli güvenlik alarmları eksiksiz zorunludur.',
    monitorSummary: 'Kesintisiz EKG + Devamlı SpO₂ & FiO₂ Analizörü + Kantitatif EtCO₂ + Disconnect Alarmı + NIBP (≤5 dk) + Ek Dolaşım + Sıcaklık',
    etco2Active: true,
    etco2Label: '36 mmHg · RR 12',
    etco2Sub: 'Zorunlu: ETT/SGA teyidi + devamlı kantitatif EtCO₂',
    fio2Required: true,
    disconnectAlarmRequired: true,
    adjunctCircRequired: true,
    requirements: {
      oxygenation: {
        pillar: 'oxygenation',
        title: 'Oksijenasyon',
        requirementLabel: 'Zorunlu (FiO₂ + SpO₂)',
        requirementLevel: 'mandatory',
        summary: 'Solunum sisteminde düşük O₂ limit alarmlı oksijen analizörü VE devamlı (continually) kantitatif pulse oksimetri zorunludur.',
        keyPoints: [
          'İnspire gaz O₂ konsantrasyonu düşük limit alarmlı O₂ analizörü ile ölçülmelidir.',
          'Pulse oksimetri (SpO₂) değişken tonlu (variable-pitch) nabız sesi ve düşük eşik sesli alarmı ile devamlı (continually) değerlendirilmelidir.',
          'Hastanın rengini gözlemlemek için yeterli ortam aydınlatması ve görsel erişim sağlanmalıdır.'
        ],
        alarmNote: 'Düşük FiO₂ alarmı ve değişken tonlu SpO₂ sesli uyarısı aktif olmalıdır.'
      },
      ventilation: {
        pillar: 'ventilation',
        title: 'Ventilasyon',
        requirementLabel: 'Zorunlu (Kantitatif EtCO₂ + Disconnect)',
        requirementLevel: 'mandatory',
        summary: 'Klinik gözlem, devamlı (continually) kantitatif kapnografi (EtCO₂) ve mekanik ventilatörde devre ayrılma alarmı zorunludur.',
        keyPoints: [
          'ETT veya supraglottik havayolu (SGA/LMA) yerleştirildiğinde klinik bulgular VE kantitatif ekshale CO₂ (EtCO₂) analizi ile doğrulanmalıdır.',
          'Anestezi süresince devamlı (continually) kantitatif EtCO₂ izlemi ve göğüs hareketi / balon / oskültasyon takibi yapılmalıdır.',
          'Mekanik ventilatörde sesli devre ayrılma (disconnect) alarmı zorunludur; ekspiryum volümünün kantitatif izlemi güçlü şekilde önerilir.'
        ],
        alarmNote: 'Ventilatör devre ayrılma (disconnect) ve apne/EtCO₂ alarmları açık kalmalıdır.'
      },
      circulation: {
        pillar: 'circulation',
        title: 'Dolaşım',
        requirementLabel: 'Zorunlu (Kesintisiz EKG + ≤5 dk NIBP + Ek)',
        requirementLevel: 'mandatory',
        summary: 'Kesintisiz (continuously) EKG, en az 5 dakikada bir NIBP/KH (continually) ve en az bir ek dolaşım doğrulama yöntemi zorunludur.',
        keyPoints: [
          'EKG indüksiyon başlangıcından anestezi alanından ayrılma hazırlığına kadar kesintisiz (continuously) görüntülenmelidir.',
          'Arteriyel kan basıncı ve kalp hızı en az her 5 dakikada bir (continually) ölçülüp kaydedilmelidir.',
          'Genel anestezide ek olarak en az biri zorunludur: nabız palpasyonu, kalp sesi oskültasyonu, intra-arteriyel trase, USG nabız veya pulse pletismografi/oksimetri.'
        ],
        alarmNote: 'EKG ritim/bradikardi-taşikardi ve NIBP limit alarmları vaka öncesi kontrol edilmelidir.'
      },
      temperature: {
        pillar: 'temperature',
        title: 'Vücut Sıcaklığı',
        requirementLabel: 'Koşullu Zorunlu',
        requirementLevel: 'conditional',
        summary: 'Sıcaklıkta klinik olarak anlamlı değişiklik amaçlandığında, beklendiğinde veya şüphelendiğinde devamlı (continually) izlenmelidir.',
        keyPoints: [
          '30 dakikayı aşan genel anesteziler, geniş kavite cerrahisi, pediatrik/geriatrik hastalar ve aktif ısıtma/soğutma durumlarında mutlaka izlenir.',
          'Hızlı termal değişimlerde en hızlı çekirdek (kor) ısı bölgeleri pulmoner arter, distal özofagus, nazofarenks ve temaslı timpanik membrandır; mesane ve rektal problar hızlı değişimlere gecikmeli (lag) yanıt verir.',
          'Ölçüm aracı anestezi ortamında derhal erişilebilir durumda bulundurulmalıdır.'
        ],
        alarmNote: 'KRİTİK MH UYARISI: Hipertermi, Malign Hiperterminin GEÇ bulgusudur — asla ateş yükselmesini bekleme! Erken bulgular: açıklanamayan EtCO₂ artışı, taşikardi ve masseter/jeneralize rijidite.'
      }
    }
  },
  sedation: {
    id: 'sedation',
    shortLabel: 'Orta / Derin Sedasyon · MAC',
    title: 'Orta / Derin Sedasyon & Monitörize Anestezi Bakımı (MAC)',
    subtitle: 'MAC bir sedasyon derinliği değil, anestezi hizmet/sunum tipidir (sedasyonsuz, minimal, orta veya derin olabilir). ASA, ekshale CO₂ izlemini özellikle ORTA ve DERİN sedasyonda zorunlu kılar (minimal sedasyonda değil).',
    monitorSummary: 'Kesintisiz EKG + Devamlı SpO₂ + Ekshale CO₂ Tespiti (Orta/Derin Sedasyonda) + NIBP (≤5 dk) + Klinik Gözlem + Gerekirse Sıcaklık',
    etco2Active: true,
    etco2Label: '38 mmHg · RR 14',
    etco2Sub: 'Zorunlu: Yalnızca orta ve derin sedasyonda ekshale CO₂ tespiti',
    fio2Required: false,
    disconnectAlarmRequired: false,
    adjunctCircRequired: false,
    requirements: {
      oxygenation: {
        pillar: 'oxygenation',
        title: 'Oksijenasyon',
        requirementLabel: 'Zorunlu (SpO₂ + Sesli Ton)',
        requirementLevel: 'mandatory',
        summary: 'Devamlı (continually) kantitatif pulse oksimetri (değişken nabız tonu + düşük alarm) ve oksijen kaynağının teyidi zorunludur.',
        keyPoints: [
          'Tüm MAC ve sedasyon vakalarında SpO₂ devamlı (continually) izlenmeli, değişken pitch nabız tonu ve düşük eşik alarmı duyulabilir olmalıdır.',
          'Genel anestezi devresi kullanılmıyorsa inspire O₂ analizörü gerekmez; ancak destek O₂ akışı ve hastanın rengi gözlemlenmelidir.',
          'Ek O₂ verilmesi desatürasyonu geciktirebilir; hipoventilasyonu maskelememesi için orta/derin sedasyonda ekshale CO₂ izlemi ile birlikte değerlendirilmelidir.'
        ],
        alarmNote: 'Ek oksijen altında SpO₂ geç düşer; solunum depresyonunun erken uyarısı ekshale CO₂ izlemidir.'
      },
      ventilation: {
        pillar: 'ventilation',
        title: 'Ventilasyon',
        requirementLabel: 'Zorunlu (Orta/Derin: Ekshale CO₂)',
        requirementLevel: 'mandatory',
        summary: 'Orta ve derin sedasyonda klinik gözleme ek olarak devamlı (continually) ekshale CO₂ tespiti zorunludur; minimal sedasyonda (anksiyolizde) zorunlu değildir.',
        keyPoints: [
          'MAC bir sedasyon derinliği değil, anestezi hizmet tipidir; ancak MAC altında orta veya derin sedasyon uygulandığında (hasta/işlem/ekipman engellemedikçe) nazal kanül veya maske ile devamlı ekshale CO₂ tespiti zorunludur.',
          'ETT/SGA’daki kantitatif EtCO₂ analizinden farklı olarak orta/derin sedasyonda ASA temel şartı ekshale CO₂ varlığının devamlı tespitidir (kapnografi tercih edilir).',
          'Göğüs duvarı hareketi ve solunum paterni devamlı gözlemlenmeli; derin sedasyon hızla genel anesteziye kayabileceğinden havayolu ve pozitif basınçlı ventilasyon donanımı hazır olmalıdır.'
        ],
        alarmNote: 'Kapnogramın düzleşmesi (apne) SpO₂ düşüşünden 30–60 saniye önce hipoventilasyonu yakalar.'
      },
      circulation: {
        pillar: 'circulation',
        title: 'Dolaşım',
        requirementLabel: 'Zorunlu (Kesintisiz EKG + ≤5 dk NIBP)',
        requirementLevel: 'mandatory',
        summary: 'Kesintisiz (continuously) EKG ve en az 5 dakikada bir (continually) arteriyel kan basıncı ile kalp hızı değerlendirmesi zorunludur.',
        keyPoints: [
          'İşlem başlangıcından derlenme/çıkış hazırlığına kadar kesintisiz (continuously) EKG izlemi sürdürülmelidir.',
          'NIBP ve kalp hızı en az her 5 dakikada bir ölçülüp anestezi kaydına işlenmelidir.',
          'Propofol/opioid/deksmedetomidin kombinasyonlarında hipotansiyon ve bradikardi yakından takip edilmelidir.'
        ],
        alarmNote: 'NIBP otomatik döngüsü en fazla 5 dakika aralığa ayarlanmalıdır.'
      },
      temperature: {
        pillar: 'temperature',
        title: 'Vücut Sıcaklığı',
        requirementLabel: 'Koşullu Zorunlu',
        requirementLevel: 'conditional',
        summary: 'Klinik olarak anlamlı sıcaklık değişimi amaçlandığında, beklendiğinde veya şüphelendiğinde devamlı (continually) izlenmelidir.',
        keyPoints: [
          'Kısa, normotermik tanısal sedasyonlarda rutin sürekli prob gerekmeyebilir.',
          'Uzun süreli girişimler, geniş cilt maruziyeti, pediatrik/geriatrik olgular veya titreme/ateş şüphesinde mutlaka ölçülmelidir.'
        ],
        alarmNote: 'Hipotermi sedasyon ajanlarının klirensini yavaşlatır ve derlenmeyi uzatır.'
      }
    }
  },
  regional: {
    id: 'regional',
    shortLabel: 'Rejyonel (Sedasyonsuz)',
    title: 'Rejyonel / Lokal Anestezi (Orta/Derin Sedasyon Yok)',
    subtitle: 'Nitelikli personel ve kesintisiz EKG ile devamlı SpO₂ ve ≤5 dk NIBP zorunludur; orta veya derin sedasyon eklendiği an ekshale CO₂ izlemi zorunlu hâle gelir.',
    monitorSummary: 'Kesintisiz EKG + Devamlı SpO₂ + NIBP (≤5 dk) + Devamlı Klinik Solunum Gözlemi + Gerekirse Sıcaklık',
    etco2Active: false,
    etco2Label: 'Klinik Gözlem (Orta/Derin Sedasyon Yok)',
    etco2Sub: 'Orta/derin sedasyon eklenirse ekshale CO₂ anında ZORUNLU olur',
    fio2Required: false,
    disconnectAlarmRequired: false,
    adjunctCircRequired: false,
    requirements: {
      oxygenation: {
        pillar: 'oxygenation',
        title: 'Oksijenasyon',
        requirementLabel: 'Zorunlu (SpO₂ + Sesli Ton)',
        requirementLevel: 'mandatory',
        summary: 'Sedasyonsuz tüm rejyonel/nöraksiyel bloklarda devamlı (continually) kantitatif pulse oksimetri ve sesli alarm zorunludur.',
        keyPoints: [
          'SpO₂ devamlı (continually) izlenmeli; değişken tonlu nabız sesi ve düşük eşik sesli alarmı aktif tutulmalıdır.',
          'Yüksek spinal/epidural blok veya lokal anestezik sistemik toksisitesi (LAST) durumunda derhal O₂ desteği hazır bulunmalıdır.',
          'Hastanın rengi ve bilinç/sözel yanıtı düzenli gözlemlenmelidir.'
        ],
        alarmNote: 'Yüksek blok düzeyinde solunum mekaniği etkilenebilir; SpO₂ ses tonu açık olmalıdır.'
      },
      ventilation: {
        pillar: 'ventilation',
        title: 'Ventilasyon',
        requirementLabel: 'Klinik Gözlem (Orta/Derin Sedasyonda CO₂)',
        requirementLevel: 'clinical',
        summary: 'Orta veya derin sedasyon uygulanmıyorsa kalitatif klinik bulguların devamlı (continually) gözlemi zorunludur; orta/derin sedasyona geçilirse ekshale CO₂ zorunludur.',
        keyPoints: [
          'Göğüs duvarı hareketi, solunum sayısı/derinliği ve hasta ile sözel iletişim devamlı değerlendirilir.',
          'İntraoperatif dönemde orta veya derin sedasyon eklenirse ekshale CO₂ tespiti derhal devreye alınmalıdır (minimal anksiyolizde zorunlu değildir).',
          'Yüksek torakal blokta interkostal/frenik etkilenmeye bağlı dispne ve hipoventilasyon açısından uyanık olunmalıdır.'
        ],
        alarmNote: 'Orta veya derin sedasyon verildiği an protokol otomatik olarak ekshale CO₂ zorunluluğuna yükselir.'
      },
      circulation: {
        pillar: 'circulation',
        title: 'Dolaşım',
        requirementLabel: 'Zorunlu (Kesintisiz EKG + ≤5 dk NIBP)',
        requirementLevel: 'mandatory',
        summary: 'Kesintisiz (continuously) EKG ve en az 5 dakikada bir NIBP/kalp hızı ölçümü zorunludur (spinal başlangıcında 1–3 dk sık ölçüm önerilir).',
        keyPoints: [
          'EKG tüm rejyonel anestezi boyunca kesintisiz (continuously) görüntülenir (özellikle sempatik blokta bradikardi / Bezold-Jarisch ve LAST aritmileri için).',
          'ASA alt sınırı en az her 5 dakikada bir (continually) NIBP ve kalp hızıdır; nöraksiyel blok sonrası ilk 15–20 dakikada 1–3 dk aralıkla ölçüm klinik güvenlik sağlar.'
        ],
        alarmNote: 'Spinal/epidural sempatik blokta ani hipotansiyon ve bradikardi hızla tanınmalıdır.'
      },
      temperature: {
        pillar: 'temperature',
        title: 'Vücut Sıcaklığı',
        requirementLabel: 'Koşullu Zorunlu',
        requirementLevel: 'conditional',
        summary: 'Klinik olarak anlamlı sıcaklık değişimi beklendiğinde/şüphelendiğinde devamlı izlenmelidir (nöraksiyel blok vazodilatasyonla ısı kaybını artırır).',
        keyPoints: [
          'Nöraksiyel bloklarda alt ekstremite vazodilatasyonu ve santral termoregülasyon eşiğinin düşmesi nedeniyle fark edilmeyen hipotermi gelişebilir.',
          'Uzun süreli nöraksiyel vakalarda ve yaşlı/obstetrik/pediatrik hastalarda aktif sıcaklık izlemi ve ısıtma önerilir.'
        ],
        alarmNote: 'Rejyonel blokta hasta üşüdüğünü hissetmeyebilir; çekirdek ısı objektif izlenmelidir.'
      }
    }
  }
};

const STANDARD_II_PILLARS: {
  id: PillarId;
  index: string;
  title: string;
  enTitle: string;
  objective: string;
  timingLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  accentText: string;
  accentBgDark: string;
  accentBgLight: string;
  methods: { label: string; detail: string }[];
  pearl: string;
}[] = [
  {
    id: 'oxygenation',
    index: '01',
    title: 'Oksijenasyon',
    enTitle: 'Oxygenation',
    objective: 'İnspire edilen gazda ve kanda yeterli oksijen konsantrasyonunu devamlı (continually) güvence altına almak.',
    timingLabel: 'Devamlı (Continually)',
    icon: Wind,
    accentText: 'text-sky-600 dark:text-sky-400',
    accentBgDark: 'bg-sky-500/15 border-sky-500/25',
    accentBgLight: 'bg-sky-50 border-sky-200',
    methods: [
      {
        label: 'İnspire Gaz (Genel Anestezi)',
        detail: 'Anestezi makinesi solunum sisteminde düşük oksijen konsantrasyon limit alarmlı O₂ analizörü zorunludur.'
      },
      {
        label: 'Kan Oksijenasyonu (Tüm Anesteziler)',
        detail: 'Kantitatif pulse oksimetri (SpO₂) zorunludur; değişken tonlu (variable-pitch) nabız sesi ve düşük eşik alarmı duyulabilir olmalıdır.'
      },
      {
        label: 'Klinik Gözlem',
        detail: 'Hastanın renginin değerlendirilebilmesi için yeterli ortam aydınlatması ve hastaya görsel erişim sağlanmalıdır.'
      }
    ],
    pearl: 'SpO₂ hipoksemiyi yakalar ancak hiperkarbiyi veya apne başlangıcını gecikmeli gösterir; ek O₂ alan hastada ventilasyonun erken göstergesi EtCO₂’dir.'
  },
  {
    id: 'ventilation',
    index: '02',
    title: 'Ventilasyon',
    enTitle: 'Ventilation',
    objective: 'Tüm anesteziler süresince solunumun yeterliliğini devamlı (continually) doğrulamak.',
    timingLabel: 'Devamlı (Continually) + CO₂',
    icon: Activity,
    accentText: 'text-amber-600 dark:text-amber-400',
    accentBgDark: 'bg-amber-500/15 border-amber-500/25',
    accentBgLight: 'bg-amber-50 border-amber-200',
    methods: [
      {
        label: 'Klinik Bulgular (Tüm Anesteziler)',
        detail: 'Göğüs duvarı hareketi, rezervuar balon izlemi ve solunum seslerinin oskültasyonu devamlı (continually) değerlendirilir.'
      },
      {
        label: 'Kantitatif EtCO₂ (ETT/SGA) vs Ekshale CO₂ Tespiti (Orta/Derin Sedasyon)',
        detail: 'ETT veya SGA yerleştirildiğinde klinik bulgulara ek olarak devamlı kantitatif EtCO₂ analizi (kapnografi) zorunludur. Orta ve derin sedasyonda (minimal sedasyonda değil) devamlı ekshale CO₂ tespiti zorunludur.'
      },
      {
        label: 'Ayrılma Alarmı & Ekspiryum Volümü',
        detail: 'Mekanik ventilatörde sesli devre ayrılma (disconnect) alarmı zorunludur; ekspiryum gaz hacminin kantitatif izlemi güçlü şekilde önerilir.'
      }
    ],
    pearl: 'Özofageal entübasyonda 1–2 küçük dalga sonrası EtCO₂ hızla sıfırlanır; kalıcı kare dalga kantitatif kapnografi doğru trakeal/havayolu yerleşiminin altın standardıdır.'
  },
  {
    id: 'circulation',
    index: '03',
    title: 'Dolaşım',
    enTitle: 'Circulation',
    objective: 'Tüm anesteziler boyunca dolaşım fonksiyonunun yeterliliğini doğrulamak (EKG kesintisiz; NIBP/KH düzenli aralıklarla).',
    timingLabel: 'Kesintisiz EKG · ≤5 dk NIBP',
    icon: HeartPulse,
    accentText: 'text-emerald-600 dark:text-emerald-400',
    accentBgDark: 'bg-emerald-500/15 border-emerald-500/25',
    accentBgLight: 'bg-emerald-50 border-emerald-200',
    methods: [
      {
        label: 'Kesintisiz EKG (Continuously)',
        detail: 'ASA Standart II’de özellikle EKG trasesinin anestezi başlangıcından anestezi alanından ayrılma hazırlığına kadar kesintisiz (continuously) görüntülenmesi zorunludur.'
      },
      {
        label: 'Arteriyel Basınç & Kalp Hızı (Continually)',
        detail: 'Her hastada arteriyel kan basıncı ve kalp hızı en az her 5 dakikada bir (continually) ölçülüp değerlendirilmelidir.'
      },
      {
        label: 'Ek Dolaşım Değerlendirmesi (Genel Anestezi)',
        detail: 'Genel anestezide ek olarak en az biri zorunludur: nabız palpasyonu, kalp sesi oskültasyonu, intra-arteriyel basınç trasesi, USG nabız veya pulse pletismografi/oksimetri.'
      }
    ],
    pearl: 'Nabızsız elektriksel aktivite (PEA) durumunda EKG normal görünebilir; bu nedenle ASA genel anestezide elektriksel ritme ek mekanik dolaşım kanıtı şart koşar.'
  },
  {
    id: 'temperature',
    index: '04',
    title: 'Vücut Sıcaklığı',
    enTitle: 'Body Temperature',
    objective: 'Uygun vücut sıcaklığının korunmasına yardımcı olmak, hipotermiyi önlemek ve sıcaklık değişimlerini devamlı (continually) saptamak.',
    timingLabel: 'Devamlı (Koşullu Zorunlu)',
    icon: Thermometer,
    accentText: 'text-rose-600 dark:text-rose-400',
    accentBgDark: 'bg-rose-500/15 border-rose-500/25',
    accentBgLight: 'bg-rose-50 border-rose-200',
    methods: [
      {
        label: 'Zorunluluk Koşulu',
        detail: 'Vücut sıcaklığında klinik olarak anlamlı değişiklik amaçlandığında, beklendiğinde veya şüphelendiğinde sıcaklık devamlı (continually) izlenmelidir.'
      },
      {
        label: 'Çekirdek Ölçüm Bölgeleri & Gecikme (Lag) Uyarısı',
        detail: 'Hızlı termal değişimlerde en hızlı kor ısı bölgeleri pulmoner arter, distal özofagus, nazofarenks ve temaslı timpanik membrandır. Mesane ve rektal problar hızlı ısı değişimlerine gecikmeli (lag) yanıt verir.'
      },
      {
        label: 'Malign Hipertermi (MH) — Hipertermi GEÇ Bulgudur!',
        detail: 'İstenmeyen hipotermi (< 36.0 °C) koagülopati ve enfeksiyonu artırır. Malign Hipertermide ise ateş yükselmesi GEÇ bir bulgudur — asla hipertermiyi bekleme! Erken uyarı bulguları: açıklanamayan EtCO₂ artışı, taşikardi ve masseter/jeneralize rijiditedir.'
      }
    ],
    pearl: 'Genel anestezi indüksiyonunun ilk 1 saatinde vazodilatasyona bağlı santral-periferik redistribüsyonla çekirdek sıcaklık 0.5–1.5 °C düşebilir; MH şüphesinde ise EtCO₂ yükselişi ateşten çok önce ortaya çıkar.'
  }
];

const MATRIX_ROWS: {
  param: string;
  general: string;
  sedation: string;
  regional: string;
}[] = [
  {
    param: 'Standart I: Nitelikli Anestezi Personeli',
    general: 'Zorunlu (Kesintisiz)',
    sedation: 'Zorunlu (Kesintisiz)',
    regional: 'Zorunlu (Kesintisiz)'
  },
  {
    param: 'İnspire O₂ Analizörü (Düşük O₂ Alarmlı)',
    general: 'Zorunlu',
    sedation: 'O₂ Kaynağı Teyidi',
    regional: 'O₂ Hazır Bulundurulur'
  },
  {
    param: 'Pulse Oksimetri (SpO₂ + Değişken Ton + Alarm)',
    general: 'Zorunlu (Devamlı)',
    sedation: 'Zorunlu (Devamlı)',
    regional: 'Zorunlu (Devamlı)'
  },
  {
    param: 'Kalitatif Ventilasyon Gözlemi (Göğüs / Balon / Ses)',
    general: 'Zorunlu (Devamlı)',
    sedation: 'Zorunlu (Devamlı)',
    regional: 'Zorunlu (Devamlı)'
  },
  {
    param: 'Ekshale CO₂ / Kapnografi (EtCO₂)',
    general: 'Zorunlu (Kantitatif ETT/SGA)',
    sedation: 'Zorunlu (Orta/Derin; Minimalde değil)',
    regional: 'Orta/Derin Sedasyonda Zorunlu'
  },
  {
    param: 'Ventilatör Devre Ayrılma (Disconnect) Sesli Alarmı',
    general: 'Zorunlu (Mekanik Vent.)',
    sedation: 'Uygulanmaz (Spontan)',
    regional: 'Uygulanmaz (Spontan)'
  },
  {
    param: 'Elektrokardiyografi (EKG)',
    general: 'Zorunlu (Kesintisiz)',
    sedation: 'Zorunlu (Kesintisiz)',
    regional: 'Zorunlu (Kesintisiz)'
  },
  {
    param: 'Arteriyel Kan Basıncı (NIBP) & Kalp Hızı',
    general: 'Zorunlu (≤ 5 dk · Devamlı)',
    sedation: 'Zorunlu (≤ 5 dk · Devamlı)',
    regional: 'Zorunlu (≤ 5 dk · Devamlı)'
  },
  {
    param: 'Ek Dolaşım Doğrulaması (Palpasyon / Pletismografi vb.)',
    general: 'Zorunlu (≥ 1 Yöntem)',
    sedation: 'Klinik Önerilir',
    regional: 'Klinik Önerilir'
  },
  {
    param: 'Vücut Sıcaklığı İzlemi',
    general: 'Koşullu Zorunlu*',
    sedation: 'Koşullu Zorunlu*',
    regional: 'Koşullu Zorunlu*'
  }
];

export const AsaBasicMonitoringInfographic: React.FC<AsaBasicMonitoringInfographicProps> = ({ isDark }) => {
  const [selectedMode, setSelectedMode] = useState<AnesthesiaModeId>('general');
  const [selectedPillar, setSelectedPillar] = useState<PillarId>('oxygenation');

  const modeSpec = ANESTHESIA_MODES[selectedMode];
  const activeReq = modeSpec.requirements[selectedPillar];

  const surfaceCard = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900 shadow-2xs';

  const subtlePanel = isDark
    ? 'bg-slate-950/70 border-slate-800 text-slate-200'
    : 'bg-slate-50 border-slate-200 text-slate-800';

  const getLevelStyle = (level: ModeRequirement['requirementLevel']) => {
    if (level === 'mandatory') {
      return isDark
        ? 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30'
        : 'text-emerald-800 bg-emerald-50 border-emerald-200';
    }
    if (level === 'conditional') {
      return isDark
        ? 'text-amber-300 bg-amber-500/15 border-amber-500/30'
        : 'text-amber-800 bg-amber-50 border-amber-200';
    }
    return isDark
      ? 'text-sky-300 bg-sky-500/15 border-sky-500/30'
      : 'text-sky-800 bg-sky-50 border-sky-200';
  };

  return (
    <div className="space-y-6">
      {/* 1. Üst Başlık & Temel Çerçeve */}
      <div className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${surfaceCard}`}>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className={`flex flex-wrap items-center gap-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span className={`font-semibold ${isDark ? 'text-teal-400' : 'text-teal-700'}`}>
                ASA Temel Monitörizasyon Standartları
              </span>
              <span aria-hidden="true">·</span>
              <span>Onay: 1986 · Son Revizyon: 2015 · Teyit (Reaffirmation): 13 Aralık 2020 · ASA NMB 2023</span>
              <span aria-hidden="true">·</span>
              <span>Miller’s &amp; Morgan &amp; Mikhail</span>
            </div>

            <h2
              className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}
              style={{ textWrap: 'balance' }}
            >
              ASA Temel Anestezi Monitörizasyon Standartları
            </h2>

            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Tüm <strong>genel anestezi</strong>, <strong>rejyonel anestezi</strong> ve{' '}
              <strong>monitörize anestezi bakımı (MAC)</strong> uygulamaları için geçerli minimum zorunlu hasta güvenliği standartlarıdır.
              Not: <strong>MAC bir sedasyon derinliği değil, anestezi hizmet/sunum tipidir</strong> (sedasyonsuz, minimal, orta veya derin sedasyon içerebilir); ASA ekshale CO₂ zorunluluğunu özellikle <strong>orta ve derin sedasyonda</strong> şart koşar.
            </p>
          </div>

          <div className={`rounded-xl border px-4 py-3 text-xs shrink-0 space-y-1.5 ${subtlePanel}`}>
            <div className="font-semibold flex items-center gap-1.5 text-teal-600 dark:text-teal-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>İki Ana Standart Yapısı</span>
            </div>
            <div className={`font-mono tabular-nums text-[11px] space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <div>Standart I: Nitelikli Anestezi Personeli</div>
              <div>Standart II: O₂ · Ventilasyon · Dolaşım · Isı</div>
            </div>
          </div>
        </div>

        {/* Sınav & Klinik Terminoloji Ayrımı: Continuously vs Continually */}
        <div className={`pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className={`rounded-xl border p-3.5 space-y-1 ${subtlePanel}`}>
            <div className="flex items-center justify-between gap-2">
              <span className={`text-xs font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                Kesintisiz — Continuously
              </span>
              <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Kesintisiz Akış
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <strong>“Herhangi bir kesinti olmaksızın uzun süreli devam eden”</strong> anlamına gelir.
              ASA metninde özellikle <em>Standart I (nitelikli personelin odada varlığı)</em> ve Standart II içinde <em>EKG trasesinin görüntülenmesi</em> için kullanılır.
            </p>
          </div>

          <div className={`rounded-xl border p-3.5 space-y-1 ${subtlePanel}`}>
            <div className="flex items-center justify-between gap-2">
              <span className={`text-xs font-bold ${isDark ? 'text-sky-400' : 'text-sky-700'}`}>
                Devamlı / Düzenli Yinelenen — Continually
              </span>
              <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Düzenli Sık Aralık
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <strong>“Düzenli, sık ve istikrarlı bir ardışıklıkla tekrarlanan”</strong> anlamına gelir.
              ASA Standart II’de <em>Oksijenasyon (SpO₂/FiO₂)</em>, <em>Ventilasyon (EtCO₂/klinik gözlem)</em>, <em>Dolaşım (≤5 dk NIBP &amp; KH)</em> ve <em>Vücut Sıcaklığı</em> değerlendirmeleri için kullanılan resmi ifadedir.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Standart I: Nitelikli Anestezi Personeli */}
      <div className={`rounded-2xl border p-5 space-y-3 ${surfaceCard}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${isDark ? 'bg-teal-500/15 border-teal-500/30 text-teal-400' : 'bg-teal-50 border-teal-200 text-teal-700'}`}>
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-[11px] font-mono ${isDark ? 'text-teal-400' : 'text-teal-700'}`}>
                Standart I · Birincil Güvenlik Şartı
              </div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Nitelikli Anestezi Personelinin Sürekli Varlığı
              </h3>
            </div>
          </div>
          <span className={`text-xs font-semibold font-mono ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
            Kesintisiz (Continuous) · Tüm Anesteziler
          </span>
        </div>

        <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Anestezi sırasında hasta durumu saniyeler içinde değişebileceğinden, tüm genel anestezi, rejyonel anestezi ve MAC uygulamaları boyunca{' '}
          <strong>nitelikli anestezi personeli</strong> odada <strong>sürekli (continuously)</strong> bulunmalıdır.
          Hiçbir elektronik monitör, anesteziyoloğun klinik uyanıklığının yerini tutamaz.
        </p>

        <div className={`rounded-xl border p-3.5 text-xs leading-relaxed flex items-start gap-2.5 ${subtlePanel}`}>
          <Info className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
          <div className={isDark ? 'text-slate-300' : 'text-slate-600'}>
            <strong className={isDark ? 'text-white' : 'text-slate-900'}>ASA İstisna Notu:</strong>{' '}
            Personel için doğrudan ve bilinen bir tehlike (ör. floroskopi/radyasyon) bulunduğunda uzaktan güvenli monitörizasyon sağlanmalıdır.
            Öngörülemeyen bir acil durum geçici ayrılmayı zorunlu kılarsa, anesteziyolog klinik yargıyla en uygun önlemi almalı ve hastanın bakımını devralacak uygun geçici nitelikli personel düzenlemelidir.
          </div>
        </div>
      </div>

      {/* 3. İnteraktif İki Bölgeli Sahne: Anestezi Tipine Göre Canlı Monitör & Standart II Kontrolü */}
      <div className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${surfaceCard}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className={`text-[11px] font-mono ${isDark ? 'text-teal-400' : 'text-teal-700'}`}>
              İnteraktif Standart II Simülatörü
            </div>
            <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Anestezi Tipine Göre Zorunlu Monitör Ekranı
            </h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Anestezi tekniğini seçin ve monitör üzerindeki parametrelere tıklayarak ASA zorunluluklarını inceleyin.
            </p>
          </div>

          {/* Segmented Mode Selector */}
          <div
            className={`inline-flex flex-wrap items-center gap-1 p-1 rounded-xl border ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
            role="tablist"
            aria-label="Anestezi tipi seçimi"
          >
            {(Object.keys(ANESTHESIA_MODES) as AnesthesiaModeId[]).map((modeId) => {
              const active = selectedMode === modeId;
              return (
                <button
                  key={modeId}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedMode(modeId)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? isDark
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'bg-white text-slate-900 shadow-xs'
                      : isDark
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {ANESTHESIA_MODES[modeId].shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Zone Layout: Left Realistic Multiparameter Monitor (60%), Right Contextual Rule Deck (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Zone: Multiparameter Clinical Monitor Display */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 p-4 sm:p-5 flex flex-col justify-between space-y-4">
            {/* Monitor Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs">
              <div className="font-semibold text-slate-200">{modeSpec.title}</div>
              <div className="flex items-center gap-3 font-mono tabular-nums text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>SpO₂ Ses Tonu: Açık</span>
                </span>
                <span className="inline-flex items-center gap-1 text-amber-300">
                  <Bell className="w-3.5 h-3.5" />
                  <span>Alarmlar: Aktif</span>
                </span>
              </div>
            </div>

            {/* Interactive Monitor Channels */}
            <div className="space-y-2.5">
              {/* Channel 1: ECG (Circulation) */}
              <button
                type="button"
                onClick={() => setSelectedPillar('circulation')}
                className={`w-full text-left rounded-xl border p-3 transition-colors cursor-pointer ${
                  selectedPillar === 'circulation'
                    ? 'bg-slate-900 border-emerald-500/60 ring-1 ring-emerald-500/30'
                    : 'bg-slate-900/60 border-slate-800/90 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className="text-emerald-400 font-bold">II · EKG (Kesintisiz — Continuously)</span>
                      <span className="text-slate-400">NIBP ≤ 5 dk (Continually) · {modeSpec.adjunctCircRequired ? '+ Ek Dolaşım Zorunlu' : 'Standart II'}</span>
                    </div>
                    <svg viewBox="0 0 360 44" className="w-full h-10" aria-label="EKG Lead II dalga formu">
                      <path
                        d="M0 28 L24 28 L30 24 L35 28 L44 28 L47 32 L52 6 L57 38 L61 28 L72 28 L80 21 L88 28 L120 28 L126 24 L131 28 L140 28 L143 32 L148 6 L153 38 L157 28 L168 28 L176 21 L184 28 L216 28 L222 24 L227 28 L236 28 L239 32 L244 6 L249 38 L253 28 L264 28 L272 21 L280 28 L312 28 L318 24 L323 28 L332 28 L335 32 L340 6 L345 38 L349 28 L360 28"
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-right font-mono tabular-nums shrink-0 pl-2">
                    <div className="text-2xl font-bold text-emerald-400 leading-none">72</div>
                    <div className="text-[10px] text-slate-400 mt-1">atım/dk</div>
                  </div>
                </div>
              </button>

              {/* Channel 2: SpO2 Plethysmograph (Oxygenation) */}
              <button
                type="button"
                onClick={() => setSelectedPillar('oxygenation')}
                className={`w-full text-left rounded-xl border p-3 transition-colors cursor-pointer ${
                  selectedPillar === 'oxygenation'
                    ? 'bg-slate-900 border-sky-500/60 ring-1 ring-sky-500/30'
                    : 'bg-slate-900/60 border-slate-800/90 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className="text-sky-400 font-bold">SpO₂ · Pletismografi (Devamlı — Continually)</span>
                      <span className={modeSpec.fio2Required ? 'text-sky-300' : 'text-slate-400'}>
                        {modeSpec.fio2Required ? 'FiO₂ %45 · Düşük O₂ Alarmı AKTİF' : 'O₂ Kaynağı Teyitli'}
                      </span>
                    </div>
                    <svg viewBox="0 0 360 40" className="w-full h-9" aria-label="Pulse oksimetri pletismografi dalga formu">
                      <path
                        d="M0 32 C12 32 18 8 28 8 C36 8 40 22 48 20 C55 18 62 32 90 32 C102 32 108 8 118 8 C126 8 130 22 138 20 C145 18 152 32 180 32 C192 32 198 8 208 8 C216 8 220 22 228 20 C235 18 242 32 270 32 C282 32 288 8 298 8 C306 8 310 22 318 20 C325 18 332 32 360 32"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="text-right font-mono tabular-nums shrink-0 pl-2">
                    <div className="text-2xl font-bold text-sky-400 leading-none">99%</div>
                    <div className="text-[10px] text-slate-400 mt-1">Pitch Tonu</div>
                  </div>
                </div>
              </button>

              {/* Channel 3: EtCO2 Capnogram (Ventilation) */}
              <button
                type="button"
                onClick={() => setSelectedPillar('ventilation')}
                className={`w-full text-left rounded-xl border p-3 transition-colors cursor-pointer ${
                  selectedPillar === 'ventilation'
                    ? 'bg-slate-900 border-amber-500/60 ring-1 ring-amber-500/30'
                    : 'bg-slate-900/60 border-slate-800/90 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className={modeSpec.etco2Active ? 'text-amber-400 font-bold' : 'text-slate-400 font-bold'}>
                        {selectedMode === 'general'
                          ? 'EtCO₂ · Kantitatif Kapnografi (Zorunlu)'
                          : selectedMode === 'sedation'
                            ? 'Ekshale CO₂ Tespiti (Orta/Derin Sedasyonda Zorunlu)'
                            : 'Ekshale CO₂ (Orta/Derin Sedasyonda Zorunlu)'}
                      </span>
                      <span className="text-slate-400">
                        {modeSpec.disconnectAlarmRequired ? 'Disconnect Alarmı: AKTİF' : modeSpec.etco2Sub}
                      </span>
                    </div>
                    {modeSpec.etco2Active ? (
                      <svg viewBox="0 0 360 40" className="w-full h-9" aria-label="EtCO2 kapnografi kare dalga formu">
                        <path
                          d="M0 34 L22 34 L30 12 L88 8 L94 34 L142 34 L150 12 L208 8 L214 34 L262 34 L270 12 L328 8 L334 34 L360 34"
                          fill="none"
                          stroke="#fbbf24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <div className="h-9 flex items-center text-xs font-mono text-slate-400 border border-dashed border-slate-800 rounded-lg px-3">
                        Sedasyonsuz (veya minimal sedasyonlu) rejyonel blokta kalitatif gözlem zorunludur; orta/derin sedasyon eklenirse ekshale CO₂ zorunlu olur.
                      </div>
                    )}
                  </div>
                  <div className="text-right font-mono tabular-nums shrink-0 pl-2">
                    <div className={`text-2xl font-bold leading-none ${modeSpec.etco2Active ? 'text-amber-400' : 'text-slate-500'}`}>
                      {modeSpec.etco2Active ? (selectedMode === 'general' ? '36' : '38') : '—'}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {modeSpec.etco2Active ? 'mmHg' : 'Gözlem'}
                    </div>
                  </div>
                </div>
              </button>

              {/* Channel 4: Bottom Numeric Strip — NIBP & Temperature */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedPillar('circulation')}
                  className={`text-left rounded-xl border p-3 transition-colors cursor-pointer ${
                    selectedPillar === 'circulation'
                      ? 'bg-slate-900 border-emerald-500/60'
                      : 'bg-slate-900/60 border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-slate-200 font-bold">NIBP (Devamlı)</span>
                    <span className="inline-flex items-center gap-1 text-emerald-400">
                      <Clock className="w-3 h-3" />
                      ≤ 5 dk
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-baseline justify-between font-mono tabular-nums">
                    <span className="text-xl font-bold text-white">118 / 74</span>
                    <span className="text-xs text-slate-400">MAP 89 mmHg</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPillar('temperature')}
                  className={`text-left rounded-xl border p-3 transition-colors cursor-pointer ${
                    selectedPillar === 'temperature'
                      ? 'bg-slate-900 border-rose-500/60 ring-1 ring-rose-500/30'
                      : 'bg-slate-900/60 border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-rose-400 font-bold">TEMP · Çekirdek</span>
                    <span className="text-amber-300">Koşullu Zorunlu</span>
                  </div>
                  <div className="mt-1.5 flex items-baseline justify-between font-mono tabular-nums">
                    <span className="text-xl font-bold text-rose-300">36.6 °C</span>
                    <span className="text-[11px] text-slate-400">Özofagus / Nazofarenks</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Monitor Footer Summary */}
            <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 leading-relaxed">
              Aktif Profil: <span className="text-slate-200">{modeSpec.monitorSummary}</span>
            </div>
          </div>

          {/* Right Zone: Contextual Rule Inspector */}
          <div className={`lg:col-span-5 rounded-2xl border p-4 sm:p-5 flex flex-col justify-between space-y-4 ${subtlePanel}`}>
            <div className="space-y-4">
              {/* Pillar Quick Switcher */}
              <div className="grid grid-cols-2 gap-1.5">
                {STANDARD_II_PILLARS.map((pillar) => {
                  const Icon = pillar.icon;
                  const active = selectedPillar === pillar.id;
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() => setSelectedPillar(pillar.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                        active
                          ? isDark
                            ? 'bg-slate-800 border-teal-500/60 text-white'
                            : 'bg-white border-teal-500 text-slate-900 shadow-2xs'
                          : isDark
                          ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                          : 'bg-white/60 border-slate-200 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${pillar.accentText}`} />
                      <span className="truncate">{pillar.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Pillar Rule Card */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {activeReq.title} · {modeSpec.shortLabel}
                  </h4>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${getLevelStyle(activeReq.requirementLevel)}`}>
                    {activeReq.requirementLabel}
                  </span>
                </div>

                <p className={`text-xs leading-relaxed font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  {activeReq.summary}
                </p>

                <ul className={`space-y-2 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {activeReq.keyPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className={`rounded-xl border p-3 text-xs leading-relaxed flex items-start gap-2 ${
                isDark
                  ? 'bg-amber-500/10 border-amber-500/25 text-amber-200'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
              <div>
                <strong>Klinik Alarm İpucu:</strong> {activeReq.alarmNote}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Standart II — 4 Temel Parametre Detay Rehberi */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-1">
          <div>
            <div className={`text-[11px] font-mono ${isDark ? 'text-teal-400' : 'text-teal-700'}`}>
              Standart II · Fizyolojik Parametreler
            </div>
            <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Dört Temel Monitörizasyon Alanı: Hedef ve Zorunlu Yöntemler
            </h3>
          </div>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Oksijenasyon · Ventilasyon · Dolaşım · Vücut Sıcaklığı
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STANDARD_II_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 ${surfaceCard}`}
              >
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl border ${isDark ? pillar.accentBgDark : pillar.accentBgLight}`}>
                        <Icon className={`w-5 h-5 ${pillar.accentText}`} />
                      </div>
                      <div>
                        <div className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {pillar.index}. {pillar.enTitle}
                        </div>
                        <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {pillar.title}
                        </h4>
                      </div>
                    </div>
                    <span className={`text-[11px] font-mono tabular-nums font-semibold ${pillar.accentText}`}>
                      {pillar.timingLabel}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    <strong className={isDark ? 'text-white' : 'text-slate-900'}>Amaç:</strong> {pillar.objective}
                  </p>

                  <div className={`space-y-2.5 pt-2 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                    {pillar.methods.map((m, idx) => (
                      <div key={idx} className="text-xs leading-relaxed">
                        <div className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                          {m.label}
                        </div>
                        <div className={isDark ? 'text-slate-400' : 'text-slate-600'}>{m.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`pt-3 border-t text-[11px] leading-relaxed ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-600'}`}>
                  <strong className={pillar.accentText}>Klinik Not:</strong> {pillar.pearl}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Anestezi Tipine Göre Hızlı Karşılaştırma Tablosu */}
      <div className={`rounded-2xl border overflow-hidden ${surfaceCard}`}>
        <div className={`px-5 py-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div>
            <h3 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Anestezi Tekniğine Göre ASA Zorunluluk Matrisi
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Tüm monitör verileri anestezi kayıt formuna düzenli olarak işlenmelidir.
            </p>
          </div>
          <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            *Klinik anlamlı sıcaklık değişimi beklendiğinde / şüphelendiğinde
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={isDark ? 'bg-slate-950/70 text-slate-300 border-b border-slate-800' : 'bg-slate-50 text-slate-700 border-b border-slate-200'}>
                <th className="py-3 px-4 font-semibold">Monitörizasyon Parametresi</th>
                <th className="py-3 px-4 font-semibold">Genel Anestezi</th>
                <th className="py-3 px-4 font-semibold">Orta / Derin Sedasyon · MAC</th>
                <th className="py-3 px-4 font-semibold">Rejyonel (Sedasyonsuz)</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800/80' : 'divide-slate-100'}`}>
              {MATRIX_ROWS.map((row, idx) => (
                <tr key={idx} className={isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50/70'}>
                  <td className={`py-2.5 px-4 font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                    {row.param}
                  </td>
                  <td className={`py-2.5 px-4 font-mono tabular-nums ${isDark ? 'text-emerald-300' : 'text-emerald-800 font-medium'}`}>
                    {row.general}
                  </td>
                  <td className={`py-2.5 px-4 font-mono tabular-nums ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {row.sedation}
                  </td>
                  <td className={`py-2.5 px-4 font-mono tabular-nums ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {row.regional}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Modern Güncel Kılavuz Tamamlayıcıları (ASA 2023 NMB, AAGBI 2021 & Alarm Güvenliği) */}
      <div className={`rounded-2xl border p-5 space-y-4 ${surfaceCard}`}>
        <div className="space-y-1">
          <div className={`text-[11px] font-mono ${isDark ? 'text-teal-400' : 'text-teal-700'}`}>
            ASA Temel Standartlarına Ek Güncel Kılavuzlar &amp; Zorunlu Standartlar
          </div>
          <h3 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Modern Ameliyathane Güvenliğinde Tamamlayıcı &amp; Minimum Standartlar
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
          <div className={`rounded-xl border p-4 space-y-1.5 ${subtlePanel}`}>
            <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Kantitatif Nöromüsküler İzlem (ASA 2023)
            </div>
            <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
              <strong>ASA 2023 NMB Kılavuzu</strong>, NMB uygulanan tüm hastalarda kalitatif değerlendirme veya klinik testler yerine{' '}
              <strong>kantitatif monitörizasyonu</strong> güçlü şekilde önerir. Göz kasları (<em>orbicularis oculi / corrugator supercilii</em>) yerine{' '}
              <strong>adduktor pollisis</strong> tercih edilir; ekstubasyon öncesi <strong>TOF oranı ≥ 0.90</strong> doğrulanmalıdır.
            </p>
          </div>

          <div className={`rounded-xl border p-4 space-y-1.5 ${subtlePanel}`}>
            <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AAGBI 2021 — Minimum Zorunlu Standartlar
            </div>
            <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
              Association of Anaesthetists (<strong>AAGBI 2021</strong>) kılavuzunda volatil anesteziklerde <strong>ekspiratuar ajan analizi</strong>,
              NMB kullanıldığında <strong>kantitatif NMB monitörizasyonu</strong> ve TIVA + NMB uygulamasında <strong>işlenmiş EEG (pEEG: BIS/PSI)</strong>{' '}
              yalnızca önerilen değil, <strong>minimum zorunlu standartlar</strong> olarak tanımlanır.
            </p>
          </div>

          <div className={`rounded-xl border p-4 space-y-1.5 ${subtlePanel}`}>
            <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Vaka Öncesi Kontrol &amp; Alarm Disiplini
            </div>
            <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
              Anestezi cihazı ve monitör alarmları indüksiyondan önce test edilmeli; <strong>SpO₂, FiO₂, EtCO₂ ve disconnect</strong> sesli alarmları
              asla susturulmuş bırakılmamalıdır.
            </p>
          </div>
        </div>
      </div>

      {/* 7. Kaynakça */}
      <div className={`rounded-2xl border p-5 space-y-2.5 text-xs ${subtlePanel}`}>
        <div className={`font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <BookOpen className="w-4 h-4 text-teal-500" />
          <span>Kanıta Dayalı Kaynaklar &amp; Kılavuzlar</span>
        </div>
        <ul className={`space-y-1.5 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          <li>
            1. American Society of Anesthesiologists (ASA). <em>Standards for Basic Anesthetic Monitoring</em>. Approved Oct 21, 1986; moderate/deep sedation capnography amendment effective Jul 1, 2011; last amended Oct 28, 2015; last reaffirmed Dec 13, 2020.
          </li>
          <li>
            2. Thilen SR, Weigel WA, Todd MM, et al. <em>2023 American Society of Anesthesiologists Practice Guidelines for Monitoring and Antagonism of Neuromuscular Blockade</em>. Anesthesiology. 2023;138(1):13–41.
          </li>
          <li>
            3. Klein AA, Meek T, Allcock E, et al. <em>Recommendations for standards of monitoring during anaesthesia and recovery 2021</em>. Anaesthesia. 2021;76(9):1212–1223 (Association of Anaesthetists / AAGBI).
          </li>
          <li>
            4. Gropper MA, Cohen NH, Eriksson LI, Fleisher LA, Leslie K, Wiener-Kronish JP. <em>Miller’s Anesthesia</em> (9th/10th Ed.). Elsevier — Perioperative Monitoring.
          </li>
          <li>
            5. Butterworth JF, Mackey DC, Wasnick JD. <em>Morgan &amp; Mikhail’s Clinical Anesthesiology</em> (7th Ed.). McGraw Hill — Patient Monitors.
          </li>
        </ul>
      </div>
    </div>
  );
};
