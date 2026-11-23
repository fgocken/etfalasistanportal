import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  Calculator,
  CheckCircle2,
  GitBranch,
  RotateCcw,
  ShieldAlert,
  Target,
} from 'lucide-react';
import { MedicalText } from '../basics/respiratory/MedicalText';

interface TptdInteractiveDecisionTreeProps {
  isDark: boolean;
}

type CiState = 'low' | 'high';
type GedviState = 'low' | 'normal' | 'high';
type EvlwiState = 'low' | 'high';
type DryMechState = 'svri_low' | 'svri_normal' | 'svri_high';
type WetMechState = 'pvpi_hydro' | 'pvpi_perm';
type Tone = 'sky' | 'amber' | 'rose' | 'emerald' | 'indigo' | 'slate';

interface TreeScenario {
  code: string;
  badgeLabel: string;
  tone: Tone;
  title: string;
  action: string;
  steps: string[];
  target: string;
  warning: string;
  requireEcho?: boolean;
}

interface CurveSpec {
  id: string;
  d: string;
  active: boolean;
}

const DRY_SCENARIOS: Record<`${CiState}-${GedviState}-${DryMechState}`, TreeScenario> = {
  // CI LOW (< 3,0) + EVLWI < 10
  'low-low-svri_low': {
    code: 'V+ / VP',
    badgeLabel: 'VOLÜM + VAZOPRESÖR',
    tone: 'amber',
    title: 'Hipovolemi + Eşlik Eden Vazopleji (Erken Mikst / Septik Şok)',
    action:
      '250–500 mL dengeli kristaloid bolusu uygulayın; MAP < 65 mmHg ise sıvı yanıtını beklemeden erken noradrenalin ekleyin.',
    steps: [
      'Kontrollü MV ve sinüs ritmi varsa SVV/PPV ≥ %12–13 veya PLR (+) ile sıvı yanıtlılığını doğrulayın.',
      'SVRI < 1.700 olduğu için tek başına sıvı ile perfüzyon basıncı sağlanamayabilir; erken noradrenalin venöz dönüşü de artırır.',
      'Bolus sonrası CI artışı (≥ %10–15) ve GEDVI yükselişini kontrol edin; laktat klirensini izleyin.',
    ],
    target: 'GEDVI 680–800 · MAP ≥ 65 mmHg · CI ≥ 2,8–3,0',
    warning:
      'Aritmi, spontan solunum veya düşük tidal volüm (< 7 mL/kg) varlığında SVV/PPV güvenilir değildir; Pasif Bacak Kaldırma (PLR) kullanın.',
  },
  'low-low-svri_normal': {
    code: 'V+',
    badgeLabel: 'VOLÜM YÜKLEMESİ',
    tone: 'sky',
    title: 'Hipovolemik Şok / Akut Sıvı Açığı',
    action:
      '250–500 mL dengeli kristaloid (kanamada kan ürünü) bolusu uygulayın; yanıtı SVV/PPV veya PLR ile doğrulayın.',
    steps: [
      'EVLWI < 10 mL/kg PBW olduğu için akciğer parankimi sıvı yüklemesini iyi tolere eder.',
      'Her bolus sonrası atım hacmi (SV) / CI artışını ve SVV düşüşünü takip edin.',
      'GEDVI 680–800 mL/m^{2} bandına ulaştığında CI hâlâ < 3,0 ise CFI/GEF ile kontraktiliteyi değerlendirin.',
    ],
    target: 'GEDVI 680–800 · SVV < %10 · CI ≥ 3,0',
    warning:
      'Kanama veya üçüncü boşluk kaybı devam ediyorsa kaynak kontrolü ile eşzamanlı hemoglobin ve laktat izlemi şarttır.',
  },
  'low-low-svri_high': {
    code: 'V+',
    badgeLabel: 'VOLÜM (KOMPANSE VAZOKONSTRİKSİYON)',
    tone: 'sky',
    title: 'Hipovolemik / Hemorajik Şok (Refleks Vazokonstriksiyon Eşlikli)',
    action:
      'Önyükü yerine koymak için kontrollü sıvı/kan ürünü yükleyin; yüksek SVRI (> 2.400) önyük düzelince gerileyecektir.',
    steps: [
      'Yüksek SVRI düşük debiye verilen kompansatuvar sempatik yanıttır; doğrudan vazodilatör vermeyin.',
      '250–500 mL boluslarla GEDVI değerini ≥ 680 mL/m^{2} hedefine taşıyın.',
      'Önyük düzeldikten sonra düşük debi ve yüksek SVRI sürüyorsa yatak başı EKO ile tamponad/masif PE dışlayın.',
    ],
    target: 'GEDVI 680–800 · SVRI 1.700–2.400 · CI ≥ 2,8–3,0',
    warning:
      'Sıvı açığı kapatılmadan vazodilatör başlanması ani ve derin hipotansiyona yol açar.',
  },

  'low-normal-svri_low': {
    code: 'VP + Cat',
    badgeLabel: 'VAZOPRESÖR + İNOTROP',
    tone: 'rose',
    title: 'Normovolemik Septik Kardiyomyopati / Mikst Şok (Kuru Akciğer)',
    action:
      'Noradrenalin ile MAP ≥ 65 mmHg sağlayın ve CFI/GEF düşükse inotrop (dobutamin) ekleyin; rutin sıvı yüklemeyin.',
    steps: [
      'Önyük hedef aralıkta (GEDVI 680–800) olmasına rağmen hem CI düşük hem SVRI < 1.700 saptanmıştır.',
      'CFI (< 4,5 dk^{-1}) ve GEF (< %25) değerlerini doğrulayın; yatak başı EKO ile LV/RV sistolik fonksiyonunu görün.',
      'Yalnızca PLR (+) ise tek seferlik 250 mL test bolusu düşünülebilir.',
    ],
    target: 'MAP ≥ 65 mmHg · CI ≥ 2,8 · CFI ≥ 4,5',
    warning:
      'Normal GEDVI varlığında agresif sıvı yüklemesi debiyi artırmadan akciğer ödemine (EVLWI ↑) zemin hazırlar.',
    requireEcho: true,
  },
  'low-normal-svri_normal': {
    code: 'Cat / EKO!',
    badgeLabel: 'İNOTROP + ACİL EKO',
    tone: 'indigo',
    title: 'Normovolemik Pompa Yetersizliği (Kuru Akciğer)',
    action:
      'İnotropik destek (dobutamin / adrenalin / milrinon) değerlendirin ve derhal yatak başı EKO ile biventriküler fonksiyonu doğrulayın.',
    steps: [
      'CFI (< 4,5 dk^{-1}) ve GEF (< %25) düşüklüğünü kontrol edin.',
      'Önyük yeterli olduğu için rutin sıvı yüklemeyin; yalnızca PLR (+) ise sınırlı 250 mL test bolusu yapın.',
      'İzole RV yetmezliği, akut masif PE veya perikardiyal tamponadı yatak başı EKO ile mutlaka dışlayın.',
    ],
    target: 'CI ≥ 2,8 · CFI ≥ 4,5 · Laktat klirensi ↑',
    warning:
      'Masif PE veya tamponadda EVLWI yanlış düşük, SVV yanlış pozitif çıkabilir; tedavi öncesi yatak başı EKO şarttır.',
    requireEcho: true,
  },
  'low-normal-svri_high': {
    code: 'Cat / EKO!',
    badgeLabel: 'İNOTROP + ARDYÜK KONTROLÜ',
    tone: 'rose',
    title: 'Normovolemik Pompa Yetersizliği (Yüksek Ardyük · SVRI > 2.400)',
    action:
      'İnotrop (veya inodilatör: milrinon/levosimendan) başlayın; kan basıncı elveriyorsa yüksek ardyükü azaltın ve EKO yapın.',
    steps: [
      'Yüksek SVRI (> 2.400) zayıf sol ventrikül boşalmasını daha da zorlaştırır.',
      'Yatak başı EKO ile akut obstrüktif şok (masif PE / tamponad) ve kapak patolojilerini dışlayın.',
      'ScvO_{2} ve laktat takibi ile doku oksijenasyon yanıtını izleyin.',
    ],
    target: 'CI ≥ 2,8 · SVRI 1.700–2.400 · MAP ≥ 65 mmHg',
    warning:
      'Ardyük azaltımı sırasında diyastolik basınç ve koroner perfüzyon basıncı yakından izlenmelidir.',
    requireEcho: true,
  },

  'low-high-svri_low': {
    code: 'VP + Cat',
    badgeLabel: 'VAZOPRESÖR + İNOTROP · SIVI KES',
    tone: 'rose',
    title: 'Hipervolemik Mikst Şok (Pompa Yetersizliği + Vazopleji)',
    action:
      'Sıvı vermeyi kesin; noradrenalin + inotrop (dobutamin) ile perfüzyon ve debiyi düzeltin.',
    steps: [
      'GEDVI > 800 mL/m^{2} kalbin Frank-Starling eğrisinin düz bölümünde olduğunu gösterir; ek sıvı zararlıdır.',
      'Düşük SVRI (< 1.700) nedeniyle tek başına dobutamin hipotansiyonu derinleştirebilir; noradrenalinle kombine edin.',
      'Hemodinami toparlandığında EVLWI yükselmeden nötr/negatif sıvı dengesine geçin.',
    ],
    target: 'MAP ≥ 65 mmHg · CI ≥ 2,8 · GEDVI < 800',
    warning:
      'EVLWI henüz < 10 olsa bile GEDVI > 800 olduğu için verilecek ek sıvı hızla pulmoner ödeme yol açar.',
    requireEcho: true,
  },
  'low-high-svri_normal': {
    code: 'Cat / EKO!',
    badgeLabel: 'İNOTROP · SIVI KES',
    tone: 'rose',
    title: 'Kardiyojenik Şok (Yüksek Önyük · Henüz Akciğer Ödemi Yok)',
    action:
      'Sıvı yüklemesini kesin; inotropik destek başlayın ve yatak başı EKO ile altta yatan patolojiyi saptayın.',
    steps: [
      'GEDVI > 800 ve düşük CI kombinasyonunda ek sıvı debiyi artırmaz, yalnızca dolum basınçlarını yükseltir.',
      'CFI/GEF ile kontraktiliteyi izleyin; akut koroner sendrom, aritmi veya kapak/RV patolojisini hızla tedavi edin.',
      'İdrar çıkışı ve venöz konjesyon bulgularına göre erken sıvı kısıtlaması planlayın.',
    ],
    target: 'CI ≥ 2,5–2,8 · GEDVI < 800 · EVLWI < 10 korunması',
    warning:
      'Sıvı bolusu bu profilde kontrendikedir; kalp odacığı dilatasyonunda (KMP) bazal GEDVI yüksekliği EKO ile doğrulanmalıdır.',
    requireEcho: true,
  },
  'low-high-svri_high': {
    code: 'Cat / EKO!',
    badgeLabel: 'İNOTROP + ARDYÜK AZALTIMI',
    tone: 'rose',
    title: 'Kardiyojenik Şok (Yüksek Önyük + Yüksek SVRI > 2.400)',
    action:
      'Sıvı vermeyin; inotrop/inodilatör başlayın, kan basıncı elveriyorsa ardyükü azaltın ve EKO ile mekanik destek gereksinimini değerlendirin.',
    steps: [
      'GEDVI > 800 + SVRI > 2.400 kombinasyonu zayıf ventrikül üzerinde ağır mekanik yük oluşturur.',
      'Dobutamin/milrinon/levosimendan ile sistolik performansı artırın; MAP uygunsa nazik vazodilatasyon ekleyin.',
      'Refrakter düşük debide erken mekanik dolaşım desteği (IABP / Impella / VA-ECMO) kriterlerini gözden geçirin.',
    ],
    target: 'CI ≥ 2,5 · SVRI 1.700–2.400 · GEDVI < 800',
    warning:
      'Sıvı bolusu kesinlikle kontrendikedir; yüksek önyük nedeniyle akciğer ödemi gelişme eşiği çok yakındır.',
    requireEcho: true,
  },

  // CI HIGH (>= 3,0) + EVLWI < 10
  'high-low-svri_low': {
    code: 'V+ / VP',
    badgeLabel: 'KONTROLLÜ SIVI + VAZOPRESÖR',
    tone: 'amber',
    title: 'Erken Hiperdinamik Septik Şok (Vazopleji + Rölatif Hipovolemi)',
    action:
      'SVV/PPV veya PLR pozitifse 250–500 mL dengeli kristaloid yükleyin; MAP < 65 mmHg ise gecikmeden noradrenalin başlayın.',
    steps: [
      'Düşük SVRI (< 1.700) venöz kapasitansı artırarak rölatif hipovolemiye (GEDVI < 680) yol açar.',
      'Sadece sıvı ile tansiyon yükseltmeye çalışmak aşırı pozitif balansa neden olur; erken noradrenalin venöz dönüşü destekler.',
      'EVLWI < 10 sınırının korunduğunu her yükleme sonrası teyit edin.',
    ],
    target: 'MAP ≥ 65 mmHg · GEDVI 680–800 · SVV < %10',
    warning:
      'CI normal/yüksek olması doku hipoperfüzyonunu dışlamaz; laktat, idrar çıkışı ve kapiller dolumu izleyin.',
  },
  'high-low-svri_normal': {
    code: 'V+ (Seçili)',
    badgeLabel: 'KONTROLLÜ SIVI REPLASMANI',
    tone: 'sky',
    title: 'Kompanse Hipovolemi (Korunmuş Debi ve Normal Tonus)',
    action:
      'Doku hipoperfüzyonu bulgusu (laktat ↑, oligüri, taşikardi) varsa 250–500 mL kontrollü sıvı verin; yoksa idame ile izleyin.',
    steps: [
      'Hasta düşük önyükü taşikardi ve güçlü kontraktilite ile kompanse etmektedir.',
      'Dinamik test (SVV/PPV ≥ %12–13 veya PLR +) pozitifse bolus sonrası yanıtı ölçün.',
      'Perfüzyon belirteçleri normalse sadece düşük GEDVI sayısını düzeltmek için agresif yükleme yapmayın.',
    ],
    target: 'Perfüzyon normal · GEDVI 680–800 · EVLWI < 10',
    warning:
      'Hipoperfüzyon bulgusu olmadan tek başına düşük GEDVI zorunlu bolus endikasyonu değildir.',
  },
  'high-low-svri_high': {
    code: 'V+ (Seçili)',
    badgeLabel: 'KOMPANSE HİPOVOLEMİ · AĞRI/STRES',
    tone: 'sky',
    title: 'Kompanse Hipovolemi + Yüksek Sempatik Tonus (SVRI > 2.400)',
    action:
      'Analjezi/sedasyon ve sempatik deşarj nedenlerini kontrol edin; hipoperfüzyon veya PLR (+) varsa kontrollü sıvı replasmanı yapın.',
    steps: [
      'Yüksek CI + yüksek SVRI birlikteliği sıklıkla ağrı, ajitasyon, üşüme/titreme veya aşırı vazopresör dozuna bağlıdır.',
      'Vazopresör infüzyonu alıyorsa dozun azaltılabilirliğini değerlendirin.',
      'Gerçek volüm açığı PLR/SVV ile doğrulanırsa 250 mL dengeli kristaloid uygulayın.',
    ],
    target: 'SVRI 1.700–2.400 · GEDVI 680–800',
    warning:
      'Yüksek SVRI altında gereksiz vazopresör sürdürülmesi mikrosirkülasyonu ve organ perfüzyonunu bozar.',
  },

  'high-normal-svri_low': {
    code: 'VP',
    badgeLabel: 'SAF VAZOPRESÖR',
    tone: 'amber',
    title: 'Vazoplejik Şok (Normovolemik Vazodilatasyon)',
    action:
      'Noradrenalin (gerekirse vazopresin) ile SVRI ve MAP ≥ 65 mmHg hedefini sağlayın; ek sıvı vermeyin.',
    steps: [
      'CI ≥ 3,0 ve GEDVI 680–800 ile akım ve önyük yeterlidir; temel patoloji düşük SVRI (< 1.700) değeridir.',
      'Ek sıvı yüklemesi vazoplejiyi düzeltmez, yalnızca interstisyel ödeme ve EVLWI artışına yol açar.',
      'Refrakter vazoplejide vazopresin, stres doz kortikosteroid veya sekonder nedenleri değerlendirin.',
    ],
    target: 'MAP ≥ 65 mmHg · SVRI 1.700–2.400 · EVLWI < 10',
    warning:
      'Normovolemik vazoplejide hipotansiyonun tedavisi sıvı değil vazopresör titrasyonudur.',
  },
  'high-normal-svri_normal': {
    code: 'İzlem',
    badgeLabel: 'HEMODİNAMİK DENGE',
    tone: 'slate',
    title: 'Övolemik ve Dengeli Hemodinamik Profil',
    action:
      'Mevcut idame stratejisini sürdürün; ek sıvı bolusu veya yeni vazoaktif ajan gerekmez.',
    steps: [
      'CI, GEDVI, EVLWI ve SVRI parametrelerinin tamamı hedef aralıklardadır.',
      'Hasta vazoaktif destek alıyorsa kademeli azaltma (weaning) açısından değerlendirin.',
      'Laktat, idrar çıkışı ve klinik perfüzyon bulgularıyla dengenin sürdüğünü doğrulayın.',
    ],
    target: 'Mevcut dengenin korunması · Sıfır sıvı dengesi',
    warning:
      'Normal hemodinamik parametrelerde rutin veya "koruyucu" sıvı bolusu yapılmamalıdır.',
  },
  'high-normal-svri_high': {
    code: 'İzlem / Tonus ↓',
    badgeLabel: 'YÜKSEK ARDYÜK · HİPERTANSİYON',
    tone: 'slate',
    title: 'Övolemik Yüksek Ardyük / Hipertansif Profil (SVRI > 2.400)',
    action:
      'Vazopresör alıyorsa dozunu azaltın; ağrı/ajitasyonu giderin ve gerekirse antihipertansif/vazodilatör ile ardyükü optimize edin.',
    steps: [
      'Debi ve önyük normaldir; yüksek SVRI miyokard oksijen tüketimini artırır.',
      'Öncelikle reversibl nedenleri (ağrı, anksiyete, hipotermi, aşırı noradrenalin) düzeltin.',
      'Sıvı yüklemesine gerek yoktur; nötr sıvı dengesini koruyun.',
    ],
    target: 'SVRI 1.700–2.400 · Normotansif seyir',
    warning:
      'Yüksek ardyükün uzun sürmesi özellikle diyastolik disfonksiyonlu hastalarda akciğer ödemini tetikleyebilir.',
  },

  'high-high-svri_low': {
    code: 'VP + Sıvı Kes',
    badgeLabel: 'SIVI KISITLAMA + VAZOPRESÖR',
    tone: 'emerald',
    title: 'İntravasküler Hipervolemi + Eşlik Eden Vazopleji',
    action:
      'Tüm sıvı yüklemelerini durdurun; MAP < 65 mmHg ise yalnızca vazopresör (noradrenalin) kullanın ve negatif balansa hazırlanın.',
    steps: [
      'GEDVI > 800 mL/m^{2} volüm rezervinin aşıldığını gösterir; hasta sıvı yanıtsızdır.',
      'Akciğer ödemi (EVLWI ≥ 10) gelişmeden pozitif sıvı dengesini sonlandırın.',
      'Hemodinami stabilize olduğunda idrar çıkışı veya diüretikle kontrollü negatif dengeye geçin.',
    ],
    target: 'MAP ≥ 65 mmHg · GEDVI < 800 · EVLWI < 10 korunması',
    warning:
      'Hipervolemik vazoplejik hastada hipotansiyon için ek sıvı verilmesi doğrudan pulmoner ödeme yol açar.',
  },
  'high-high-svri_normal': {
    code: 'V− (Hafif)',
    badgeLabel: 'SIVI KISITLAMASI',
    tone: 'emerald',
    title: 'İntravasküler Hipervolemi (Henüz Akciğer Ödemi Yok)',
    action:
      'Gereksiz tüm sıvı infüzyonlarını kesin ve kontrollü negatif sıvı dengesine (de-resüsitasyon) geçin.',
    steps: [
      'GEDVI > 800 mL/m^{2} intravasküler fazlalığı gösterir; ek sıvı testi fizyolojik olarak anlamsızdır.',
      'İlaç infüzyonlarını konsantre ederek gizli sıvı yükünü azaltın.',
      'CI iyi olduğu için spontan negatif balans veya düşük doz diüretik genellikle iyi tolere edilir.',
    ],
    target: 'GEDVI 680–800 · EVLWI < 10 korunması',
    warning:
      'Bu aşamada pozitif sıvı dengesinin sürmesi doğrudan EVLWI yükselmesine neden olur.',
  },
  'high-high-svri_high': {
    code: 'V− + Ardyük ↓',
    badgeLabel: 'NEGATİF BALANS + ARDYÜK KONTROLÜ',
    tone: 'emerald',
    title: 'Hipervolemi + Yüksek Sistemik Direnç (SVRI > 2.400)',
    action:
      'Sıvı kısıtlaması + diüretik ile volümü azaltın; hipertansiyon/yüksek SVRI sürüyorsa vazodilatör değerlendirin.',
    steps: [
      'Hem önyük (GEDVI > 800) hem ardyük (SVRI > 2.400) artmıştır; akciğer ödemi gelişmeden müdahale edin.',
      'Vazopresör infüzyonu varsa derhal azaltın/sonlandırın.',
      'Diüretik yanıtını saatlik negatif balans ve GEDVI düşüşü ile izleyin.',
    ],
    target: 'GEDVI 680–800 · SVRI 1.700–2.400 · EVLWI < 10',
    warning:
      'Yüksek önyük + yüksek ardyük birlikteliği ani flash pulmoner ödem için yüksek risk taşır.',
  },
};

const WET_SCENARIOS: Record<`${CiState}-${GedviState}-${WetMechState}`, TreeScenario> = {
  // CI LOW (< 3,0) + EVLWI >= 10
  'low-low-pvpi_hydro': {
    code: 'V+! / Cat',
    badgeLabel: 'KISITLI MİNİ BOLUS + İNOTROP',
    tone: 'amber',
    title: 'İntravasküler Hipovolemi + Eşlik Eden Hidrostatik Ödem (PVPI < 3,0)',
    action:
      'Sıvı toleransı sınırdadır: Yalnızca PLR (+) ise 100–250 mL mini test bolusu uygulayın; EVLWI artıyorsa sıvıyı hemen durdurup inotrop/vazopresöre geçin.',
    steps: [
      'GEDVI < 680 olsa da EVLWI ≥ 10 mL/kg PBW olduğu için agresif 500 mL yüklemeden kaçının.',
      'CFI (< 4,5 dk^{-1}) ve GEF (< %25) ile gizli pompa disfonksiyonunu dışlayın; yatak başı EKO yapın.',
      'MAP < 65 mmHg ise erken noradrenalin ile koroner perfüzyonu koruyun.',
    ],
    target: 'CI ≥ 2,5–2,8 sağlanınca sıvıyı durdur · EVLWI artışını engelle',
    warning:
      'Bu tablo sıklıkla aşırı diürez sonrası kalp yetmezliğinde veya düşük onkotik basınçta görülür.',
    requireEcho: true,
  },
  'low-low-pvpi_perm': {
    code: 'V+! / VP',
    badgeLabel: 'ÇOK DİKKATLİ MİNİ BOLUS · ARDS',
    tone: 'amber',
    title: 'Hipovolemi + ARDS / Kapiller Kaçak (PVPI ≥ 3,0)',
    action:
      'Yalnızca dinamik test (PLR/SVV) pozitifse 100–250 mL titre mini bolus (veya hiperonkotik albümin) uygulayın; erken vazopresör/inotrop desteğini geciktirmeyin.',
    steps: [
      'PVPI ≥ 3,0 alveolokapiller bariyer hasarını gösterir; verilen kristalloidin akciğere kaçma riski çok yüksektir.',
      'CI artmıyor veya EVLWI > 2 mL/kg yükseliyorsa sıvı yüklemesini derhal sonlandırın.',
      'Akciğer koruyucu mekanik ventilasyon (Vt 6 mL/kg PBW, uygun PEEP) uygulayın.',
    ],
    target: 'Minimum sıvı ile CI ≥ 2,5 · PaO_{2}/FiO_{2} korunması',
    warning:
      'EVLWI mutlaka Öngörülen Vücut Ağırlığı (PBW) üzerinden hesaplanmalıdır; obez hastalarda gerçek kilo ödemi gizler.',
  },

  'low-normal-pvpi_hydro': {
    code: 'Cat + V−',
    badgeLabel: 'İNOTROP + DEKONJESYON',
    tone: 'rose',
    title: 'Akut Sol Ventrikül Disfonksiyonu + Hidrostatik Ödem (PVPI < 3,0)',
    action:
      'Sıvı vermeyin; inotropik destek (dobutamin / levosimendan) ile debiyi artırın ve hemodinami elverince kontrollü negatif balans (diüretik) sağlayın.',
    steps: [
      'EVLWI ≥ 10 ve PVPI < 3,0 basınç kaynaklı (hidrostatik) pulmoner ödemi doğrular.',
      'CFI/GEF düşüklüğünü yatak başı EKO ile korele edin; MAP uygunsa nazik ardyük azaltımı ekleyin.',
      'Perfüzyon stabilize olur olmaz kıvrım diüretiği infüzyonu ile EVLWI değerini < 10 hedefine indirin.',
    ],
    target: 'CI ≥ 2,5–2,8 · EVLWI < 10 · Laktat ↓',
    warning:
      'MAP < 65 mmHg iken agresif diürez böbrek perfüzyonunu bozar; önce inotrop/vazopresörle perfüzyonu güvenceye alın.',
    requireEcho: true,
  },
  'low-normal-pvpi_perm': {
    code: 'Cat + Konservatif',
    badgeLabel: 'İNOTROP + KONSERVATİF SIVI',
    tone: 'rose',
    title: 'Septik Kardiyomyopati + ARDS / Permeabilite Ödemi (PVPI ≥ 3,0)',
    action:
      'Sıvı yüklemesinden kaçının; inotrop (dobutamin) + gerekirse noradrenalin ile perfüzyonu koruyun ve akciğer koruyucu ventilasyon uygulayın.',
    steps: [
      'Sepsiste miyokard depresyonu (düşük CI/CFI/GEF) ile alveolo-kapiller kaçak (PVPI ≥ 3,0) bir arada bulunur.',
      'Noradrenalin + dobutamin kombinasyonu ile MAP ≥ 65 ve CI ≥ 2,5–2,8 hedeflerini sağlayın.',
      'Sıvı balansını nötr/negatif tutarak EVLWI artışını sınırlayın; sepsis kaynağını hızla kontrol edin.',
    ],
    target: 'MAP ≥ 65 · CI ≥ 2,5 · Sıvı dengesi ≤ 0',
    warning:
      'PVPI ≥ 3,0 varlığında verilen her fazla kristalloid alveoler ödemi ve hipoksemiyi ağırlaştırır.',
    requireEcho: true,
  },

  'low-high-pvpi_hydro': {
    code: 'Cat + V−',
    badgeLabel: 'İNOTROP + AKTİF DEKONJESYON',
    tone: 'rose',
    title: 'Dekompanse Kardiyojenik Şok + Hidrostatik Pulmoner Ödem',
    action:
      'Sıvı KESİNLİKLE vermeyin; inotrop başlayın ve IV diüretik veya CRRT ultrafiltrasyon ile aktif negatif sıvı dengesi sağlayın.',
    steps: [
      'Klasik "ıslak ve soğuk" kardiyojenik şok profilidir (CI ↓, GEDVI > 800, EVLWI ≥ 10, PVPI < 3,0).',
      'Dobutamin / levosimendan / milrinon ile debiyi artırırken diüretik veya ultrafiltrasyonla volüm boşaltın.',
      'Refrakter olgularda erken mekanik dolaşım desteği (IABP / Impella / VA-ECMO) ve yatak başı EKO değerlendirin.',
    ],
    target: 'EVLWI < 10 · GEDVI < 800 · CI > 2,5',
    warning:
      'Diüretiğe dirençli konjestif kardiyojenik şokta ultrafiltrasyon (CRRT) geciktirilmemelidir.',
    requireEcho: true,
  },
  'low-high-pvpi_perm': {
    code: 'Cat + V−',
    badgeLabel: 'İNOTROP + AKTİF NEGATİF BALANS',
    tone: 'rose',
    title: 'Mikst Şok: Kardiyojenik Disfonksiyon + Permeabilite Ödemi (PVPI ≥ 3,0)',
    action:
      'Sıvı vermeyin; inotrop + vazopresör altında kontrollü negatif sıvı dengesi (sürekli diüretik/CRRT) ve ARDS ventilasyonu uygulayın.',
    steps: [
      'Hem dolum volümleri yüksek (GEDVI > 800) hem de kapiller kaçak (PVPI ≥ 3,0) mevcuttur.',
      'Noradrenalin + dobutamin desteğiyle perfüzyonu korurken saatlik kontrollü sıvı çekimi planlayın.',
      'Akciğer koruyucu ventilasyon (Vt 6 mL/kg PBW, PEEP titrasyonu, gerekirse pron) uygulayın.',
    ],
    target: 'EVLWI < 10 · GEDVI < 800 · PaO_{2}/FiO_{2} ↑',
    warning:
      'Hemodinamik instabilite nedeniyle yüksek doz bolus diüretik yerine yavaş infüzyon veya CRRT tercih edilmelidir.',
    requireEcho: true,
  },

  // CI HIGH (>= 3,0) + EVLWI >= 10
  'high-low-pvpi_hydro': {
    code: 'VP + V+!',
    badgeLabel: 'VAZOPRESÖR + KISITLI SIVI',
    tone: 'amber',
    title: 'İntravasküler Açık + Eşlik Eden Hidrostatik Akciğer Ödemi',
    action:
      'Hipotansiyon varsa önce noradrenalin ile MAP sağlayın; sıvıyı yalnızca PLR (+) ise 100–250 mL mini bolusla sınırlayın.',
    steps: [
      'Noradrenalin venöz kapasitans damarlarını daraltarak oto-transfüzyon etkisiyle GEDVI değerini yükseltebilir.',
      'EVLWI ≥ 10 olduğu için yüksek hacimli kristaloid yüklemesinden kesin kaçının.',
      'Hemodinami stabilize olunca rezidüel akciğer suyu için hafif negatif balans planlayın.',
    ],
    target: 'MAP ≥ 65 mmHg · EVLWI < 10’a gerileme',
    warning:
      'Yüksek EVLWI varlığında sadece sıvı vererek tansiyon yükseltmeye çalışmak ağır pulmoner ödemle sonuçlanır.',
  },
  'high-low-pvpi_perm': {
    code: 'VP + Akciğer Koru',
    badgeLabel: 'VAZOPRESÖR ÖNCELİKLİ · ARDS',
    tone: 'amber',
    title: 'Septik Şok + ARDS (Kapiller Kaçak ve Rölatif Hipovolemi)',
    action:
      'Erken noradrenalin başlayın; sıvıyı sadece dinamik test pozitif ve hipoperfüzyon belirginse küçük boluslarla (100–250 mL) verin.',
    steps: [
      'PVPI ≥ 3,0 nedeniyle damar içi sıvı hızla interstisyum ve alveollere kaçmaktadır.',
      'Erken vazopresör ile perfüzyon basıncını sağlamak toplam sıvı ihtiyacını belirgin azaltır.',
      'Her sıvı denemesi sonrası EVLWI ve PaO_{2}/FiO_{2} yanıtını kontrol edin; yanıt yoksa durun.',
    ],
    target: 'MAP ≥ 65 · Minimum pozitif balans · PaO_{2}/FiO_{2} ↑',
    warning:
      'ARDS + sepsis profilinde agresif sıvı resüsitasyonu mekanik ventilasyon süresini ve mortaliteyi artırır.',
  },

  'high-normal-pvpi_hydro': {
    code: 'V−',
    badgeLabel: 'HAFİF NEGATİF BALANS',
    tone: 'emerald',
    title: 'Rezidüel Hidrostatik Ödem / Diyastolik Kompliyans Azalması',
    action:
      'Sıvı kısıtlaması ve düşük doz diüretik ile EVLWI < 10 mL/kg PBW hedefine inin.',
    steps: [
      'Debi ve önyük normal olmasına rağmen akciğer suyu yüksektir (PVPI < 3,0).',
      'İdame sıvıları azaltın ve pozitif sıvı dengesini sonlandırın.',
      'Diürez sırasında GEDVI değerinin 680 mL/m^{2} altına düşmemesini ve CI korunmasını izleyin.',
    ],
    target: 'EVLWI < 10 · GEDVI 680–800 korunması',
    warning:
      'Aşırı hızlı diürez intravasküler hipovolemi oluşturursa kardiyak indeks düşebilir.',
  },
  'high-normal-pvpi_perm': {
    code: 'V− / Akciğer Koru',
    badgeLabel: 'KONSERVATİF SIVI · ARDS',
    tone: 'emerald',
    title: 'Normovolemik ARDS / Permeabilite Akciğer Ödemi (PVPI ≥ 3,0)',
    action:
      'Konservatif/negatif sıvı stratejisi (FACTT yaklaşımı) ve akciğer koruyucu ventilasyon uygulayın.',
    steps: [
      'EVLWI ≥ 10 ve PVPI ≥ 3,0 baskın alveolo-kapiller permeabilite ödemini doğrular.',
      'İdame sıvıları kısıtlayın, ilaç infüzyonlarını yoğunlaştırın ve hemodinami elveriyorsa negatif balans hedefleyin.',
      'Düşük tidal volüm (6 mL/kg PBW), uygun PEEP, gerekirse pron pozisyon ve kaynak kontrolüne odaklanın.',
    ],
    target: 'EVLWI < 10 · Sıvı dengesi ≤ 0 · PaO_{2}/FiO_{2} ↑',
    warning:
      'ARDS hastalarında normal GEDVI varlığında bile nötr/negatif sıvı dengesi ventilatörsüz gün sayısını artırır.',
  },

  'high-high-pvpi_hydro': {
    code: 'V−',
    badgeLabel: 'AKTİF NEGATİF BALANS',
    tone: 'emerald',
    title: 'Volüm Yüklenmesi (Hipervolemik Hidrostatik Pulmoner Ödem)',
    action:
      'Ek sıvıyı kesin; kıvrım diüretiği veya CRRT ultrafiltrasyon ile aktif negatif sıvı dengesi (de-resüsitasyon) sağlayın.',
    steps: [
      'CI korunmuş, GEDVI > 800 ve EVLWI ≥ 10 (PVPI < 3,0) klasik iyatrojenik veya renal sıvı yüklenmesidir.',
      'Saatlik net negatif balans hedefi belirleyin; elektrolit ve böbrek fonksiyonlarını izleyin.',
      'Oligürik/anürik hastada erken ultrafiltrasyon (CRRT) ile EVLWI ve GEDVI değerlerini düşürün.',
    ],
    target: 'EVLWI < 10 · GEDVI 680–800 · Sıvı dengesi < 0',
    warning:
      'De-resüsitasyon sırasında seri GEDVI ve PLR kontrolü ile aşırı dehidratasyondan kaçının.',
  },
  'high-high-pvpi_perm': {
    code: 'V− / VP',
    badgeLabel: 'DE-RESÜSİTASYON + ARDS',
    tone: 'emerald',
    title: 'Hipervolemi + ARDS / Kapiller Kaçak (Komplike Pulmoner Ödem)',
    action:
      'Ek sıvıyı kesin ve aktif negatif balans (diüretik / CRRT) uygulayın; tansiyon düşerse noradrenalin desteği altında sıvı çekmeye devam edin.',
    steps: [
      'Hem hidrostatik aşırı yük (GEDVI > 800) hem de alveolo-kapiller kaçak (PVPI ≥ 3,0) bir aradadır.',
      'İntravasküler dolum basıncını düşürmek kapiller kaçak varlığında dahi alveoler ödemi belirgin azaltır.',
      'Akciğer koruyucu ventilasyon ve PEEP titrasyonunu sürdürün.',
    ],
    target: 'EVLWI < 10 · GEDVI < 800 · PaO_{2}/FiO_{2} ↑',
    warning:
      'Bu profilde pozitif sıvı dengesinin sürmesi yoğun bakım mortalitesi ile güçlü biçimde ilişkilidir.',
  },
};

function toneBadgeClasses(tone: Tone, isDark: boolean): string {
  switch (tone) {
    case 'sky':
      return isDark
        ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
        : 'bg-sky-50 text-sky-700 border-sky-200';
    case 'amber':
      return isDark
        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        : 'bg-amber-50 text-amber-800 border-amber-200';
    case 'rose':
      return isDark
        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
        : 'bg-rose-50 text-rose-700 border-rose-200';
    case 'emerald':
      return isDark
        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        : 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'indigo':
      return isDark
        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
        : 'bg-indigo-50 text-indigo-700 border-indigo-200';
    default:
      return isDark
        ? 'bg-slate-800 text-slate-300 border-slate-700'
        : 'bg-slate-100 text-slate-700 border-slate-300';
  }
}

function toneBorderLeftClass(tone: Tone): string {
  switch (tone) {
    case 'sky':
      return 'border-l-sky-500';
    case 'amber':
      return 'border-l-amber-500';
    case 'rose':
      return 'border-l-rose-500';
    case 'emerald':
      return 'border-l-emerald-500';
    case 'indigo':
      return 'border-l-indigo-500';
    default:
      return 'border-l-slate-500';
  }
}

export const TptdInteractiveDecisionTree: React.FC<TptdInteractiveDecisionTreeProps> = ({
  isDark,
}) => {
  const [ci, setCi] = useState<CiState>('low');
  const [gedvi, setGedvi] = useState<GedviState>('low');
  const [evlwi, setEvlwi] = useState<EvlwiState>('low');
  const [dryMech, setDryMech] = useState<DryMechState>('svri_normal');
  const [wetMech, setWetMech] = useState<WetMechState>('pvpi_hydro');
  const [wetVasoplegia, setWetVasoplegia] = useState<boolean>(false);

  // Optional numeric entry panel
  const [showNumeric, setShowNumeric] = useState<boolean>(false);
  const [numCi, setNumCi] = useState<string>('');
  const [numGedvi, setNumGedvi] = useState<string>('');
  const [numEvlwi, setNumEvlwi] = useState<string>('');
  const [numPvpi, setNumPvpi] = useState<string>('');
  const [numSvri, setNumSvri] = useState<string>('');

  // SVG connectors measurement refs
  const stageRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [curves, setCurves] = useState<CurveSpec[]>([]);

  const setNodeRef = useCallback((id: string) => {
    return (el: HTMLButtonElement | null) => {
      nodeRefs.current[id] = el;
    };
  }, []);

  const activeMechId = evlwi === 'high' ? `node-mech-${wetMech}` : `node-mech-${dryMech}`;

  const computeCurves = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();
    if (stageRect.width === 0 || stageRect.height === 0) return;

    const cols: string[][] = [
      ['node-ci-low', 'node-ci-high'],
      ['node-gedvi-low', 'node-gedvi-normal', 'node-gedvi-high'],
      ['node-evlwi-low', 'node-evlwi-high'],
      evlwi === 'high'
        ? ['node-mech-pvpi_hydro', 'node-mech-pvpi_perm']
        : ['node-mech-svri_low', 'node-mech-svri_normal', 'node-mech-svri_high'],
    ];

    const activePairs: [string, string][] = [
      [`node-ci-${ci}`, `node-gedvi-${gedvi}`],
      [`node-gedvi-${gedvi}`, `node-evlwi-${evlwi}`],
      [`node-evlwi-${evlwi}`, activeMechId],
    ];

    const nextCurves: CurveSpec[] = [];

    const buildPath = (srcId: string, dstId: string): string | null => {
      const src = nodeRefs.current[srcId];
      const dst = nodeRefs.current[dstId];
      if (!src || !dst) return null;
      const sRect = src.getBoundingClientRect();
      const dRect = dst.getBoundingClientRect();
      const x1 = sRect.right - stageRect.left;
      const y1 = sRect.top + sRect.height / 2 - stageRect.top;
      const x2 = dRect.left - stageRect.left;
      const y2 = dRect.top + dRect.height / 2 - stageRect.top;
      const cx = (x1 + x2) / 2;
      return `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
    };

    // Passive curves first
    for (let c = 0; c < cols.length - 1; c++) {
      for (const srcId of cols[c]) {
        for (const dstId of cols[c + 1]) {
          const isActive = activePairs.some(([s, d]) => s === srcId && d === dstId);
          if (!isActive) {
            const d = buildPath(srcId, dstId);
            if (d) {
              nextCurves.push({ id: `${srcId}-${dstId}`, d, active: false });
            }
          }
        }
      }
    }

    // Active curves on top
    for (const [srcId, dstId] of activePairs) {
      const d = buildPath(srcId, dstId);
      if (d) {
        nextCurves.push({ id: `active-${srcId}-${dstId}`, d, active: true });
      }
    }

    setCurves(nextCurves);
  }, [ci, gedvi, evlwi, activeMechId]);

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(computeCurves);
    const stage = stageRef.current;
    let observer: ResizeObserver | null = null;
    if (stage && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        requestAnimationFrame(computeCurves);
      });
      observer.observe(stage);
    }
    window.addEventListener('resize', computeCurves);
    return () => {
      cancelAnimationFrame(raf);
      if (observer) observer.disconnect();
      window.removeEventListener('resize', computeCurves);
    };
  }, [computeCurves]);

  const scenario = useMemo(() => {
    if (evlwi === 'high') {
      const base = WET_SCENARIOS[`${ci}-${gedvi}-${wetMech}`];
      if (!wetVasoplegia) return base;
      const hasVp = base.code.includes('VP');
      return {
        ...base,
        code: hasVp ? base.code : `${base.code} + VP`,
        action: `${base.action} Eşlik eden vazopleji (SVRI < 1.700) nedeniyle MAP ≥ 65 mmHg hedefi için Noradrenalin titre edin.`,
        steps: [
          ...base.steps,
          'SVRI < 1.700 varlığında hipotansiyonu sıvı ile değil Noradrenalin (gerekirse Vazopresin) ile düzeltin.',
        ],
      };
    }
    return DRY_SCENARIOS[`${ci}-${gedvi}-${dryMech}`];
  }, [ci, gedvi, evlwi, dryMech, wetMech, wetVasoplegia]);

  const applyNumericValues = () => {
    const pCi = parseFloat(numCi.replace(',', '.'));
    const pGedvi = parseFloat(numGedvi.replace(',', '.'));
    const pEvlwi = parseFloat(numEvlwi.replace(',', '.'));
    const pPvpi = parseFloat(numPvpi.replace(',', '.'));
    const pSvri = parseFloat(numSvri.replace(',', '.'));

    let nextEvlwi: EvlwiState = evlwi;
    if (!Number.isNaN(pCi)) setCi(pCi < 3.0 ? 'low' : 'high');
    if (!Number.isNaN(pGedvi)) {
      setGedvi(pGedvi < 680 ? 'low' : pGedvi <= 800 ? 'normal' : 'high');
    }
    if (!Number.isNaN(pEvlwi)) {
      nextEvlwi = pEvlwi < 10 ? 'low' : 'high';
      setEvlwi(nextEvlwi);
    }
    if (!Number.isNaN(pPvpi)) {
      setWetMech(pPvpi < 3.0 ? 'pvpi_hydro' : 'pvpi_perm');
    }
    if (!Number.isNaN(pSvri)) {
      setDryMech(pSvri < 1700 ? 'svri_low' : pSvri <= 2400 ? 'svri_normal' : 'svri_high');
      setWetVasoplegia(pSvri < 1700);
    }
  };

  const resetAll = () => {
    setCi('low');
    setGedvi('low');
    setEvlwi('low');
    setDryMech('svri_normal');
    setWetMech('pvpi_hydro');
    setWetVasoplegia(false);
    setNumCi('');
    setNumGedvi('');
    setNumEvlwi('');
    setNumPvpi('');
    setNumSvri('');
  };

  const pathPills = useMemo(() => {
    const ciText = ci === 'low' ? 'CI < 3,0' : 'CI ≥ 3,0';
    const gedviText =
      gedvi === 'low' ? 'GEDVI < 680' : gedvi === 'normal' ? 'GEDVI 680–800' : 'GEDVI > 800';
    const evlwiText = evlwi === 'low' ? 'EVLWI < 10' : 'EVLWI ≥ 10';
    const mechText =
      evlwi === 'high'
        ? wetMech === 'pvpi_hydro'
          ? 'PVPI < 3,0 (Hidrostatik)'
          : 'PVPI ≥ 3,0 (Permeabilite)'
        : dryMech === 'svri_low'
          ? 'SVRI < 1.700'
          : dryMech === 'svri_normal'
            ? 'SVRI 1.700–2.400'
            : 'SVRI > 2.400';

    const list = [ciText, gedviText, evlwiText, mechText];
    if (evlwi === 'high' && wetVasoplegia) {
      list.push('SVRI < 1.700 (Vazopleji)');
    }
    return list;
  }, [ci, gedvi, evlwi, dryMech, wetMech, wetVasoplegia]);

  const segWrapCls = `flex p-1 rounded-lg border gap-1 ${
    isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100/80 border-slate-200'
  }`;

  const segBtnCls = (active: boolean) =>
    `flex-1 px-2 py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer text-center ${
      active
        ? 'bg-cyan-600 text-white shadow-sm'
        : isDark
          ? 'text-slate-400 hover:text-slate-200'
          : 'text-slate-600 hover:text-slate-900'
    }`;

  const nodeCardCls = (active: boolean) =>
    `w-full text-left rounded-xl border-2 p-2.5 transition-all cursor-pointer ${
      active
        ? isDark
          ? 'bg-cyan-950/60 border-cyan-400 opacity-100 shadow-md shadow-cyan-950/50'
          : 'bg-cyan-50/90 border-cyan-500 opacity-100 shadow-sm'
        : isDark
          ? 'bg-slate-900/70 border-slate-800 opacity-55 hover:opacity-90 hover:border-slate-600'
          : 'bg-white border-slate-200 opacity-55 hover:opacity-95 hover:border-slate-300'
    }`;

  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 space-y-4 ${
        isDark ? 'bg-slate-950/75 border-slate-800' : 'bg-slate-50/70 border-slate-200'
      }`}
    >
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400">
            <GitBranch className="w-4 h-4" />
            <span>Etkileşimli Görsel Karar Ağacı (30 Klinik Senaryo)</span>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Yukarıdaki basamaklardan, doğrudan ağaç düğümlerinden veya sayısal değer girişinden seçim yapın; aktif yol ve yatak başı protokol anında güncellenir.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowNumeric((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              showNumeric
                ? 'bg-cyan-600 border-cyan-600 text-white'
                : isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-200 hover:border-cyan-500'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-cyan-500'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Sayısal Değer Gir</span>
          </button>

          <button
            type="button"
            onClick={resetAll}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {/* Segmented Control Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            <span>1. Kardiyak İndeks (CI)</span>
            <span className="font-mono normal-case">
              <MedicalText text="L/dk/m^{2}" />
            </span>
          </div>
          <div className={segWrapCls}>
            <button type="button" onClick={() => setCi('low')} className={segBtnCls(ci === 'low')}>
              &lt; 3,0 (Düşük)
            </button>
            <button type="button" onClick={() => setCi('high')} className={segBtnCls(ci === 'high')}>
              ≥ 3,0 (Normal/Yüksek)
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            <span>2. Önyük (GEDVI)</span>
            <span className="font-mono normal-case">
              <MedicalText text="mL/m^{2}" />
            </span>
          </div>
          <div className={segWrapCls}>
            <button type="button" onClick={() => setGedvi('low')} className={segBtnCls(gedvi === 'low')}>
              &lt; 680
            </button>
            <button type="button" onClick={() => setGedvi('normal')} className={segBtnCls(gedvi === 'normal')}>
              680–800
            </button>
            <button type="button" onClick={() => setGedvi('high')} className={segBtnCls(gedvi === 'high')}>
              &gt; 800
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            <span>3. Akciğer Suyu (EVLWI)</span>
            <span className="font-mono normal-case">mL/kg PBW</span>
          </div>
          <div className={segWrapCls}>
            <button type="button" onClick={() => setEvlwi('low')} className={segBtnCls(evlwi === 'low')}>
              &lt; 10 (Ödem Yok)
            </button>
            <button type="button" onClick={() => setEvlwi('high')} className={segBtnCls(evlwi === 'high')}>
              ≥ 10 (Ödem Var)
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            <span>{evlwi === 'high' ? '4. Permeabilite (PVPI)' : '4. Direnç / Tonus (SVRI)'}</span>
            <span className="font-mono normal-case">
              {evlwi === 'high' ? 'oran' : <MedicalText text="dyn·s·cm^{-5}·m^{2}" />}
            </span>
          </div>
          {evlwi === 'high' ? (
            <div className="space-y-1.5">
              <div className={segWrapCls}>
                <button
                  type="button"
                  onClick={() => setWetMech('pvpi_hydro')}
                  className={segBtnCls(wetMech === 'pvpi_hydro')}
                >
                  PVPI &lt; 3,0 (Hidro.)
                </button>
                <button
                  type="button"
                  onClick={() => setWetMech('pvpi_perm')}
                  className={segBtnCls(wetMech === 'pvpi_perm')}
                >
                  PVPI ≥ 3,0 (ARDS)
                </button>
              </div>
              <label
                className={`flex items-center gap-2 text-[11px] font-medium cursor-pointer select-none px-1 ${
                  isDark ? 'text-amber-300' : 'text-amber-800'
                }`}
              >
                <input
                  type="checkbox"
                  checked={wetVasoplegia}
                  onChange={(e) => setWetVasoplegia(e.target.checked)}
                  className="accent-amber-500 rounded cursor-pointer"
                />
                <span>Eşlik eden vazopleji var (SVRI &lt; 1.700 / MAP &lt; 65)</span>
              </label>
            </div>
          ) : (
            <div className={segWrapCls}>
              <button
                type="button"
                onClick={() => setDryMech('svri_low')}
                className={segBtnCls(dryMech === 'svri_low')}
              >
                &lt; 1.700
              </button>
              <button
                type="button"
                onClick={() => setDryMech('svri_normal')}
                className={segBtnCls(dryMech === 'svri_normal')}
              >
                1.700–2.400
              </button>
              <button
                type="button"
                onClick={() => setDryMech('svri_high')}
                className={segBtnCls(dryMech === 'svri_high')}
              >
                &gt; 2.400
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Optional Numeric Input Drawer */}
      {showNumeric && (
        <div
          className={`rounded-xl border border-dashed p-3.5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-end ${
            isDark ? 'bg-slate-900/70 border-slate-700' : 'bg-white border-slate-300'
          }`}
        >
          {[
            { id: 'tptd-in-ci', label: 'CI (L/dk/m²)', placeholder: 'Örn: 2.4', val: numCi, set: setNumCi, step: '0.1' },
            { id: 'tptd-in-gedvi', label: 'GEDVI (mL/m²)', placeholder: 'Örn: 610', val: numGedvi, set: setNumGedvi, step: '10' },
            { id: 'tptd-in-evlwi', label: 'EVLWI (mL/kg)', placeholder: 'Örn: 8.5', val: numEvlwi, set: setNumEvlwi, step: '0.5' },
            { id: 'tptd-in-pvpi', label: 'PVPI', placeholder: 'Örn: 2.2', val: numPvpi, set: setNumPvpi, step: '0.1' },
            { id: 'tptd-in-svri', label: 'SVRI', placeholder: 'Örn: 1550', val: numSvri, set: setNumSvri, step: '50' },
          ].map((field) => (
            <div key={field.id} className="space-y-1">
              <label
                htmlFor={field.id}
                className={`block text-[11px] font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
              >
                {field.label}
              </label>
              <input
                id={field.id}
                type="number"
                step={field.step}
                value={field.val}
                onChange={(e) => field.set(e.target.value)}
                placeholder={field.placeholder}
                className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-mono font-semibold focus:outline-none focus:border-cyan-500 ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 text-white placeholder:text-slate-600'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                }`}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={applyNumericValues}
            className="w-full py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Değerleri Uygula
          </button>
        </div>
      )}

      {/* Main Split: Visual Interactive Tree + Bedside Decision Card */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* Interactive 4-Column SVG Tree */}
        <div
          className={`xl:col-span-7 rounded-xl border p-3.5 overflow-x-auto ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Karar Akışı Haritası
            </span>
            <span className="text-[11px] text-slate-400">
              Düğümlere tıklayarak yolu değiştirebilirsiniz
            </span>
          </div>

          <div
            ref={stageRef}
            className="relative min-w-[620px] grid grid-cols-4 gap-5 py-1"
          >
            {/* SVG Connectors */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              aria-hidden="true"
            >
              {curves.map((curve) => (
                <path
                  key={curve.id}
                  d={curve.d}
                  fill="none"
                  stroke={
                    curve.active
                      ? isDark
                        ? '#22d3ee'
                        : '#0891b2'
                      : isDark
                        ? '#334155'
                        : '#cbd5e1'
                  }
                  strokeWidth={curve.active ? 3 : 1.4}
                  strokeOpacity={curve.active ? 1 : 0.5}
                />
              ))}
            </svg>

            {/* Col 1: CI */}
            <div className="relative z-10 flex flex-col justify-around gap-3">
              <div
                className={`text-center text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-400'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                1. Perfüzyon (CI)
              </div>
              <button
                ref={setNodeRef('node-ci-low')}
                type="button"
                onClick={() => setCi('low')}
                className={nodeCardCls(ci === 'low')}
              >
                <div className="text-[10px] font-bold uppercase text-cyan-600 dark:text-cyan-400">
                  Düşük Debi
                </div>
                <div className={`text-xs font-mono font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  CI &lt; 3,0
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Hipoperfüzyon riski</div>
              </button>

              <button
                ref={setNodeRef('node-ci-high')}
                type="button"
                onClick={() => setCi('high')}
                className={nodeCardCls(ci === 'high')}
              >
                <div className="text-[10px] font-bold uppercase text-cyan-600 dark:text-cyan-400">
                  Yeterli / Yüksek
                </div>
                <div className={`text-xs font-mono font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  CI ≥ 3,0
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Normal / hiperdinamik</div>
              </button>
            </div>

            {/* Col 2: GEDVI */}
            <div className="relative z-10 flex flex-col justify-around gap-2.5">
              <div
                className={`text-center text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-400'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                2. Önyük (GEDVI)
              </div>
              <button
                ref={setNodeRef('node-gedvi-low')}
                type="button"
                onClick={() => setGedvi('low')}
                className={nodeCardCls(gedvi === 'low')}
              >
                <div className="text-[10px] font-bold uppercase text-cyan-600 dark:text-cyan-400">
                  Düşük Önyük
                </div>
                <div className={`text-xs font-mono font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  &lt; 680 <span className="text-[10px] font-normal">mL/m²</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Volümetrik dolum ↓</div>
              </button>

              <button
                ref={setNodeRef('node-gedvi-normal')}
                type="button"
                onClick={() => setGedvi('normal')}
                className={nodeCardCls(gedvi === 'normal')}
              >
                <div className="text-[10px] font-bold uppercase text-cyan-600 dark:text-cyan-400">
                  Normal Önyük
                </div>
                <div className={`text-xs font-mono font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  680–800
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Hedef aralıkta</div>
              </button>

              <button
                ref={setNodeRef('node-gedvi-high')}
                type="button"
                onClick={() => setGedvi('high')}
                className={nodeCardCls(gedvi === 'high')}
              >
                <div className="text-[10px] font-bold uppercase text-cyan-600 dark:text-cyan-400">
                  Yüksek Önyük
                </div>
                <div className={`text-xs font-mono font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  &gt; 800 <span className="text-[10px] font-normal">mL/m²</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Volüm fazlası / dilatasyon</div>
              </button>
            </div>

            {/* Col 3: EVLWI */}
            <div className="relative z-10 flex flex-col justify-around gap-3">
              <div
                className={`text-center text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-400'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                3. Akciğer (EVLWI)
              </div>
              <button
                ref={setNodeRef('node-evlwi-low')}
                type="button"
                onClick={() => setEvlwi('low')}
                className={nodeCardCls(evlwi === 'low')}
              >
                <div className="text-[10px] font-bold uppercase text-cyan-600 dark:text-cyan-400">
                  Kuru / Sınırda
                </div>
                <div className={`text-xs font-mono font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  EVLWI &lt; 10
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Sıvı toleransı mevcut</div>
              </button>

              <button
                ref={setNodeRef('node-evlwi-high')}
                type="button"
                onClick={() => setEvlwi('high')}
                className={nodeCardCls(evlwi === 'high')}
              >
                <div className="text-[10px] font-bold uppercase text-cyan-600 dark:text-cyan-400">
                  Pulmoner Ödem
                </div>
                <div className={`text-xs font-mono font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  EVLWI ≥ 10
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Belirgin akciğer suyu</div>
              </button>
            </div>

            {/* Col 4: Mechanism (PVPI when wet, SVRI 3-tier when dry) */}
            <div className="relative z-10 flex flex-col justify-around gap-2.5">
              <div
                className={`text-center text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-400'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                {evlwi === 'high' ? '4. Ödem Tipi (PVPI)' : '4. Direnç (SVRI)'}
              </div>

              {evlwi === 'high' ? (
                <>
                  <button
                    ref={setNodeRef('node-mech-pvpi_hydro')}
                    type="button"
                    onClick={() => setWetMech('pvpi_hydro')}
                    className={nodeCardCls(wetMech === 'pvpi_hydro')}
                  >
                    <div className="text-[10px] font-bold uppercase text-cyan-600 dark:text-cyan-400">
                      Hidrostatik Ödem
                    </div>
                    <div className={`text-xs font-mono font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      PVPI &lt; 3,0
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Basınç / volüm kaynaklı</div>
                  </button>

                  <button
                    ref={setNodeRef('node-mech-pvpi_perm')}
                    type="button"
                    onClick={() => setWetMech('pvpi_perm')}
                    className={nodeCardCls(wetMech === 'pvpi_perm')}
                  >
                    <div className="text-[10px] font-bold uppercase text-cyan-600 dark:text-cyan-400">
                      Permeabilite Ödemi
                    </div>
                    <div className={`text-xs font-mono font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      PVPI ≥ 3,0
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">ARDS / Kapiller kaçak</div>
                  </button>
                </>
              ) : (
                <>
                  <button
                    ref={setNodeRef('node-mech-svri_low')}
                    type="button"
                    onClick={() => setDryMech('svri_low')}
                    className={nodeCardCls(dryMech === 'svri_low')}
                  >
                    <div className="text-[10px] font-bold uppercase text-cyan-600 dark:text-cyan-400">
                      Vazopleji
                    </div>
                    <div className={`text-xs font-mono font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      SVRI &lt; 1.700
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Düşük vasküler tonus</div>
                  </button>

                  <button
                    ref={setNodeRef('node-mech-svri_normal')}
                    type="button"
                    onClick={() => setDryMech('svri_normal')}
                    className={nodeCardCls(dryMech === 'svri_normal')}
                  >
                    <div className="text-[10px] font-bold uppercase text-cyan-600 dark:text-cyan-400">
                      Normal Tonus
                    </div>
                    <div className={`text-xs font-mono font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      1.700–2.400
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Fizyolojik ardyük</div>
                  </button>

                  <button
                    ref={setNodeRef('node-mech-svri_high')}
                    type="button"
                    onClick={() => setDryMech('svri_high')}
                    className={nodeCardCls(dryMech === 'svri_high')}
                  >
                    <div className="text-[10px] font-bold uppercase text-cyan-600 dark:text-cyan-400">
                      Yüksek Ardyük
                    </div>
                    <div className={`text-xs font-mono font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      SVRI &gt; 2.400
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Vazokonstriksiyon</div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bedside Clinical Decision Card */}
        <aside
          className={`xl:col-span-5 rounded-xl border p-4 space-y-3.5 ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-md border font-mono text-xs font-bold ${toneBadgeClasses(
                  scenario.tone,
                  isDark,
                )}`}
              >
                {scenario.code}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${toneBadgeClasses(
                  scenario.tone,
                  isDark,
                )}`}
              >
                {scenario.badgeLabel}
              </span>
            </div>

            {scenario.requireEcho && (
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  isDark
                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                    : 'bg-cyan-50 text-cyan-700 border-cyan-300'
                }`}
              >
                <ShieldAlert className="w-3 h-3" />
                EKO! Doğrula
              </span>
            )}
          </div>

          <h4 className={`text-sm sm:text-base font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {scenario.title}
          </h4>

          {/* Active Path Pills */}
          <div className="flex flex-wrap gap-1.5">
            {pathPills.map((pill) => (
              <span
                key={pill}
                className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {pill}
              </span>
            ))}
          </div>

          {/* Primary Action Box */}
          <div
            className={`rounded-lg border-l-4 p-3 space-y-1 ${toneBorderLeftClass(scenario.tone)} ${
              isDark ? 'bg-slate-950/80' : 'bg-slate-50'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Öncelikli Yatak Başı Müdahale
            </div>
            <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              <MedicalText text={scenario.action} />
            </p>
          </div>

          {/* Target Outcome */}
          <div
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${
              isDark
                ? 'bg-cyan-950/25 border-cyan-900/50 text-cyan-300'
                : 'bg-cyan-50/70 border-cyan-200 text-cyan-800'
            }`}
          >
            <Target className="w-3.5 h-3.5 shrink-0" />
            <span className="font-mono font-semibold text-[11px]">
              Hedef: <MedicalText text={scenario.target} />
            </span>
          </div>

          {/* Step-by-Step Protocol */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Uygulama ve İzlem Adımları
            </div>
            <ul className="space-y-1.5">
              {scenario.steps.map((step) => (
                <li
                  key={step}
                  className={`flex items-start gap-2 text-xs leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-500" />
                  <span>
                    <MedicalText text={step} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Critical Warning */}
          <div
            className={`rounded-lg border p-2.5 flex items-start gap-2 text-xs leading-relaxed ${
              isDark
                ? 'bg-amber-950/30 border-amber-500/30 text-amber-200'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
            <div>
              <strong className="block text-[11px] uppercase tracking-wide mb-0.5">
                Kritik Yatak Başı Uyarısı
              </strong>
              <MedicalText text={scenario.warning} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
