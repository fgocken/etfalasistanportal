import React, { useState, useEffect } from 'react';
import {
  Droplet,
  Scale,
  Activity,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Info,
  Target,
  ShieldAlert,
  TrendingUp,
  Gauge,
  Stethoscope,
  ClipboardCheck,
  ExternalLink
} from 'lucide-react';
import { IntraopFluidCalculator } from '../calculators/IntraopFluidCalculator';

interface FluidManagementStrategiesInfographicProps {
  isDark: boolean;
  initialStrategy?: StrategyId;
}

type StrategyId = 'liberal' | 'restrictive' | 'gdft';

interface IntraopStep {
  phase: string;
  action: string;
  detail: string;
}

interface StrategyDetail {
  id: StrategyId;
  name: string;
  shortLabel: string;
  tagline: string;
  summary: string;
  rateMetric: string;
  rateUnit: string;
  targetGoal: string;
  accentText: string;
  accentBorder: string;
  accentBg: string;
  activeBtnClass: string;
  physiologyPrinciple: string;
  intraopSteps: IntraopStep[];
  indications: string[];
  risksAndPitfalls: string[];
  evidenceNote: string;
}

const STRATEGIES: StrategyDetail[] = [
  {
    id: 'liberal',
    name: 'Liberal Sıvı Yönetimi',
    shortLabel: 'Liberal (Sabit Formül)',
    tagline: 'Klasik Açlık Açığı + 4-2-1 İdame + 3. Boşluk Replasmanı',
    summary:
      'İntraoperatif dönemde tüm varsayılan kayıpların (preoperatif açlık defisiti, bazal idame, insensibl evaporasyon ve cerrahi doku travması/3. boşluk kaybı) sabit mL/kg/saat formülleriyle agresif biçimde yerine konmasını esas alan geleneksel yaklaşımdır.',
    rateMetric: '8 – 15',
    rateUnit: 'mL/kg/saat (Tipik Toplam)',
    targetGoal: 'Pozitif Sıvı Dengesi (+1.5 ila +4 L)',
    accentText: 'text-sky-600 dark:text-sky-400',
    accentBorder: 'border-sky-500/30',
    accentBg: 'bg-sky-500/10',
    activeBtnClass:
      'bg-sky-600 text-white border-sky-600 shadow-xs',
    physiologyPrinciple:
      'Klasik "üçüncü boşluk" (third-space) hipotezine dayanır: Cerrahi travmanın fonksiyonel ekstraselüler sıvıyı non-fonksiyonel kompartmanlara kaydırdığı ve açlık sonrası belirgin intravasküler açık oluştuğu varsayılır. Organ perfüzyonunu korumak için yüksek volüm hedeflenir.',
    intraopSteps: [
      {
        phase: '1. Preoperatif Açlık Açığı (NPO Defisiti)',
        action: 'Açlık Saati × Bazal İdame (4-2-1 Kuralı) hesaplanır',
        detail:
          'Hesaplanan toplam açlık açığının %50’si 1. saatte, kalan %25’i 2. saatte ve %25’i 3. saatte dengeli kristaloid ile kapatılır (Örn. 70 kg hasta, 8 sa açlık → 110 mL × 8 = 880 mL açık → ilk 3 saatte 440 + 220 + 220 mL).'
      },
      {
        phase: '2. Bazal İdame İnfüzyonu (4-2-1 Kuralı)',
        action: '0–10 kg: 4 mL/kg/sa · 11–20 kg: +2 mL/kg/sa · >20 kg: +1 mL/kg/sa',
        detail:
          'Kesintisiz saatlik bazal sıvı olarak uygulanır. %0.9 NaCl yüksek volümlerde hiperkloremik metabolik asidoza yol açtığından Ringer Laktat, İsolyte-S veya Plazma-Lyte gibi dengeli kristaloidler tercih edilir.'
      },
      {
        phase: '3. Cerrahi Doku Travması & Evaporasyon (3. Boşluk)',
        action: 'Minimal: 2–4 · Orta: 4–6 · Majör Açık Batın/Toraks: 6–8 mL/kg/sa',
        detail:
          'İnsizyon büyüklüğü ve visseral maruziyete göre saatlik ek infüzyon yapılır. Obez hastalarda aşırı sıvı yükünü önlemek için gerçek kilo yerine Düzeltilmiş Vücut Ağırlığı (AdjBW) kullanılır.'
      },
      {
        phase: '4. İntraoperatif Kanama & Hipotansiyon',
        action: 'Kanama 1:1.5–1:3 Kristaloid (veya 1:1 Kolloid/Kan) ile replase edilir',
        detail:
          'İndüksiyon veya nöroaksiyel blok sonrası hipotansiyonda sıklıkla 500–1000 mL hızlı kristaloid yüklemesi yapılır; transfüzyon eşiği aşılana kadar volüm genişletici tercih edilir.'
      },
      {
        phase: '5. Kapanış ve Postoperatif İzlem',
        action: 'Ortalama net sıvı dengesi +2 ila +4 L (RELIEF liberal kolu ~3.0 L)',
        detail:
          'Uzayan majör vakalarda akciğer bazallerinde raller, periorbital/konjonktival ödem, havayolu basıncında artış ve postoperatif kilo artışı (> 2.5 kg) açısından hasta derlenmede yakından izlenmelidir.'
      }
    ],
    indications: [
      'Preoperatif gerçek hipovolemi ile gelen acil cerrahiler (ileus, kusma, diyare, mekanik barsak temizliği, sepsis)',
      'Kısa süreli (< 2 saat) minör veya orta düzey cerrahiler (aşırı birikim riski düşüktür)',
      'Günübirlik cerrahide preoperatif uzun açlık kalmış genç/sağlıklı hastalarda PONV azaltımı (15–20 mL/kg toplam)'
    ],
    risksAndPitfalls: [
      'İntravasküler hipervolemi ANP salınımını tetikleyerek endotelyal glikokaliks tabakasını parçalar; sıvı hızla interstisyuma kaçar.',
      'Bağırsak duvarı ödemi → uzamış postoperatif ileus, artmış anastomoz kaçağı riski ve karın içi hipertansiyon.',
      'Pulmoner interstisyel ödem → gaz değişiminde bozulma, atelektazi, uzamış mekanik ventilasyon ve yara iyileşmesinde gecikme.'
    ],
    evidenceNote:
      'RELIEF Çalışması (NEJM 2018), klasik yüksek volümlü (> 5–6 L) aşırı liberal yaklaşımlardan kaçınılmak kaydıyla "ılımlı liberal" stratejinin (~10 mL/kg/sa veya ~3.0 L toplam) majör batın cerrahisinde katı restriktif yaklaşıma kıyasla akut böbrek hasarını önlediğini göstermiştir.'
  },
  {
    id: 'restrictive',
    name: 'Restriktif (Sıfır-Denge) Sıvı Yönetimi',
    shortLabel: 'Restriktif (Zero-Balance)',
    tagline: 'Minimal İdame + 3. Boşluk Eklenmez + Net 0 kg Kilo Değişimi',
    summary:
      'Sağlıklı elektif cerrahi hastasında anatomik "üçüncü boşluk" kaybının klinik olarak anlamlı olmadığı ve preoperatif kısa açlık kurallarıyla normovoleminin korunduğu görüşüne dayanan, yalnızca kan kaybını yerine koyup fazla sıvıdan kaçınan stratejidir.',
    rateMetric: '1.5 – 4',
    rateUnit: 'mL/kg/saat (Bazal İdame)',
    targetGoal: 'Sıfır Sıvı Dengesi (Kilo Değişimi ≈ 0 kg)',
    accentText: 'text-amber-600 dark:text-amber-400',
    accentBorder: 'border-amber-500/30',
    accentBg: 'bg-amber-500/10',
    activeBtnClass:
      'bg-amber-600 text-white border-amber-600 shadow-xs',
    physiologyPrinciple:
      'Chappell ve Brandstrup çalışmalarının temel prensibi: Cerrahi sırasında oluşan interstisyel ödem iyatrojenik sıvı yükünün sonucudur. Normal glikokaliks bütünlüğünü korumak için intravasküler volüm yalnızca bazal kayıp ve ölçülen kanama kadar desteklenir.',
    intraopSteps: [
      {
        phase: '1. Preoperatif & İndüksiyon Pre-load Yok',
        action: 'Rutin açlık açığı replasmanı ve ön yükleme YAPILMAZ',
        detail:
          'Modern ERAS açlık protokolüne (2 saate kadar berrak sıvı / karbonhidratlı içecek) uyan hastalar normovolemik kabul edilir. Anestezi indüksiyonu veya epidural/spinal blok öncesi rutin 500–1000 mL ön yükleme verilmez.'
      },
      {
        phase: '2. Düşük Sabit Bazal İdame İnfüzyonu',
        action: '1 – 3 mL/kg/saat dengeli kristaloid (Majör batında max 3–5 mL/kg/sa)',
        detail:
          'Yalnızca insensibl solunum/deri kaybı ve bazal idrar üretimi karşılanır. Herhangi bir "3. boşluk" veya cerrahi travma katsayısı infüzyona eklenmez (70 kg hastada tipik olarak 100–200 mL/sa).'
      },
      {
        phase: '3. Anesteziye Bağlı Hipotansiyonda Vazopresör Önceliği',
        action: 'MAP < 65 mmHg → Efedrin, Fenilefrin veya Noradrenalin titrasyonu',
        detail:
          'Genel anesteziklerin ve nöraksiyel blokların yarattığı sistemik vazodilatasyona (relatif hipovolemiye) bağlı hipotansiyon, sıvı bolusu ile değil düşük doz vazopresör infüzyonu/bolusu ile tedavi edilir.'
      },
      {
        phase: '4. Gerçek Kanamanın Birebir Replasmanı',
        action: 'Aspiratör + Spanç ölçümüne göre 1:1 (Kolloid/Kan) veya 1:1.5 Kristaloid',
        detail:
          'Prophylactic sıvı bolusu yapılmaz. Yalnızca objektif olarak ölçülen kan kaybı yerine konur. İdrar çıkışı < 0.5 mL/kg/sa olması tek başına (laktat normalse ve taşikardi yoksa) sıvı verme endikasyonu sayılmaz.'
      },
      {
        phase: '5. Güvenlik Sınırı & Eskalasyon Kriteri',
        action: 'Laktat artışı (> 2 mmol/L) veya persistan taşikardide restriksiyon sonlandırılır',
        detail:
          'Klinik hipoperfüzyon bulguları ortaya çıkarsa hasta derhal restriktif protokolden çıkarılıp dinamik monitörizasyon eşliğinde hedefe yönelik (GDFT) bolusa geçirilir.'
      }
    ],
    indications: [
      'ERAS (Hızlandırılmış Cerrahi Sonrası İyileşme) protokolüne alınan elektif kolorektal cerrahiler (düşük–orta risk)',
      'Torasik cerrahi / Akciğer rezeksiyonları (postoperatif akut akciğer hasarı ve pulmoner ödem riskini azaltmak için)',
      'Kalp yetersizliği (düşük EF), kronik böbrek hastalığı (sıvı kısıtlı) veya ciddi volüm yükü toleranssızlığı olan hastalar'
    ],
    risksAndPitfalls: [
      'RELIEF UYARISI (NEJM 2018): Katı restriktif rejim (ort. ~1.7 L intraop), majör abdominal cerrahide Akut Böbrek Hasarını (%8.6 vs %5.0), diyaliz gereksinimini ve cerrahi alan enfeksiyonunu anlamlı biçimde artırmıştır.',
      'Gizli splanknik hipoperfüzyon: İntraop MAP normal görünse bile mikrosirkülasyon ve renal medüller perfüzyon bozulabilir.',
      'Böbrek yetmezliği, sepsis, açık pankreatik/hepatik cerrahi veya yüksek kanama riski olan vakalarda tek başına uygulanması tehlikelidir.'
    ],
    evidenceNote:
      '2018 RELIEF çalışması sonrası ERAS ve POQI kılavuzları katı "restriktif" tanımını terk ederek "ılımlı sıfır-denge (tipik 1–2 L pozitif dengeyi aşmayan)" veya yüksek riskli vakalarda GDFT kullanımına evrilmiştir.'
  },
  {
    id: 'gdft',
    name: 'Hedefe Yönelik Sıvı Yönetimi (GDFT)',
    shortLabel: 'Hedefe Yönelik (GDFT)',
    tagline: 'Dinamik İndeksler (PPV/SVV/SV) Eşliğinde Kişiselleştirilmiş Bolus',
    summary:
      'Hastanın yaş, komorbidite ve anlık fizyolojik yanıtına göre Frank–Starling eğrisi üzerindeki yerini dinamik monitörlerle (PPV, SVV, SV) saptayıp yalnızca "sıvı yanıtlılığı" kanıtlandığında kontrollü bolus vermeyi esas alan modern altın standart yaklaşımdır.',
    rateMetric: '1–2 + 250 mL',
    rateUnit: 'mL/kg/sa Bazal + Dinamik Bolus',
    targetGoal: 'ΔSV < %10 (Plato) · PPV/SVV < %12 · MAP ≥ 65',
    accentText: 'text-emerald-600 dark:text-emerald-400',
    accentBorder: 'border-emerald-500/30',
    accentBg: 'bg-emerald-500/10',
    activeBtnClass:
      'bg-emerald-600 text-white border-emerald-600 shadow-xs',
    physiologyPrinciple:
      'Frank–Starling mekanizması: Bir hasta ancak ventrikül eğrisinin dik (önyük-bağımlı) kısmındaysa verilen sıvı atım hacmini (SV) ve dokuya oksijen sunumunu (DO2) artırır. Eğrinin düz (plato) kısmında verilen her ekstra mL sıvı sadece doku ödemine yol açar.',
    intraopSteps: [
      {
        phase: '1. Minimal Bazal İdame + İnvaziv/Dinamik Kurulum',
        action: '1–2 mL/kg/sa dengeli kristaloid + Arteriyel Nabız Konturu / Özofageal Doppler',
        detail:
          'İndüksiyon sonrası bazal idame açılır (açlık defisiti veya 3. boşluk eklenmez). Nabız basıncı varyasyonu (PPV), Atım Hacmi Varyasyonu (SVV) veya Atım Hacmi (SV) monitörize edilip bazal değerler kaydedilir.'
      },
      {
        phase: '2. Dinamik İndeks Geçerlilik Kontrolü',
        action: 'PPV/SVV yorumlaması için 5 şart doğrulanır',
        detail:
          'Sinüs ritmi (AF olmamalı), tam kontrollü mekanik ventilasyon (VT ≥ 8 mL/kg ideal ağırlık; düşük TV ise mini-bolus testi), kapalı toraks ve normal karın içi basınç (laparoskopide PPV/SVV eşiği ~%15–17’ye yükselir).'
      },
      {
        phase: '3. Sıvı Yükleme (Fluid Challenge) Kararı',
        action: 'PPV ≥ %12–13 veya SVV ≥ %12–13 (ya da SV düşüşü > %10) → 250 mL Bolus',
        detail:
          'Tetikleyici eşik aşıldığında 5–10 dakika içinde hızlı 200–250 mL (3–4 mL/kg) dengeli kristaloid (seçili hipoonkotik olgularda albümin) verilir. Gri zonda (PPV %9–13) 100 mL mini-fluid challenge veya Tidal Volüm Testi uygulanır.'
      },
      {
        phase: '4. Frank–Starling Yanıt Değerlendirmesi (10-15 dk Kuralı)',
        action: 'ΔSV ≥ %10 artış varsa bolus tekrarı · ΔSV < %10 ise SIVI DURDURULUR',
        detail:
          'Bolus sonrası SV ≥ %10 artmışsa hasta hâlâ volüm yanıtlıdır; PPV/SVV < %12 olana veya SV artışı < %10 platoya ulaşana kadar algoritma tekrarlanır. ΔSV < %10 ise hasta maksimum doluluktadır, sıvı verilmez.'
      },
      {
        phase: '5. Vazopresör & İnotrop Entegrasyonu',
        action: 'Volüm yanıtsız + MAP < 65 → Vazopresör · CI < 2.2–2.5 → İnotrop',
        detail:
          'Önyük optimize edilmiş (ΔSV < %10) ancak MAP < 65 mmHg devam ediyorsa Noradrenalin/Fenilefrin başlanır. Kardiyak indeks düşük (< 2.2–2.5 L/dk/m²) ve laktat yükseliyorsa düşük doz Dobutamin ile DO2I (> 500–600 mL/dk/m²) hedeflenir.'
      }
    ],
    indications: [
      'Yüksek riskli majör cerrahiler (Whipple/pankreatektomi, majör hepatektomi, özofajektomi, sistektomi, aortik vasküler cerrahi)',
      'Yüksek komorbiditeli hastalar (ASA III–IV, yaşlı, KAH, kalp yetersizliği, KOAH, kronik böbrek hastalığı)',
      'Tahmini kan kaybı > 500–1000 mL veya süresi > 2–3 saat olan tüm majör intraabdominal/ortopedik ameliyatlar'
    ],
    risksAndPitfalls: [
      'Aritmi (Atriyal fibrilasyon), spontan solunum, açık toraks veya yüksek PEEP altında PPV ve SVV değerleri güvenilmezdir (yanlış pozitif/negatif).',
      'Pnömoperiton (laparoskopi/robotik cerrahi) ve Trendelenburg pozisyonunda intraabdominal basınç artışı PPV/SVV bazalını yukarı çeker.',
      'OPTIMISE II (BMJ 2024): Düşük riskli, kısa süreli ERAS hastalarında rutin ileri kardiyak debi monitörü + inotrop kullanımı ek klinik fayda göstermemiştir; invaziv maliyet/risk dengesi gözetilmelidir.'
    ],
    evidenceNote:
      'POQI (Perioperative Quality Initiative), ERAS Society ve FEDORA (BJA 2018) verileri yüksek riskli hastada ve majör cerrahide GDFT’nin postoperatif komplikasyonları, ileusu, ABH’yi ve hastane yatış süresini azalttığını doğrulamaktadır.'
  }
];

interface ComparisonRow {
  parameter: string;
  liberal: string;
  restrictive: string;
  gdft: string;
  clinicalNote: string;
}

const COMPARISON_TABLE: ComparisonRow[] = [
  {
    parameter: '1. Temel Felsefe & Amaç',
    liberal: 'Tüm açlık, idame ve doku travması kayıplarını formüle göre eksiksiz yerine koymak',
    restrictive: 'İyatrojenik ödemi önlemek için bazal kayıp + kanama dışında sıvı vermemek (0 kg denge)',
    gdft: 'Kişiye özel dinamik monitörizasyonla Frank–Starling eğrisi tepesinde doku DO2 optimizasyonu',
    clinicalNote: 'U-şekilli risk eğrisinin dip noktası (normovolemi) her hastada farklıdır.'
  },
  {
    parameter: '2. NPO (Açlık) Açığı Yaklaşımı',
    liberal: 'Klasik formülle (Açlık saati × İdame) hesaplanıp ilk 3 saatte (%50-%25-%25) kapatılır',
    restrictive: 'Modern açlık kuralları nedeniyle açlık açığı replasmanı YAPILMAZ',
    gdft: 'Formülle açlık açığı verilmez; gerçek hipovolemi varsa sadece PPV/SV yanıtına göre bolus yapılır',
    clinicalNote: '2 saate kadar berrak sıvı içen sağlıklı hastada intravasküler hacim azalmaz.'
  },
  {
    parameter: '3. Bazal İdame Hızı',
    liberal: '4-2-1 Kuralı (~1.5 mL/kg/sa) + ek kayıplar',
    restrictive: '1 – 3 mL/kg/saat (Tipik 1.5 – 2 mL/kg/saat)',
    gdft: '1 – 2 mL/kg/saat sabit bazal infüzyon',
    clinicalNote: 'Tüm modern stratejilerde bazal insensibl idame 1–2 mL/kg/sa civarındadır.'
  },
  {
    parameter: '4. 3. Boşluk / Doku Travması Eki',
    liberal: 'Eklenir: 2–4 (minimal), 4–6 (orta), 6–8 mL/kg/saat (majör açık cerrahi)',
    restrictive: 'Eklenmez (0 mL/kg/saat — klasik "3. boşluk" konsepti reddedilir)',
    gdft: 'Sabit eklenmez; gerçek interstisyel/vasküler kayıp SV/PPV düşüşü yarattığında bolusla karşılanır',
    clinicalNote: 'Brandstrup ve Chappell çalışmaları klasik büyük 3. boşluk kaybı kavramını çürütmüştür.'
  },
  {
    parameter: '5. Tipik İntraop Toplam Volüm (Majör Batın)',
    liberal: '8 – 15 mL/kg/saat (Ortalama 3.0 – 5.0+ L / vaka)',
    restrictive: '3 – 5 mL/kg/saat (Ortalama 1.2 – 1.8 L / vaka)',
    gdft: 'Hastanın yanıtına bağlı bireyselleştirilmiş (Ortalama 2.0 – 3.5 L / vaka)',
    clinicalNote: 'RELIEF çalışmasında 1.7 L vs 3.0 L farkı böbrek sonuçlarını belirlemiştir.'
  },
  {
    parameter: '6. Sıvı Türü Tercihi',
    liberal: 'Dengeli kristaloid (RL, Plazma-Lyte, İsolyte-S); %0.9 NaCl hiperkloremik asidoz riski taşır',
    restrictive: 'Yalnızca dengeli izotonik kristaloid; büyük kanamada kan ürünü/albümin',
    gdft: 'Bazalde dengeli kristaloid; boluslarda dengeli kristaloid (hipoalbüminemide %5 albümin seçeneği)',
    clinicalNote: 'Nişasta solüsyonları (HES) nefrotoksisite nedeniyle perioperatif rutinden çıkarılmıştır.'
  },
  {
    parameter: '7. Anestezi Kaynaklı Hipotansiyon Tedavisi',
    liberal: 'Öncelikle hızlı 500–1000 mL sıvı yüklemesi, yanıt yoksa vazopresör',
    restrictive: 'Vazodilatasyon kaynaklıysa sıvı verilmez; doğrudan vazopresör (Efedrin/Fenilefrin/NA) başlanır',
    gdft: 'Önce PPV/SVV bakılır: Yüksekse (≥ %12) 250 mL bolus; normalse (< %12) vazopresör verilir',
    clinicalNote: 'Propofol ve nöraksiyel blok venöz kapasitansı artırır, gerçek kan hacmini azaltmaz.'
  },
  {
    parameter: '8. Monitörizasyon Gereksinimi',
    liberal: 'Standart ASA monitörizasyonu (NIBP, KAH, SpO2, idrar takibi)',
    restrictive: 'Standart ASA + saatlik kan kaybı, laktat ve klinik perfüzyon takibi',
    gdft: 'İleri hemodinamik monitör (Arter kateteri ile PPV/SVV, Özofageal Doppler veya POCUS)',
    clinicalNote: 'İdrar çıkışı (< 0.5 mL/kg/sa) tek başına güvenilir hipovolemi belirteci değildir.'
  },
  {
    parameter: '9. Sıvı Bolusu Verme Kriteri',
    liberal: 'Sabit saatlik plan, TA düşüşü veya düşük idrar çıkışı (Ampirik bolus)',
    restrictive: 'Yalnızca ölçülen akut kan kaybı veya laktat yüksekliği ile kanıtlı hipoperfüzyon',
    gdft: 'PPV ≥ %12–13, SVV ≥ %12–13 veya 250 mL yükleme sonrası ΔSV ≥ %10 pozitif yanıt',
    clinicalNote: 'GDFT hastaların yaklaşık %50’sinde gereksiz yanıt vermeyen bolusları engeller.'
  },
  {
    parameter: '10. Hedef Postop Net Sıvı Dengesi & Kilo',
    liberal: 'Pozitif denge (+1.5 ila +4 L) / +1.5 ila +3 kg kilo artışı',
    restrictive: 'Sıfır denge (0 ila +0.5 L) / ~0 kg kilo değişimi',
    gdft: 'Ilımlı dengeli (+0.5 ila +1.5 L) / Organ perfüzyonu odaklı optimal övolemi',
    clinicalNote: '> 2.5 kg postop kilo artışı anastomoz ve solunum komplikasyonlarını artırır.'
  },
  {
    parameter: '11. Başlıca Risk Profili',
    liberal: 'Glikokaliks hasarı, bağırsak ödemi, uzamış ileus, anastomoz kaçağı, pulmoner ödem',
    restrictive: 'Renal hipoperfüzyon, Akut Böbrek Hasarı (ABH %8.6 vs %5.0), cerrahi alan enfeksiyonu',
    gdft: 'Monitör bağımlı yanlış yorumlama (AF, düşük TV, pnömoperiton), arteriyel/maliyet yükü',
    clinicalNote: 'Aşırı uçlar (aşırı kuru veya aşırı ıslak) mortalite ve morbiditeyi artırır.'
  },
  {
    parameter: '12. İdeal Endikasyon (Kılavuz Önerisi)',
    liberal: 'Acil dehidrate hastalar, belirgin preop kayıp, kısa minör cerrahiler',
    restrictive: 'ERAS düşük/orta riskli elektif kolorektal cerrahi, akciğer rezeksiyonları',
    gdft: 'Majör yüksek riskli cerrahi, ASA III–IV hastalar, yüksek kanama/sıvı şifti beklentisi',
    clinicalNote: 'ERAS & POQI: Düşük riskte ılımlı sıfır-denge, yüksek riskte GDFT önerilir.'
  }
];

const SPECIAL_SCENARIOS = [
  {
    title: 'Pnömoperiton (Laparoskopik & Robotik Cerrahi)',
    badge: 'Eşik Modifikasyonu',
    text: 'Karın içi basıncın 12–15 mmHg’ya çıkması venöz dönüşü baskılar ve toraks kompliyansını düşürerek PPV/SVV değerlerini yapay olarak yükseltir. Bu vakalarda sıvı yanıtlılığı eşiği %12 yerine genellikle %15–17 olarak kabul edilir; Trendelenburg pozisyonu da değerlendirmeyi etkiler.'
  },
  {
    title: 'Gri Zon (PPV %9 – %13) ve Düşük Tidal Volüm',
    badge: 'Tidal Volüm Testi',
    text: 'Akciğer koruyucu ventilasyonda (VT 6 mL/kg) PPV yalancı negatif çıkabilir. Geçici olarak 1 dakikalığına VT 8 mL/kg’a çıkarılıp ΔPPV ≥ %3.5 artışı gözlenebilir (Tidal Volume Challenge) veya 100 mL Mini-Fluid Challenge ile ΔSV ≥ %5–6 yanıtı test edilir.'
  },
  {
    title: 'Atriyal Fibrilasyon / Spontan Solunum',
    badge: 'PPV/SVV Kontrendike',
    text: 'PPV ve SVV atım-atım ventrikül doluş değişkenliğini kullandığından aritmide veya spontan solunum eforunda geçersizdir. Bu durumda Pasif Bacak Kaldırma (PLR) testi, End-Ekspiratuar Oklüzyon Testi (15 sn) veya POCUS ile LVOT VTI / VCI değişkenliği kullanılır.'
  },
  {
    title: 'Sıvı Seçimi: Dengeli Kristaloid vs %0.9 NaCl vs Kolloid',
    badge: 'SALT-ED / SMART / Kılavuz',
    text: 'Yüksek miktarda %0.9 NaCl (Cl⁻ 154 mEq/L) hiperkloremik metabolik asidoz, afferent renal arteriyol vazokonstriksiyonu ve ABH riskini artırır. İlk tercih dengeli kristaloidlerdir (Ringer Laktat, Plazma-Lyte). Sentetik nişastalar (HES) ABH ve koagülopati riski nedeniyle rutin kullanılmaz; hipoalbüminemik majör cerrahide %4–5 Albümin düşünülebilir.'
  }
];

const REFERENCES = [
  {
    id: 1,
    type: 'Textbook',
    citation:
      "Gropper MA, Cohen NH, Eriksson LI, Fleisher LA, Leslie K, Wiener-Kronish JP (Eds.). Miller's Anesthesia. 9th/10th Ed. Philadelphia: Elsevier; Chapter: Perioperative Fluid and Electrolyte Therapy.",
    note: '4-2-1 kuralı, sıvı kompartman fizyolojisi, glikokaliks modeli ve dengeli kristaloid prensipleri.'
  },
  {
    id: 2,
    type: 'Textbook',
    citation:
      "Butterworth JF, Mackey DC, Wasnick JD. Morgan & Mikhail's Clinical Anesthesiology. 7th Ed. McGraw-Hill; Chapter 49: Management of Patients with Fluid and Electrolyte Disturbances.",
    note: 'İntraoperatif açlık defisiti, cerrahi travma derecelendirmesi ve klasik vs modern sıvı yaklaşımları.'
  },
  {
    id: 3,
    type: 'Landmark Trial',
    citation:
      'Myles PS, Bellomo R, Corcoran T, et al. Restrictive versus Liberal Fluid Therapy for Major Abdominal Surgery (RELIEF Trial). N Engl J Med. 2018;378(24):2263-2274.',
    note: '3000 hastada katı restriktif rejimin ABH (%8.6 vs %5.0) ve cerrahi alan enfeksiyonunu artırdığını kanıtlayan dönüm noktası çalışma.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/29742967/'
  },
  {
    id: 4,
    type: 'Kılavuz',
    citation:
      'Gustafsson UO, Scott MJ, Hubner M, et al. Guidelines for Perioperative Care in Elective Colorectal Surgery: Enhanced Recovery After Surgery (ERAS®) Society Recommendations: 2018. World J Surg. 2019;43(3):659-695.',
    note: 'ERAS sıfır-denge ("near-zero fluid balance"), preop berrak sıvı/karbonhidrat ve yüksek riskte GDFT önerileri.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/30426190/'
  },
  {
    id: 5,
    type: 'Konsensus',
    citation:
      'Miller TE, Myles PS; Perioperative Quality Initiative (POQI) Workgroup. Perioperative Fluid Therapy for Major Surgery. Anesthesiology / Br J Anaesth (POQI Consensus). 2019;130(5):825-832.',
    note: 'Düşük riskli vakalarda ılımlı liberal/övolemik yaklaşım, yüksek riskli majör cerrahide GDFT algoritması.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/30985319/'
  },
  {
    id: 6,
    type: 'Trial (2024)',
    citation:
      'Pearse RM, et al. (OPTIMISE II Investigators). Effect of cardiac output-guided haemodynamic therapy on postoperative infection and mortality (OPTIMISE II). BMJ. 2024;385:e078671.',
    note: 'Modern ERAS çağında düşük-orta riskli majör GIS cerrahisinde rutin kalp debisi-güdümlü inotrop+sıvı algoritmasının sınırlarını ortaya koyan büyük RKÇ.'
  },
  {
    id: 7,
    type: 'Trial',
    citation:
      'Calvo-Vecino JM, Ripollés-Melchor J, Mythen MG, et al. Effect of goal-directed haemodynamic therapy on postoperative complications in low–moderate risk surgical patients: a multicentre randomised controlled trial (FEDORA). Br J Anaesth. 2018;120(4):734-744.',
    note: 'Özofageal Doppler rehberliğinde GDFT ile postoperatif komplikasyonlar ve yatış süresinde azalma.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/29576114/'
  },
  {
    id: 8,
    type: 'Kılavuz',
    citation:
      'NICE Clinical Guideline [CG174] / NG24: Intravenous fluid therapy in adults in hospital & ESAIC Perioperative Fasting / Haemodynamic Guidelines.',
    note: 'Klinik değerlendirme, 5R yaklaşımı (Resuscitation, Routine maintenance, Replacement, Redistribution, Reassessment).'
  }
];

export const FluidManagementStrategiesInfographic: React.FC<FluidManagementStrategiesInfographicProps> = ({
  isDark,
  initialStrategy = 'gdft'
}) => {
  const [selectedStrategy, setSelectedStrategy] = useState<StrategyId>(initialStrategy);

  useEffect(() => {
    setSelectedStrategy(initialStrategy);
  }, [initialStrategy]);

  const activeStrategy = STRATEGIES.find((s) => s.id === selectedStrategy) || STRATEGIES[2];

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Clinical Rationale */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border space-y-3 transition-colors ${
          isDark
            ? 'bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border-slate-800'
            : 'bg-gradient-to-r from-cyan-50/70 via-white to-emerald-50/60 border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
            ERAS · POQI · RELIEF · MILLER&apos;S ANESTHESIA
          </span>
          <span aria-hidden="true">·</span>
          <span>İntraoperatif Hemodinami ve Sıvı Stratejileri</span>
        </div>

        <h3 className={`text-lg sm:text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Liberal, Restriktif ve Hedefe Yönelik (GDFT) Sıvı Yönetimi
        </h3>

        <p className={`text-xs leading-relaxed max-w-4xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Perioperatif sıvı dengesi ile organ komplikasyonları arasında <strong>U-şekilli bir risk ilişkisi</strong> bulunur.
          Yetersiz sıvı (hipovolemi) splanknik ve renal hipoperfüzyona yol açarken, aşırı sıvı (hipervolemi) endotelyal
          glikokaliks tabakasını parçalayarak doku ödemi, anastomoz kaçağı ve solunum yetmezliği doğurur. Aşağıda üç temel
          stratejinin fizyolojik temeli, adım adım ameliyathane uygulaması ve 12 parametreli kıyaslaması yer almaktadır.
        </p>

        {/* U-Shaped Curve Quick Summary Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div
            className={`p-3.5 rounded-xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
              Sol Uç · Aşırı Kuru (Hipovolemi)
            </div>
            <div className={`text-xs font-semibold mt-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Organ Hipoperfüzyonu &amp; ABH Riski
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Düşük kardiyak debi, renal medüller iskemi (RELIEF: %8.6 ABH), laktik asidoz ve cerrahi alan enfeksiyonu.
            </p>
          </div>

          <div
            className={`p-3.5 rounded-xl border ${
              isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/70 border-emerald-200'
            }`}
          >
            <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
              Optimal Çukur · Övolemi (GDFT / Dengeli)
            </div>
            <div className={`text-xs font-semibold mt-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Korunmuş Glikokaliks &amp; Optimal DO2
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              Frank–Starling eğrisi tepesine yakın stabil atım hacmi, normal laktat, minimum komplikasyon ve hızlı derlenme.
            </p>
          </div>

          <div
            className={`p-3.5 rounded-xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="text-[11px] font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold">
              Sağ Uç · Aşırı Islak (Hipervolemi)
            </div>
            <div className={`text-xs font-semibold mt-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Glikokaliks Yıkımı &amp; İnterstisyel Ödem
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              ANP salınımı, bağırsak duvarı ödemi, uzamış ileus, anastomoz ayrılması ve postoperatif pulmoner ödem.
            </p>
          </div>
        </div>
      </div>

      {/* QUICK INDICATIONS SUMMARY CARD (Placed right before the comparison table) */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-cyan-500 shrink-0" />
          <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Özet İdeal Endikasyon Önerileri (Hızlı Bakış)
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            className={`p-3 rounded-xl border ${
              isDark ? 'bg-sky-950/20 border-sky-500/30' : 'bg-sky-50/70 border-sky-200'
            }`}
          >
            <div className="text-xs font-bold text-sky-600 dark:text-sky-400 mb-1">Liberal Yönetim</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Acil dehidrate hastalar, belirgin preop kayıp, kısa minör cerrahiler.
            </p>
          </div>

          <div
            className={`p-3 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'
            }`}
          >
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">Restriktif (Sıfır-Denge)</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              ERAS düşük/orta riskli elektif kolorektal cerrahi, akciğer rezeksiyonları.
            </p>
          </div>

          <div
            className={`p-3 rounded-xl border ${
              isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/70 border-emerald-200'
            }`}
          >
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">Hedefe Yönelik (GDFT)</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Majör yüksek riskli cerrahi, ASA III–IV hastalar, yüksek kanama/sıvı şifti beklentisi.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Side-by-Side 12-Parameter Comparison Table */}
      <div
        className={`rounded-2xl border overflow-hidden transition-colors ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div
          className={`p-4 sm:p-5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
            isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-slate-50/70'
          }`}
        >
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-cyan-500 shrink-0" />
            <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              12 Parametrede Strateji Karşılaştırma Tablosu
            </h4>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Liberal vs Restriktif (Zero-Balance) vs Hedefe Yönelik (GDFT)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[860px]">
            <thead>
              <tr
                className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                  isDark
                    ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <th className="py-3 px-4 w-[18%]">Klinik Parametre</th>
                <th className="py-3 px-4 w-[24%] text-sky-600 dark:text-sky-400">
                  Liberal Yönetim
                </th>
                <th className="py-3 px-4 w-[24%] text-amber-600 dark:text-amber-400">
                  Restriktif (Sıfır-Denge)
                </th>
                <th className="py-3 px-4 w-[24%] text-emerald-600 dark:text-emerald-400">
                  Hedefe Yönelik (GDFT)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
              {COMPARISON_TABLE.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50/80'
                  }`}
                >
                  <td className="py-3.5 px-4 align-top">
                    <div className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                      {row.parameter}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                      {row.clinicalNote}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 align-top text-slate-700 dark:text-slate-300 leading-relaxed tabular-nums">
                    {row.liberal}
                  </td>
                  <td className="py-3.5 px-4 align-top text-slate-700 dark:text-slate-300 leading-relaxed tabular-nums">
                    {row.restrictive}
                  </td>
                  <td className="py-3.5 px-4 align-top text-slate-700 dark:text-slate-300 leading-relaxed tabular-nums font-medium">
                    {row.gdft}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Detailed Intraoperative Application Protocol (Interactive Selector + Full Step-by-Step Guide) */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border space-y-5 transition-colors ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-cyan-500 shrink-0" />
              <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Ayrıntılı İntraoperatif Uygulama Rehberi
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Ameliyathane pratiğinde her üç stratejinin indüksiyondan derlenmeye adım adım uygulanışı
            </p>
          </div>

          {/* Interactive Segmented Strategy Switcher (Flex wrap for clean multi-line adaptation) */}
          <div
            className={`flex flex-wrap items-center gap-1.5 p-1 rounded-xl border ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            {STRATEGIES.map((strategy) => {
              const isSelected = strategy.id === selectedStrategy;
              return (
                <button
                  key={strategy.id}
                  type="button"
                  onClick={() => setSelectedStrategy(strategy.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex-1 sm:flex-none text-center ${
                    isSelected
                      ? strategy.activeBtnClass
                      : isDark
                        ? 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800'
                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {strategy.shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Strategy Key Metrics & Physiology */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div
            className={`lg:col-span-2 p-4 rounded-xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className={`text-xs font-mono font-bold uppercase tracking-wider ${activeStrategy.accentText}`}>
              {activeStrategy.tagline}
            </div>
            <h5 className={`text-base font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {activeStrategy.name}
            </h5>
            <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {activeStrategy.summary}
            </p>
            <div className="mt-3 pt-3 border-t border-slate-200/70 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong className={activeStrategy.accentText}>Fizyolojik Temel: </strong>
              {activeStrategy.physiologyPrinciple}
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Uygulama Hızı / Protokol Dozu
              </div>
              <div className={`text-2xl font-mono font-bold tabular-nums mt-1 ${activeStrategy.accentText}`}>
                {activeStrategy.rateMetric}
              </div>
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {activeStrategy.rateUnit}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Hedef Sonlanım Noktası
              </div>
              <div className={`text-xs font-bold mt-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {activeStrategy.targetGoal}
              </div>
            </div>
          </div>
        </div>

        {/* 5-Phase Step-by-Step Intraoperative Protocol */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            <ClipboardCheck className="w-4 h-4 text-cyan-500" />
            <span>Ameliyathane İçi Adım Adım Uygulama Protokolü</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {activeStrategy.intraopSteps.map((step, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border transition-colors ${
                  isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <span className={`text-xs font-bold ${activeStrategy.accentText}`}>
                    {step.phase}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-200 tabular-nums">
                    {step.action}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Indications & Risks Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-emerald-950/15 border-emerald-500/25' : 'bg-emerald-50/50 border-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Tercih Edilen Klinik Endikasyonlar</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {activeStrategy.indications.map((item, idx) => (
                <li key={idx} className="leading-relaxed flex items-start gap-2">
                  <span className="text-emerald-500 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-rose-950/15 border-rose-500/25' : 'bg-rose-50/50 border-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400 mb-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Riskler, Kısıtlılıklar &amp; Klinik Tuzaklar</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {activeStrategy.risksAndPitfalls.map((item, idx) => (
                <li key={idx} className="leading-relaxed flex items-start gap-2">
                  <span className="text-rose-500 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Clinical Evidence Box */}
        <div
          className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
            isDark ? 'bg-slate-950/70 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <Info className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Kılavuz ve Çalışma Özeti: </strong>
            {activeStrategy.evidenceNote}
          </p>
        </div>
      </div>

      {/* 4. GDFT Bedside Decision Loop & Special Intraop Scenarios (Only shown when GDFT is selected) */}
      {selectedStrategy === 'gdft' && (
        <div
          className={`p-5 sm:p-6 rounded-2xl border space-y-4 transition-colors ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-500 shrink-0" />
            <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              GDFT Yatak Başı Karar Döngüsü ve İntraoperatif Özel Durumlar
            </h4>
          </div>

          {/* 4-Step Compact Loop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                <Gauge className="w-3.5 h-3.5" />
                <span>ADIM 1 · BAZAL</span>
              </div>
              <div className={`text-xs font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                1–2 mL/kg/sa İdame + Tarama
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Bazal SV, PPV ve SVV ölçülür. Sinüs ritmi ve VT ≥ 8 mL/kg doğrulanır.
              </p>
            </div>

            <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                <Droplet className="w-3.5 h-3.5" />
                <span>ADIM 2 · YÜKLEME</span>
              </div>
              <div className={`text-xs font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                PPV/SVV ≥ %12 → 250 mL
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                5–10 dk içinde 250 mL dengeli kristaloid (veya albümin) hızlı infüzyon yapılır.
              </p>
            </div>

            <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>ADIM 3 · YANIT TESTİ</span>
              </div>
              <div className={`text-xs font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                ΔSV ≥ %10 ise Tekrarla
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                SV ≥ %10 arttıysa tekrarlanabilir; artış &lt; %10 ise plato fazıdır, sıvı kesilir.
              </p>
            </div>

            <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-rose-600 dark:text-rose-400">
                <Activity className="w-3.5 h-3.5" />
                <span>ADIM 4 · VAZOPRESÖR</span>
              </div>
              <div className={`text-xs font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Övolemik Hipotansiyon → NA
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                SV platoda ve MAP &lt; 65 mmHg ise Noradrenalin; CI &lt; 2.2 ise Dobutamin eklenir.
              </p>
            </div>
          </div>

          {/* Special Intraop Scenarios Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            {SPECIAL_SCENARIOS.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {item.title}
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-cyan-600 dark:text-cyan-400 whitespace-nowrap">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Practical Fluid Choice Rule */}
      <div
        className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${
          isDark ? 'bg-amber-950/15 border-amber-500/25 text-amber-200' : 'bg-amber-50/70 border-amber-200 text-amber-900'
        }`}
      >
        <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>POQI &amp; ERAS Klinik Uzlaşısı:</strong> Sağlıklı bireylerde düşük–orta riskli elektif cerrahilerde aşırı
          restriksiyondan kaçınılarak <strong>ılımlı övolemik denge (tipik 1–2 L pozitif dengeyi geçmeyen)</strong> hedeflenmelidir.
          Majör yüksek riskli cerrahide (Whipple, hepatektomi, kolorektal kanser, ASA III–IV) ise <strong>Hedefe Yönelik Sıvı
          Yönetimi (GDFT)</strong> standart bakım olarak benimsenmelidir.
        </div>
      </div>

      {/* 5B. Intraop Fluid Calculator (Embedded inside Liberal Fluid Management, immediately before Sources & Further Reading) */}
      {selectedStrategy === 'liberal' && (
        <IntraopFluidCalculator isDark={isDark} />
      )}

      {/* 6. Sources & Further Reading */}
      <div
        className={`p-5 rounded-2xl border text-xs space-y-3 ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}
      >
        <div className="flex items-center gap-2 font-bold text-sm text-slate-800 dark:text-slate-100">
          <BookOpen className="w-4 h-4 text-cyan-500 shrink-0" />
          <span>Kaynaklar ve İleri Okuma (Textbook &amp; Kılavuzlar)</span>
        </div>

        <div className="space-y-2.5">
          {REFERENCES.map((ref) => (
            <div
              key={ref.id}
              className={`p-3 rounded-xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  [{ref.id}] · {ref.type}
                </span>
                {ref.url && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    <span>PubMed</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <p className="leading-relaxed font-medium text-slate-800 dark:text-slate-200">
                {ref.citation}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {ref.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
