import type { AntimicrobialMonographData } from './types';

export const BETA_LACTAM_ANTIMICROBIALS: AntimicrobialMonographData[] = [
  // ───────────────────────────────────────────────────────────────────────────
  // 1. SEFAZOLİN (CEFAZOLIN)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'cefazolin',
    classTag: 'beta_lactam',
    accentColor: 'teal',
    atcCode: 'J01DB04',
    classLabel: '1. Kuşak Sefalosporin · Cerrahi Profilaksi Altın Standardı',
    tradeNamesTr: 'Sefazol® · Eqizolin® · Cezol® · Maksipor® (1 g IV/IM Flakon)',
    title: 'Sefazolin Sodyum Monografisi',
    cardTitle: 'Sefazolin (Cefazolin)',
    cardBadge: 'ASHP/IDSA Profilaksi 1. Tercih',
    cardCategoryLabel: 'β-Laktam · 1. Kuşak Sefalosporin',
    cardShortDesc:
      'Cerrahi alan enfeksiyonu profilaksisinin altın standardı (2 g IV; ≥120 kg 3 g; q4sa / >1500 mL kan kaybında redozaj), MSSA bakteriyemisi ve benzersiz R1 yan zinciri sayesinde penisilin alerjisinde güvenli seçenek.',
    cardHighlights: [
      {
        label: 'Profilaksi Dozu',
        value: '2 g (≥120 kg: 3 g)',
        subtext: 'İnsizyondan 30–60 dk önce',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30',
      },
      {
        label: 'İntraop Redozaj',
        value: 'Her 4 sa / >1500 mL',
        subtext: 'Pediatrik: 30 mg/kg (maks 2 g)',
        colorClass: 'text-sky-700 dark:text-sky-300',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
      {
        label: 'Penisilin Alerjisi',
        value: 'Benzersiz R1 Zinciri',
        subtext: 'SCAR yoksa çapraz reaksiyon YOK',
        colorClass: 'text-emerald-700 dark:text-emerald-300',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
    ],
    aliases: ['sefazolin', 'cefazolin', 'sefazol', 'eqizolin', 'cezol', 'profilaksi'],
    searchKeywords: [
      'sefazolin',
      'cefazolin',
      'sefazol',
      'eqizolin',
      'cezol',
      'cerrahi profilaksi',
      'mssa',
      'penisilin alerjisi',
      'r1 yan zinciri',
      'redozaj',
      '120 kg',
    ],
    highAlert: {
      tallManName: 'ceFAZolin',
      confusionRiskWith: 'cefTAZidime · cefTRIAXone · cefEPime',
      criticalAlerts: [
        '≥120 KG HASTALARDA 2 g YETERSİZ KALIR (OBEZİTE PROFİLAKSİ TUZAĞI): ASHP/IDSA/SIS kılavuzları ≥120 kg erişkinlerde cilt altı yağ dokusu penetrasyonunu sağlamak için 3 g IV başlangıç ve 3 g IV intraoperatif redozaj önerir.',
        'PENİSİLİN ALERJİSİ NEDENİYLE GEREKSİZ KLİNDAMİSİN/VANKOMİSİN KULLANIMI: AAAAI/ACAAI 2022 kılavuzu uyarınca sefazolinin R1 yan zinciri diğer hiçbir β-laktamla ortak değildir. Şiddetli gecikmiş SCAR (SJS/TEN/DRESS) veya sefazoline spesifik anafilaksi öyküsü yoksa penisilin alerjisinde güvenle uygulanır; gereksiz alternatifler cerrahi alan enfeksiyonunu %50 artırır!',
        'İNTRAOPERATİF REDOZAJ SAATİ İNSİZYONDAN DEĞİL İLK DOZDAN SAYILIR: Pre-insizyon infüzyonun başlangıcından itibaren 4 saat dolduğunda veya >1500 mL kan kaybı olduğunda ek doz verilmelidir.',
        'İNTRA-TEKAL UYGULAMA YASAKTIR: Yanlışlıkla intratekal/epidural enjeksiyon ağır nörotoksisite ve refrakter status epileptikusa yol açar.',
      ],
      antidoteOrRescue:
        'Spesifik antidot yoktur. IgE-aracılı anafilakside derhal infüzyonu durdurun: IM/IV Adrenalin (perioperatif şokta 10–100 mcg IV titre bolus), %100 O₂, agresif kristaloid resüsitasyonu, H1/H2 blokeri ve hidrokortizon. Ağır böbrek yetmezliğine bağlı yüksek doz nörotoksisitede (nöbet/ensefalopati) ilacı kesin, benzodiazepin ile nöbet kontrolü sağlayın; sefazolin hemodiyalizle orta düzeyde (%20–50) uzaklaştırılır.',
    },
    identitySummary:
      'Sefazolin, metisiline duyarlı Staphylococcus aureus (MSSA), β-hemolitik streptokoklar ve toplum kaynaklı E. coli, Klebsiella pneumoniae, Proteus mirabilis (PEcK) üzerine güçlü bakterisidal etkili 1. kuşak parenteral sefalosporindir. Uzun doku kalıcılığı, düşük toksisite, yüksek kemik/yumuşak doku penetrasyonu ve benzersiz R1 yan zinciri ile temiz ve temiz-kontamine cerrahilerde perioperatif profilaksinin tartışmasız altın standardıdır.',
    spectrumHighlights: [
      {
        title: '1. Tercih Hedefler (MSSA & Profilaksi)',
        detail:
          'MSSA (bakteriyemi, endokardit, osteomiyelit, protez eklem), Streptococcus pyogenes/agalactiae, E. coli, K. pneumoniae ve P. mirabilis (PEcK). Cerrahi cilt florasına karşı en yüksek klinik etkinlik.',
        tone: 'emerald',
      },
      {
        title: 'Penisilin Alerjisinde Çapraz Reaksiyon Yok (AAAAI 2022)',
        detail:
          'R1 yan zinciri (1H-tetrazol-1-ilasetil) hiçbir penisilin veya diğer sefalosporinle paylaşılmaz. Anafilaksi dahil IgE-aracılı penisilin alerjisinde doğrudan verilebilir (yalnızca SCAR hariç).',
        tone: 'amber',
      },
      {
        title: 'Kesin Spektrum Boşlukları (Etkisiz)',
        detail:
          'MRSA, Enterococcus spp., Pseudomonas aeruginosa, ESBL/AmpC üreten Gram-negatifler ve Bacteroides fragilis dahil anaeroblara ETKİSİZDİR. Kolorektal/apendiks cerrahisinde mutlaka Metronidazol eklenir.',
        tone: 'rose',
      },
    ],
    mechanismSummary:
      'Sefazolin, bakteri hücre duvarı sentezinin son transpeptidasyon basamağını katalizleyen penisilin bağlayan proteinlere (özellikle PBP1 ve PBP3) kovalent olarak bağlanır. Peptidoglikan çapraz bağlanmasının durmasıyla hücre duvarı bütünlüğü bozulur, bakteri otolizinleri aktive olur ve ozmotik lizis yoluyla zamana bağımlı (%fT>MIC) bakterisidal etki gerçekleşir.',
    mechanismPillars: [
      {
        title: 'PBP1 & PBP3 Yüksek Afinite',
        detail:
          'Gram-pozitif koklarda (MSSA, streptokok) hücre duvarı transpeptidazlarını hızla inaktive ederek erken bakteriyel lizis sağlar; antistafilokokal penisilinlere kıyasla çok daha düşük nefrotoksisite/hepatotoksisite taşır.',
      },
      {
        title: 'Zamana Bağımlı Öldürme (%fT>MIC)',
        detail:
          'Bakterisidal aktivite serbest plazma konsantrasyonunun MIC üzerinde kaldığı süre oranına (%40–70 fT>MIC) bağlıdır; cerrahi boyunca doku düzeyinin MIC üstünde tutulması 4 saatlik redozajın temelidir.',
      },
      {
        title: 'MTT Yan Zinciri Yoktur (Koagülopati Güvenli)',
        detail:
          'Sefamandol veya sefoperazondan farklı olarak N-metiltiotetrazol (MTT) yan zinciri TAŞIMAZ (tiadiazol halkası taşır); bu nedenle K-vitamini bağımlı faktör inhibisyonu (INR/PTZ uzaması) ve disülfiram reaksiyonu yapmaz.',
      },
    ],
    pkCards: [
      {
        label: 'Yarı Ömür (t½)',
        value: '1,8 – 2,2 saat',
        detail: 'Normal böbrek fonksiyonunda; son dönem böbrek yetmezliğinde 20–40 saate kadar uzar.',
      },
      {
        label: 'Protein Bağlanması',
        value: '%75 – 86',
        detail: 'Albümine yüksek bağlanır; hipoalbüminemik YBÜ hastalarında serbest fraksiyon ve klirens artabilir.',
      },
      {
        label: 'Dağılım Hacmi (Vd)',
        value: '0,12 – 0,20 L/kg',
        detail: 'Ekstraselüler sıvı, kemik, sinovyal sıvı, plevra ve miyokard dokusuna mükemmel geçer; BOS penetrasyonu düşüktür (menenjitte kullanılmaz!).',
      },
      {
        label: 'Eliminasyon',
        value: '%80 – 100 Renal',
        detail: 'Glomerüler filtrasyon + aktif tübüler sekresyonla değişmeden idrarla atılır; metabolize olmaz.',
      },
    ],
    contraindications: {
      absoluteItems: [
        'Sefazolinin kendisine karşı belgelenmiş IgE-aracılı anafilaksi veya ağır hipersensitivite öyküsü.',
        'Herhangi bir β-laktam ile gelişmiş şiddetli gecikmiş kütanöz advers reaksiyon (SCAR: Stevens-Johnson Sendromu [SJS], Toksik Epidermal Nekroliz [TEN], DRESS veya AGEP).',
      ],
      relativeItems: [
        'İleri böbrek yetmezliği (eGFR <30 mL/dk) — doz aralığı uzatılmazsa birikim ve nörotoksisite (nöbet/miyoklonus) riski artar.',
        'Yüksek inokülümlü MSSA enfektif endokardit veya beyin apsesi (BOS geçişi yetersizdir; endokarditte BlaZ β-laktamaz inokülüm etkisi tartışmalıdır — infeksiyon hastalıkları konsültasyonu önerilir).',
        'Ağır Clostridioides difficile ilişkili kolit öyküsü (profilaksi süresi postop ≤24 saat ile sınırlandırılmalıdır).',
      ],
      clinicalNote:
        'AAAAI/ACAAI 2022 Güncellemesi: Penisilin veya amoksisilin alerjisi (anafilaksi dahil!) sefazolin için KONTRENDİKASYON DEĞİLDİR; R1 yan zinciri yapısal olarak benzersizdir.',
    },
    regimenCards: [
      {
        title: 'MSSA / β-Hemolitik Streptokok Selülit & Komplike Deri-Yumuşak Doku (cSSTI)',
        setting: 'core',
        badge: 'FDA / IDSA 1. Basamak',
        dose: '1–2 g IV',
        infusionDuration: '15–30 dk IV',
        interval: 'q8sa',
        note: 'Orta-ağır pürülan olmayan selülit, erizipel ve MSSA/Streptokok cSSTI tedavisinde 1 g q8sa (ağır/derin doku veya obezitede 2 g q8sa; 3–6 g/gün). MRSA şüphesi/riskinde ek ajan gerekir.',
      },
      {
        title: 'MSSA Osteomiyelit & Septik Artrit',
        setting: 'core',
        badge: 'IDSA Kemik-Eklem 1. Tercih',
        dose: '2 g IV',
        infusionDuration: '30 dk IV',
        interval: 'q8sa × 4–6 hf',
        note: 'Yüksek kemik ve sinovyal sıvı penetrasyonu sayesinde MSSA osteomiyelit (genellikle 6 hafta) ve doğal/protez eklem septik artritinde (cerrahi drenaj + 3–4 hafta) 1. basamaktır; protez eklemde rifampisin eklenmesi değerlendirilir.',
      },
      {
        title: 'Duyarlı Gram-Negatif Komplike ÜSE / Akut Piyelonefrit',
        setting: 'core',
        badge: 'Kültür / Duyarlılık Bazlı',
        dose: '1–2 g IV',
        infusionDuration: '15–30 dk IV',
        interval: 'q8sa',
        note: 'Duyarlı E. coli, K. pneumoniae ve P. mirabilis (PEcK) kaynaklı akut piyelonefrit ve komplike ÜSE’de (özellikle gebelikte veya kültürle hedefli de-eskalasyonda) yüksek üriner konsantrasyonla etkindir.',
      },
      {
        title: 'MSSA Doğal Kapak İnfektif Endokarditi (IE)',
        setting: 'core',
        badge: 'AHA / ESC Endokardit',
        dose: '2 g IV',
        infusionDuration: '30 dk IV',
        interval: 'q8sa × 4–6 hf',
        note: 'MSSA doğal kapak endokarditinde (6 g/gün, 6 hafta) antistafilokokal penisilinlere eşdeğer kür ve belirgin düşük nefrotoksisite/hepatotoksisite sağlar. Sol kalp/yüksek inokülümde inokülüm etkisi (CzIE) açısından erken kan kültürü klirensi izlenir.',
      },
      {
        title: 'Standart Cerrahi Profilaksi (<120 kg)',
        setting: 'perioperative',
        badge: 'ASHP/IDSA Altın Standart',
        dose: '2 g IV',
        infusionDuration: '5–30 dk IV',
        interval: 'q4sa redozaj',
        note: 'İnsizyondan 30–60 dk önce uygulanır. Ameliyat >4 saat sürerse veya kan kaybı >1500 mL olursa 2 g IV tekrarlanır. Postop profilaksi çoğu temiz cerrahide insizyon kapanınca sonlandırılır (kardiyak cerrahide maks 24–48 sa).',
      },
      {
        title: 'Obez Hasta Cerrahi Profilaksisi (≥120 kg)',
        setting: 'perioperative',
        badge: '≥120 kg Yüksek Doz',
        dose: '3 g IV',
        infusionDuration: '15–30 dk IV',
        interval: 'q4sa redozaj',
        note: '≥120 kg (veya VKİ ≥40 kg/m²) hastalarda cilt altı yağ dokusu konsantrasyonunu MIC üstünde tutmak için 3 g IV başlangıç ve gerektiğinde 3 g IV redozaj uygulanır.',
      },
      {
        title: 'Pediatrik Cerrahi Profilaksi',
        setting: 'perioperative',
        badge: 'Pediatri',
        dose: '30 mg/kg IV',
        infusionDuration: '10–30 dk IV',
        interval: 'q4sa (maks 2 g)',
        note: 'Tek doz üst sınırı 2 g’dır. İntraoperatif kan kaybı >25 mL/kg veya süre >4 saat olduğunda ek 30 mg/kg uygulanır.',
      },
      {
        title: 'YBÜ MSSA Bakteriyemisi / Derin Doku / Endokardit',
        setting: 'icu',
        badge: 'YBÜ MSSA 1. Tercih',
        dose: '2 g IV',
        infusionDuration: '30 dk IV',
        interval: 'q8sa',
        note: 'Nafsilin/oksasiline eşdeğer klinik kür ve belirgin düşük ABH/hepatotoksisite oranı. Total 6 g/gün. Derin odak veya obezitede (>120 kg) 2 g q6sa düşünülebilir.',
      },
      {
        title: 'Kolorektal / Apendiks / Biliyer Cerrahi Kombinasyonu',
        setting: 'special',
        badge: 'Anaerobik Kombine',
        dose: 'Sefazolin 2–3 g + Metronidazol 500 mg',
        infusionDuration: '30 dk IV',
        interval: 'Sefazolin q4sa',
        note: 'Sefazolin B. fragilis’e etkisiz olduğundan alt GIS ve komplike safra cerrahisinde mutlaka IV Metronidazol 500 mg (redozaj gerekmez, t½ ~8 sa) ile kombine edilir.',
      },
    ],
    calculator: {
      defaultWeightKg: 75,
      weightScalar: 'TBW',
      obesityRationale:
        'Sefazolin profilaksisinde ağırlık eşiği doğrudan Gerçek Vücut Ağırlığı (TBW) üzerinden belirlenir: <120 kg için 2 g IV, ≥120 kg için 3 g IV. YBÜ MSSA bakteriyemisinde de >120 kg hastalarda doz 2 g q6sa’ya çıkılabilir.',
      perioperative: {
        applicable: true,
        summaryTitle: 'ASHP / IDSA / SIS Cerrahi Profilaksi & İntraop Redozaj',
        timingWindow: 'İnsizyondan 30–60 dk önce',
        standardDoseLabel: '<120 kg: 2 g IV · ≥120 kg: 3 g IV',
        adultStandardDoseMg: 2000,
        highWeightThresholdKg: 120,
        highWeightDoseMg: 3000,
        pediatricMgKg: 30,
        pediatricMaxMg: 2000,
        infusionTimeText: '5 dk yavaş IV puşe (1 g) veya 15–30 dk IV infüzyon (2–3 g)',
        redoseHours: 4,
        bloodLossRedoseMl: 1500,
        clinicalNote:
          'Turnike uygulanacak ortopedik cerrahilerde sefazolin infüzyonu turnike şişirilmeden en az 10–15 dk önce tamamlanmalıdır. Kardiyopulmoner baypas (KPB) başlangıcında (prime sonrası) veya KPB >4 saat sürdüğünde ek doz değerlendirilir.',
      },
      icu: {
        pkPdTarget: 'Serbest ilaç konsantrasyonunun doz aralığının ≥%50–70’inde MIC üzerinde kalması (%fT>MIC)',
        pkPdBadge: '%fT > MIC ≥ %50–70',
        loadingDoseLabel: '2 g IV (ilk standart doz)',
        loadingFixedMg: 2000,
        loadingUnit: 'mg',
        loadingInfusionText: '30 dakikada IV infüzyon',
        maintenanceLabel: 'YBÜ MSSA / Ciddi Enfeksiyon Rejimleri',
        maintenanceMode: 'fixed_regimen',
        fixedOptions: [
          {
            id: 'mssa_std',
            label: 'MSSA Bakteriyemi / Sepsis (Standart)',
            singleDoseMg: 2000,
            intervalHours: 8,
            infusionHours: 0.5,
            diluentVolumeMl: 100,
            note: 'MSSA bakteriyemisi, kateter ilişkili kan dolaşımı enfeksiyonu ve osteomiyelitte 1. basamak (6 g/gün).',
          },
          {
            id: 'mssa_high_obese',
            label: 'Ağır MSSA / Morbid Obez / ARC',
            singleDoseMg: 2000,
            intervalHours: 6,
            infusionHours: 0.5,
            diluentVolumeMl: 100,
            note: '≥120 kg hastalarda veya hiperdinamik/ARC (eGFR >130 mL/dk) genç travma/YBÜ hastalarında 8 g/gün.',
          },
          {
            id: 'mod_inf',
            label: 'Orta Şiddetli Yumuşak Doku / İYE',
            singleDoseMg: 1000,
            intervalHours: 8,
            infusionHours: 0.5,
            diluentVolumeMl: 50,
            note: 'Komplike olmayan selülit veya duyarlı E. coli/Klebsiella İYE için 3 g/gün.',
          },
        ],
        tdmNote:
          'Rutin TDM gerekmez; ancak ciddi MSSA endokardit/sepsiste eGFR hızla değişiyorsa böbrek fonksiyonu günlük izlenmelidir.',
      },
      renalTiers: [
        {
          id: 'egfr_55',
          label: 'Normal / Hafif',
          egfrRange: 'eGFR ≥ 55 mL/dk',
          recommendation: 'Standart Doz',
          doseText: '2 g IV q8sa (Profilaksi: 2–3 g IV, q4sa redozaj)',
          note: 'Doz azaltımı gerekmez. ARC’de (eGFR >130 mL/dk) MSSA bakteriyemisinde 2 g q6sa düşünülebilir.',
          tone: 'emerald',
        },
        {
          id: 'egfr_35_54',
          label: 'Orta KBH / ABH',
          egfrRange: 'eGFR 35–54 mL/dk',
          recommendation: 'Aralığı Uzat (q8–12sa)',
          doseText: '1–2 g IV q8–12sa (Ağır MSSA’da 2 g q12sa)',
          note: 'Profilaksi tek dozu değişmez (2–3 g IV); intraop redozaj süresi böbrek fonksiyonuna göre 6–8 saate uzayabilir.',
          tone: 'amber',
        },
        {
          id: 'egfr_11_34',
          label: 'İleri KBH',
          egfrRange: 'eGFR 11–34 mL/dk',
          recommendation: '%50 Doz veya q12sa',
          doseText: '1 g IV q12sa (Ağır MSSA’da ilk doz 2 g, sonra 1 g q12sa)',
          note: 'Yüksek birikimde miyoklonus ve nöbet eşiği düşüşü izlenebilir.',
          tone: 'amber',
        },
        {
          id: 'egfr_lt10',
          label: 'Ağır KBY (Diyalizsiz)',
          egfrRange: 'eGFR ≤ 10 mL/dk',
          recommendation: 'q24sa',
          doseText: '1 g IV q24sa (veya 500 mg–1 g q24sa)',
          note: 't½ 20–40 saate uzar. Cerrahi profilaksi için başlangıç tek dozu yine tam (2 g; ≥120 kg 3 g) verilir, redozaj gerekmez.',
          tone: 'rose',
        },
      ],
      crrtSummary:
        'CVVH / CVVHD / CVVHDF: 2 g IV yükleme → 1–2 g IV q12sa (yüksek eflüent akış ≥30 mL/kg/saat ve MSSA bakteriyemisinde 2 g q12sa veya 1 g q8sa tercih edilir).',
      hdSummary:
        'Aralıklı Hemodiyaliz (IHD): Sefazolin diyalizle %20–50 oranında atılır. Pratik ve yüksek kanıtlı YBÜ/HD rejimi: Haftada 3 gün her HD seansı bitiminde 2 g IV (Cuma→Pazartesi 72 saatlik aralıkta 2–3 g IV).',
    },
    turkeyFormulations: {
      preparations: [
        {
          name: 'Sefazol® / Eqizolin® / Cezol® 1 g IV Flakon',
          presentation: '1000 mg liyofilize toz + 4 mL enjeksiyonluk su çözücü ampul',
          concentration: '1 g / flakon (~48 mg Na⁺)',
          saltOrBaseNote: 'Sefazolin sodyum tuzu; her 1 g flakonda yaklaşık 2,1 mEq (48 mg) sodyum bulunur.',
          alertLevel: 'standard',
        },
        {
          name: 'Sefazol® / Eqizolin® 1 g IM Flakon (LİDOKAİNLİ!)',
          presentation: '1000 mg toz + %0,5 lidokain HCl içeren IM çözücü ampul',
          concentration: 'YALNIZCA IM — ASLA IV VERME!',
          saltOrBaseNote: 'IM formülasyonun çözücüsü lidokain içerir; IV puşelenirse kardiyotoksisite/aritmi riski doğar!',
          alertLevel: 'high',
        },
      ],
      standardDilutions: [
        'Cerrahi Profilaksi (2 g): 2 adet 1 g IV flakon 50–100 mL %0,9 NaCl veya %5 Dekstroz içine eklenerek 15–30 dk’da IV infüze edilir.',
        'Obez Profilaksi (3 g): 3 adet 1 g IV flakon 100 mL %0,9 NaCl içinde 20–30 dk’da infüze edilir.',
        'Acil Yavaş IV Puşe (1 g): 1 g toz en az 10 mL enjeksiyonluk su/SF ile sulandırılıp 3–5 dakikada yavaşça uygulanır.',
      ],
      concentrationTrapWarning:
        'Türkiye’de Sefazol/Eqizolin’in hem IV hem LİDOKAİNLİ IM ambalajı yan yana bulunur! Ameliyathane ilaç arabasında lidokainli IM çözücü ampulün yanlışlıkla IV sulandırmada kullanılmadığından emin olun.',
    },
    compatibility: {
      accessRequirement: 'peripheral-ok',
      accessSummary:
        'Periferik IV kateterden güvenle uygulanabilir. 2–3 g yüksek profilaksi dozlarının 50–100 mL içinde 15–30 dk infüzyonu venöz irritasyonu ve hızlı puşeye bağlı flushing/bulantıyı önler.',
      phRange: '4,5 – 6,0',
      osmolalityNote: '1 g / 50 mL SF çözeltisi izoozmolar (~330 mOsm/kg) olup periferik damarlarda iyi tolere edilir.',
      compatibleDiluents: ['%0,9 NaCl (SF)', '%5 Dekstroz (D5W)', 'Ringer Laktat', 'Enjeksiyonluk Su (rekonstitüsyon)'],
      ySiteCompatible: ['Propofol', 'Fentanil', 'Midazolam', 'Remifentanil', 'Roküronyum', 'Noradrenalin', 'Heparin', 'Metronidazol'],
      ySiteIncompatible: ['Amiodaron', 'Kalsiyum glukonat (yüksek kons.)', 'Vankomisin (yüksek kons.)', 'Amikasin / Gentamisin (aynı torba)', 'Kaspofungin', 'Pantoprazol'],
      stabilityNote:
        'Sulandırıldıktan sonra oda sıcaklığında (25°C) 24 saat, buzdolabında (2–8°C) 72 saat–10 gün stabildir; hafif sararma potens kaybı anlamına gelmez.',
      extravasationProtocol:
        'Vezikan değildir (düşük irritan). Ekstravazasyonda infüzyonu durdurun, ekstremiteyi eleve edin ve soğuk kompres uygulayın.',
    },
    organImpairment: {
      renalSummary: 'Ağırlıklı (%80–100) renal eliminasyon — eGFR <55 mL/dk’da idame aralığı uzatılır; tek profilaksi dozu değişmez.',
      renalDetails: [
        'Pre-insizyon tek cerrahi profilaksi dozu (2 g; ≥120 kg 3 g) böbrek yetmezliğinde dahi TAM verilir; yalnızca intraop redozaj süresi uzatılır veya atlanır.',
        'eGFR <35 mL/dk’da 2 g q8sa gibi tam YBÜ dozları nörotoksisiteye (konfüzyon, miyoklonus, nöbet) yol açabilir.',
        'Hemodiyaliz sonrası 2 g IV (haftada 3 kez; Cuma→Pazartesi 2–3 g) rejimi MSSA bakteriyemisinde kılavuz onaylı ve etkindir.',
        'Periton diyalizi (CAPD/APD) peritonitinde ISPD 2022 1. basamak IP dozu 15–20 mg/kg IP q24sa (uzun bekleme torbasına) şeklindedir.',
      ],
      hepaticSummary: 'Karaciğer yetmezliğinde (Child-Pugh A/B/C) doz ayarlaması GEREKMEZ.',
      hepaticDetails: [
        'Hepatik metabolizması ihmal edilebilir düzeydedir (%80–100 değişmeden idrarla atılır).',
        'Dekompanse sirozda ciddi hipoalbüminemi (<2 g/dL) serbest sefazolin klirensini artırabilir; ağır MSSA sepsisinde tam doz (2 g q8sa) korunmalıdır.',
        'MTT yan zinciri içermediğinden sirotik koagülopatiyi (INR/PTZ) ağırlaştırmaz.',
      ],
      renalMatrix: [
        {
          stage: 'ARC (eGFR > 130 mL/dk)',
          doseBadge: '1–2 g IV q8sa',
          severeDoseBadge: '2 g IV q6–8sa (8 g/gün)',
          note: 'Genç travma/yanık/hiperdinamik YBÜ hastalarında artmış GFR ve hipoalbüminemi serbest klirensi hızlandırır; ağır MSSA bakteriyemisi veya ≥120 kg obezitede 2 g q6sa tercih edilir. Cerrahi profilakside q4sa redozaj aksatılmaz.',
          tone: 'indigo',
        },
        {
          stage: 'eGFR ≥ 55 mL/dk (Normal / Hafif)',
          doseBadge: '1 g IV q8sa',
          severeDoseBadge: '2 g IV q8sa (6 g/gün)',
          note: 'Standart tam doz. Cerrahi profilaksi: <120 kg 2 g IV, ≥120 kg 3 g IV (insizyondan 30–60 dk önce; q4sa / >1500 mL kan kaybında redozaj).',
          tone: 'emerald',
        },
        {
          stage: 'eGFR 35–54 mL/dk (Orta KBH / ABH)',
          doseBadge: '1 g IV q8–12sa',
          severeDoseBadge: '2 g IV q12sa (4 g/gün)',
          note: 'İdame aralığı uzatılır. Cerrahi profilaksi başlangıç tek dozu TAM (2–3 g IV) uygulanır; intraoperatif redozaj süresi 6–8 saate uzar.',
          tone: 'sky',
        },
        {
          stage: 'eGFR 11–34 mL/dk (İleri KBH)',
          doseBadge: '500 mg–1 g IV q12sa',
          severeDoseBadge: '2 g yükleme → 1 g IV q12sa',
          note: 'İlk yükleme dozu tam verilir, ardından q12sa’ya inilir. Birikim halinde miyoklonus ve nöbet eşiği düşüşü izlenir. Cerrahi profilakside tam tek doz (2–3 g IV), redozaj gerekmez.',
          tone: 'amber',
        },
        {
          stage: 'eGFR ≤ 10 mL/dk (Ağır KBY · Diyalizsiz)',
          doseBadge: '500 mg–1 g IV q24sa',
          severeDoseBadge: '2 g yükleme → 1 g IV q24sa',
          note: 't½ 20–40 saate uzar; 1 g q24sa (hafif enfeksiyonda 500 mg q24sa veya 1 g q48sa) nörotoksisiteyi önler. Cerrahi profilaksi tek dozu yine TAM (2–3 g IV), redozaj yoktur.',
          tone: 'rose',
        },
        {
          stage: 'İntermittan Hemodiyaliz (IHD · 3×/hf)',
          doseBadge: 'HD sonrası 1–2 g IV (3×/hf)',
          severeDoseBadge: 'HD sonrası 2 g IV (72 sa aralıkta 2–3 g)',
          note: 'Yüksek akımlı HD ile %20–50 oranında diyalizlenir. Pratik ve kılavuz onaylı 3×/hafta şema: her HD seansı bitiminde 2 g IV (Cuma→Pazartesi 72 saatlik aralıkta 2–3 g IV); alternatif: 1 g q24sa + HD gününde seans sonrasına zamanlama.',
          tone: 'amber',
        },
        {
          stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
          doseBadge: 'Eflüent 20–25 mL/kg/sa: 1 g IV q12sa',
          severeDoseBadge: 'Eflüent ≥30 mL/kg/sa veya MSSA: 2 g q12sa / 1 g q8sa',
          note: '2 g IV tam yükleme sonrası eflüent hızına göre titre edilir: 20–25 mL/kg/sa’de 1 g q12sa (derin MSSA’da 2 g q12sa); ≥30 mL/kg/sa yüksek eflüentte veya MSSA bakteriyemisi/endokarditte 2 g q12sa veya 1 g q8sa tercih edilir.',
          tone: 'sky',
        },
        {
          stage: 'SLED / PIRRT (6–12 sa/gün)',
          doseBadge: '1 g IV q12sa (seans sonrası)',
          severeDoseBadge: '2 g yükleme → 1–2 g IV q12sa',
          note: 'Uzamış diyaliz seansı boyunca anlamlı klirens gerçekleşir; dozlardan biri mutlaka SLED seansı bitimine zamanlanmalıdır (ağır MSSA’da seans sonrası 2 g IV).',
          tone: 'sky',
        },
        {
          stage: 'Periton Diyalizi (CAPD / APD · ISPD 2022)',
          doseBadge: 'Sistemik: 500 mg–1 g IV q24sa',
          severeDoseBadge: 'ISPD 2022 IP Peritonit: 15–20 mg/kg IP q24sa',
          note: 'Sistemik PD klirensi düşüktür (%5–15). PD ilişkili peritonitte (ISPD 2022): aralıklı intraperitoneal 15–20 mg/kg (~1–1,5 g) IP q24sa uzun bekleme torbasına (≥6 saat bekleme) veya sürekli IP (500 mg/L yükleme → 125 mg/L idame) uygulanır.',
          tone: 'amber',
        },
      ],
      hepaticMatrix: [
        {
          childPugh: 'Child-Pugh A (5–6 Puan · Hafif)',
          badge: 'Doz Ayarı Yok',
          detail: 'Hepatik metabolizma ihmal edilebilir düzeydedir (%80–100 değişmeden renal atılım). Standart profilaksi (2–3 g) ve MSSA tedavi (1–2 g q8sa) dozları tam uygulanır.',
          tone: 'emerald',
        },
        {
          childPugh: 'Child-Pugh B (7–9 Puan · Orta)',
          badge: 'Doz Ayarı Yok',
          detail: 'Doz azaltımı gerekmez. Sirotik asit ve orta hipoalbüminemi dağılım hacmini (Vd) hafif artırabilir; ciddi MSSA enfeksiyonlarında 2 g q8sa tam doz korunur.',
          tone: 'emerald',
        },
        {
          childPugh: 'Child-Pugh C (10–15 Puan · Dekompanse)',
          badge: 'Doz Ayarı Yok · Albümin/eGFR İzle',
          detail: 'Karaciğer klirensi açısından kısıtlama gerekmez; ancak ağır hipoalbüminemi (<2,0 g/dL) %75–86 protein bağlanan sefazolinin serbest klirensini artırırken, eşlik eden hepatorenal sendrom (eGFR <35) nörotoksik birikime yol açar.',
          tone: 'amber',
        },
      ],
      dualOrganNote:
        'Dekompanse sirozda (Child-Pugh C) sarkopeni nedeniyle serum kreatinini gerçek GFR’yi olduğundan yüksek gösterir; hepatorenal sendrom (eGFR <35 mL/dk) varlığında idame dozu mutlaka renal matrise çekilmelidir. Buna karşın böbrek fonksiyonu korunmuş ve ağır hipoalbüminemili (<2 g/dL) kritik MSSA bakteriyemisinde serbest klirens arttığından düşük dozdan kaçınılıp 2 g q8sa korunmalıdır; MTT yan zinciri olmadığından sirotik koagülopatiyi artırmaz.',
    },
    geriatricObesity: {
      geriatricReductionBadge: 'eGFR’ye Göre Ayarla',
      geriatricPoints: [
        '65 yaş üstü hastalarda serum kreatinini normal görünse bile azalmış kas kütlesi nedeniyle gerçek GFR düşüktür — Cockcroft-Gault/CKD-EPI ile hesaplayın.',
        'Yaşlılarda uzun süreli profilaksi (>24 saat) C. difficile koliti ve ABH riskini belirgin artırır.',
      ],
      obesityWeightScalarBadge: 'TBW (≥120 kg → 3 g)',
      obesityPoints: [
        'ASHP/IDSA/SIS kılavuzu: TBW ≥120 kg erişkinlerde cerrahi profilaksi dozu mutlaka 2 g’dan 3 g IV’ye çıkarılır.',
        'Morbid obezitede (VKİ ≥40 kg/m²) cilt altı adipoz doku konsantrasyonu 2 g ile MIC altında kalabilir; 3 g + 4 saatte bir redozaj SSI oranını anlamlı azaltır.',
      ],
      clinicalNote:
        'Bariatrik cerrahilerde (sleeve gastrektomi, RYGB) ≥120 kg hastalarda 3 g IV standarttır; insizyon öncesi 30–60 dk penceresine uyulması kritik önemdedir.',
    },
    pregnancyLactation: {
      pregnancySummary: 'Gebelikte ve Sezaryen Profilaksisinde 1. Basamak Güvenli Ajan (Eski FDA B).',
      pregnancyDetails: [
        'ACOG kılavuzuna göre sezaryen doğumda cilt insizyonundan 30–60 dk ÖNCE (kordon klemplenmesini beklemeden!) 2 g IV (≥120 kg: 3 g IV) uygulanır; maternal endometrit ve yara enfeksiyonunu belirgin azaltır.',
        'Plasentayı geçer ancak teratojenite veya neonatal advers etki artışı gösterilmemiştir.',
      ],
      lactationSummary: 'Emzirme Döneminde Tamamen Uyumlu (LactMed).',
      lactationDetails: [
        'Anne sütüne çok düşük düzeyde (<%1 maternal doz) geçer ve oral biyoyararlanımı olmadığı için bebekte sistemik etki yapmaz.',
        'Emzirmenin kesilmesine kesinlikle gerek yoktur.',
      ],
    },
    adverseEffects: [
      {
        title: 'Hipersensitivite & Perioperatif Anafilaksi',
        incidenceOrSeverity: 'Nadir (Perioperatif 1. neden)',
        detail:
          'Ameliyathanede en sık kullanılan antibiyotik olduğu için perioperatif IgE-aracılı anafilaksinin en sık bildirilen antibiyotik nedenidir; indüksiyon sonrası ani hipotansiyon/bronkospazmda akla gelmelidir.',
        tone: 'rose',
      },
      {
        title: 'C. difficile İlişkili İshal / Kolit',
        incidenceOrSeverity: '%1–3',
        detail:
          'Özellikle cerrahi profilaksinin gereksiz yere >24 saat sürdürülmesiyle risk katlanır.',
        tone: 'amber',
      },
      {
        title: 'Nörotoksisite (Nöbet / Miyoklonus)',
        incidenceOrSeverity: 'Renal birikimde',
        detail:
          'Ağır böbrek yetmezliğinde doz azaltılmazsa GABA-A antagonizmasına bağlı ensefalopati ve nöbet görülebilir (sefepime kıyasla çok daha nadirdir).',
        tone: 'indigo',
      },
      {
        title: 'Hafif Transaminaz Artışı / Eozinofili / Flebit',
        incidenceOrSeverity: '%1–5 (Geri dönüşlü)',
        detail:
          'Geçici AST/ALT yükselmesi, hafif lökopeni/eozinofili ve nadiren akut interstisyel nefrit gelişebilir.',
        tone: 'teal',
      },
    ],
    specialClinicalCautions: [
      {
        title: 'Penisilin Alerjisi Etiketi Olan Hastalar (AAAAI/ACAAI 2022)',
        detail:
          'Penisilin alerjisi beyan eden hastaların >%90’ı gerçekte alerjik değildir; gerçek anafilaksi olsa dahi sefazolinin R1 yan zinciri çapraz reaksiyon vermediği için (SCAR hariç) doğrudan güvenle uygulanır.',
      },
      {
        title: 'Kardiyak Cerrahi & Kardiyopulmoner Baypas (KPB)',
        detail:
          'KPB devresine bağlı hemodilüsyon ve dağılım hacmi artışı sefazolin düzeyini düşürür; 2–3 g pre-insizyon dozuna ek olarak KPB başlangıcında veya ilk dozdan 3–4 saat sonra redozaj önerilir.',
      },
      {
        title: 'MSSA İnokülüm Etkisi (CzIE) — Endokardit',
        detail:
          'Bazı tip-A BlaZ β-laktamaz üreten MSSA suşları çok yüksek bakteriyel yükte (sol kalp endokarditi, drene edilmemiş apse) sefazolini kısmen hidrolize edebilir; inatçı bakteriyemide kaynak kontrolü ve kombinasyon/alternatif değerlendirilir.',
      },
      {
        title: 'MTT Yan Zinciri Olmadığı İçin Koagülopati Güvenliği',
        detail:
          'K-vitamini epoksit redüktazı inhibe etmez; nöraksiyel blok (spinal/epidural) uygulanan hastalarda ek INR uzaması yaratmaz.',
      },
    ],
    deepPharmacodynamics: {
      receptorMechanism: {
        title: 'PBP1/PBP3 Kovalent Açilasyonu & Transpeptidaz Blokajı',
        summary:
          'Sefazolinin β-laktam halkası, bakteriyel peptidoglikan öncülü D-alanil-D-alanin dipeptidine yapısal olarak benzerlik gösterir ve PBP aktif merkezindeki serin hidroksil grubunu geri dönüşsüz açiller.',
        points: [
          'S. aureus’ta özellikle PBP1 (septum oluşumu) ve PBP2’ye yüksek afinite ile bağlanır; ancak MRSA’nın mecA geniyle kodladığı PBP2a’ya bağlanamaz (direnç mekanizması).',
          'R1 konumundaki 1H-tetrazol-1-ilasetil grubu ve R2 konumundaki 5-metil-1,3,4-tiadiazol-2-iltiometil halkası diğer β-laktamlardan benzersizdir; bu yapısal ayrılık IgE çapraz reaktivitesini ortadan kaldırır.',
        ],
      },
      intracellularSignaling: {
        title: 'Bakteriyel Otolizin Aktivasyonu & Ozmotik Lizis Kaskadı',
        summary:
          'Peptidoglikan çapraz bağlanmasının bloke edilmesi hücre duvarı sentez-yıkım dengesini yıkım lehine bozar ve bakteriyel programlı lizisi tetikler.',
        points: [
          'Duvar sentezi dururken endojen murein hidrolazlar (otolizinler) inhibisyondan kurtulur ve mevcut peptidoglikan kafesini parçalar.',
          'Yüksek intraselüler turgor basıncı altındaki bakteri protoplastı ozmotik şokla rüptüre olur; bu nedenle aktif bölünen log-faz bakterilerde en hızlı bakterisidal etki gözlenir.',
        ],
      },
      tissueOrganSystems: [
        {
          systemTitle: 'Cilt Altı Yağ, Kas & Kemik Dokusu',
          tissueTarget: 'Cerrahi Alan Profilaksisi',
          accent: 'teal',
          points: [
            '2 g IV sonrası serum pik ~180–200 mcg/mL; kemik ve sinovyal dokuda MSSA MIC’sinin (0,5–1 mcg/mL) 10–30 katı düzeylere ulaşır.',
            '≥120 kg obez hastalarda cilt altı adipoz dokuda intersitisyel serbest konsantrasyon düştüğü için 3 g IV zorunludur.',
          ],
        },
        {
          systemTitle: 'Santral Sinir Sistemi (BOS Geçişi)',
          tissueTarget: 'Kan-Beyin Bariyeri',
          accent: 'indigo',
          points: [
            'Meningeal inflamasyonda bile BOS geçişi düşüktür (%1–5); bu nedenle menenjit ve ventrikülit tedavisinde KULLANILMAZ (Sefotaksim/Seftriakson veya Meropenem seçilir).',
            'Aşırı renal birikimde düşük düzeyde GABA-A Cl⁻ kanalı antagonizması ile miyoklonus/nöbet tetikleyebilir.',
          ],
        },
        {
          systemTitle: 'Renal Tübüler Sistem',
          tissueTarget: 'Proksimal Tübül OAT1/OAT3',
          accent: 'sky',
          points: [
            'Proksimal tübülde organik anyon taşıyıcıları (OAT1/3) ile aktif sekrete edilir; Probenesid bu sekresyonu bloke ederek yarı ömrü uzatır.',
            'Antistafilokokal penisilinlere (nafsilin/oksasilin) kıyasla akut interstisyel nefrit ve ABH insidansı anlamlı derecede düşüktür.',
          ],
        },
        {
          systemTitle: 'Hemostaz & Koagülasyon',
          tissueTarget: 'K-Vitamini Yolağı Güvenli',
          accent: 'amber',
          points: [
            'MTT yan zinciri bulunmadığından hepatik γ-glutamil karboksilazı inhibe etmez; cerrahi kanama riskini artırmaz.',
            'Perioperatif tromboelastografi (ROTEM/TEG) parametrelerini klinik dozlarda bozmaz.',
          ],
        },
      ],
      synergyAndCeiling: {
        title: 'Zamana Bağımlı Platosu (%fT>MIC) & İnokülüm Etkisi',
        summary:
          'Konsantrasyon MIC’nin 4–5 katını aştığında bakteriyel öldürme hızı platoya ulaşır; etkinlik pik yükseklikten çok MIC üzerindeki süreye bağlıdır.',
        points: [
          'Post-antibiyotik etki (PAE) Gram-pozitiflerde kısa (1–2 saat), Gram-negatiflerde ihmal edilebilir düzeydedir.',
          'Komplike MSSA bakteriyemisinde sefazolinin gentamisin ile rutin sinerjistik kombinasyonu artık önerilmez (nefrotoksisite↑, sağkalım yararı yok).',
        ],
      },
      clinicalPearls: [
        'İnsizyondan 30–60 dk önce başlayıp turnike şişirilmeden 10–15 dk önce infüzyonu bitirmek ortopedik protez enfeksiyonlarını dramatik azaltır.',
        'Penisilin alerjisi yazan ameliyat hastasında "SCAR var mı? Sefazoline özel anafilaksi var mı?" diye sorun — ikisi de "hayır" ise doğrudan Sefazolin verin.',
        'Perioperatif anafilaksi geliştiğinde triptaz örneği alın (30–120 dk içinde) ve hastayı mutlaka alerji immünoloji testine yönlendirin.',
      ],
    },
    referencesAndInteractions: {
      drugName: 'Sefazolin',
      structuredInteractions: [
        {
          severity: 'C',
          agent: 'Probenesid',
          mechanism: 'Renal proksimal tübüler OAT1/OAT3 sekresyon inhibisyonu',
          clinicalEffect: 'Sefazolin plazma konsantrasyonu yükselir ve yarı ömrü uzar.',
          management: 'Ağır böbrek yetmezliğinde toksisite riskine karşı birlikte kullanımdan kaçının.',
        },
        {
          severity: 'C',
          agent: 'Varfarin (K-Vitamini Antagonistleri)',
          mechanism: 'Bağırsak florası değişikliği (MTT zinciri yoktur)',
          clinicalEffect: 'Uzun süreli YBÜ tedavisinde (≥7 gün) nadiren INR hafif artabilir.',
          management: 'Uzun süreli MSSA tedavisinde 3–5 günde bir INR kontrolü yapın; tek doz profilakside sorun oluşturmaz.',
        },
        {
          severity: 'C',
          agent: 'Aminoglikozidler (Amikasin / Gentamisin)',
          mechanism: 'Aynı IV torbada fizikokimyasal inaktivasyon + aditif renal tübüler stres',
          clinicalEffect: 'Aynı hattan/torbadan karıştırılırsa aminoglikozid inaktive olur.',
          management: 'Farklı IV hatlardan uygulayın; böbrek fonksiyonlarını izleyin.',
        },
      ],
      references: [
        {
          authors: 'Bratzler DW, Dellinger EP, Olsen KM, et al.',
          title: 'Clinical practice guidelines for antimicrobial prophylaxis in surgery (ASHP/IDSA/SIS/SHEA)',
          journal: 'Am J Health Syst Pharm',
          year: 2013,
          note: 'Cerrahi profilakside Sefazolin 2 g (<120 kg) / 3 g (≥120 kg), 30–60 dk pre-insizyon ve 4 saat / >1500 mL redozaj temel kılavuzu.',
        },
        {
          authors: 'Khan DA, Banerji A, Blumenthal KG, et al.',
          title: 'Drug allergy: A 2022 practice parameter update (AAAAI/ACAAI Joint Task Force)',
          journal: 'J Allergy Clin Immunol',
          year: 2022,
          note: 'Penisilin alerjisi öyküsü olan hastalarda sefazolinin benzersiz R1 yan zinciri nedeniyle rutin test gerekmeden güvenle uygulanabileceğini kanıtlar.',
        },
        {
          authors: 'McDanel JS, Roghmann MC, Perencevich EN, et al.',
          title: 'Comparative effectiveness of cefazolin versus nafcillin or oxacillin for treatment of methicillin-susceptible Staphylococcus aureus infections',
          journal: 'Clin Infect Dis',
          year: 2017,
          note: 'MSSA bakteriyemisinde Sefazolinin antistafilokokal penisilinlere kıyasla daha düşük mortalite ve daha az nefrotoksisite sağladığını gösterir.',
        },
      ],
      drugsComUrl: 'https://www.drugs.com/drug-interactions/cefazolin.html',
      medscapeUrl: 'https://reference.medscape.com/drug-interactionchecker',
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 2. AMPİSİLİN-SULBAKTAM (AMPICILLIN-SULBACTAM)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'ampicillin-sulbactam',
    classTag: 'beta_lactam',
    accentColor: 'teal',
    atcCode: 'J01CR01',
    classLabel: 'Aminopenisilin + β-Laktamaz İnhibitörü (2:1) · Yüksek Doz CRAB',
    tradeNamesTr: 'Alfasid® · Combicid® · Duobaktam® · Ampisid® (1,5 g & 3 g Flakon)',
    title: 'Ampisilin-Sulbaktam Monografisi',
    cardTitle: 'Ampisilin-Sulbaktam',
    cardBadge: 'Profilaksi q2sa · CRAB 6–9 g Sulbaktam',
    cardCategoryLabel: 'β-Laktam · BL/BLI (2:1 Oran)',
    cardShortDesc:
      'Perioperatif abdominal/KBB/obstetrik profilaksi (3 g IV, q2sa redozaj), aspirasyon pnömonisi ve YBÜ’de karbapenem-dirençli Acinetobacter baumannii (CRAB) için yüksek doz (6–9 g/gün sulbaktam) uzamış infüzyon.',
    cardHighlights: [
      {
        label: 'Profilaksi & Redozaj',
        value: '3 g IV · Her 2 saat',
        subtext: 'Kısa t½ (~1 sa) → sık redozaj!',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30',
      },
      {
        label: 'YBÜ CRAB (IDSA 2024)',
        value: '9 g q8sa (4 sa EI)',
        subtext: 'Toplam 9 g/gün SULBAKTAM',
        colorClass: 'text-sky-700 dark:text-sky-300',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
      {
        label: 'Sodyum Yükü Uyarısı',
        value: '~10 mEq Na⁺ / 3 g',
        subtext: 'CRAB dozunda ~90 mEq Na⁺/gün!',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
    ],
    aliases: ['ampisilin sulbaktam', 'ampicillin sulbactam', 'sam', 'alfasid', 'combicid', 'duobaktam'],
    searchKeywords: [
      'ampisilin',
      'sulbaktam',
      'alfasid',
      'combicid',
      'duobaktam',
      'crab',
      'acinetobacter',
      'aspirasyon',
      'profilaksi',
      'sodyum',
      '2 saat redozaj',
    ],
    highAlert: {
      tallManName: 'ampiCILLin-sulbactam',
      confusionRiskWith: 'amoxicillin-clavulanate · piperacillin-tazobactam',
      criticalAlerts: [
        '2:1 SABİT ORAN DOZ KARIŞIKLIĞI: 3 g flakon = 2 g ampisilin + 1 g sulbaktam; 1,5 g flakon = 1 g ampisilin + 0,5 g sulbaktam içerir! IDSA 2024 CRAB hedefi "6–9 g/gün SULBAKTAM"dır — bu da 18–27 g/gün TOPLAM Ampisilin-Sulbaktam (3 g q4sa veya 9 g q8sa) demektir!',
        'KISA YARI ÖMÜR (t½ ≈ 1 SAAT) — CERRAHİDE 2 SAATTE BİR REDOZAJ: Sefazolin (4 saat) ile karıştırıp redozajı geciktirmek intraoperatif doku düzeyini hızla sıfırlar!',
        'YÜKSEK SODYUM YÜKÜ (~10 mEq Na⁺ / 3 g flakon): Yüksek doz CRAB rejiminde (27 g/gün = 9 flakon) günde ~90 mEq (~2,1 g) ekstra sodyum verilir — hipernatremi, kalp yetmezliği ve ARDS sıvı yüklenmesini yakından izleyin!',
        'SULANDIRMA SONRASI KISA STABİLİTE (ODA SICAKLIĞINDA 1–8 SAAT): Özellikle %5 Dekstroz içinde ampisilin hızla hidrolize olup potens kaybeder (2 saat!); uzamış 4 saatlik infüzyonlar MUTLAKA %0,9 NaCl (SF) ile hazırlanmalıdır!',
      ],
      antidoteOrRescue:
        'Anafilakside infüzyonu durdurup IV/IM Adrenalin + sıvı + hava yolu yönetimi uygulayın. Yüksek doz CRAB rejiminde (27 g/gün) böbrek yetmezliği gelişirse aşırı birikime bağlı nöbet gelişebilir → ilacı kesin, benzodiazepin verin; ampisilin ve sulbaktam hemodiyalizle etkin biçimde uzaklaştırılır.',
    },
    identitySummary:
      'Ampisilin-sulbaktam, aminopenisilin (ampisilin) ile sınıf A β-laktamaz inhibitörü (sulbaktam) 2:1 oranında sabit kombinasyonudur. Baş-boyun, jinekoloji ve üst/alt GIS profilaksisi, aspirasyon pnömonisi, Enterococcus faecalis ve anaerobik mikst enfeksiyonlarda güçlüdür; ayrıca sulbaktamın Acinetobacter baumannii PBP1/PBP3 üzerindeki doğrudan bakterisidal aktivitesi sayesinde yüksek dozlarda CRAB tedavisinin temel taşlarından biridir.',
    spectrumHighlights: [
      {
        title: 'Güçlü Kapsama (Anaerob + Enterokok + CRAB)',
        detail:
          'MSSA, Streptococcus spp., Enterococcus faecalis (ampisiline duyarlı), B. fragilis dahil oral/abdominal anaeroblar ve yüksek doz sulbaktam (6–9 g/gün) ile Acinetobacter baumannii (CRAB).',
        tone: 'emerald',
      },
      {
        title: 'Kısıtlı / Dirençli Gram-Negatifler',
        detail:
          'Toplum ve hastane kökenli E. coli suşlarında direnç oranları %40–60’a ulaştığından komplike intra-abdominal sepsis veya ürosepsiste ampirik tek ajan olarak önerilmez.',
        tone: 'amber',
      },
      {
        title: 'Kesin Spektrum Boşlukları (Etkisiz)',
        detail:
          'Pseudomonas aeruginosa, MRSA, AmpC üreten Enterobacterales (Enterobacter, Serratia, Citrobacter), ESBL ve KPC/OXA-48 karbapenemaz üreten suşlara ETKİSİZDİR.',
        tone: 'rose',
      },
    ],
    mechanismSummary:
      'Ampisilin bakteri PBP’lerine bağlanarak hücre duvarı sentezini bloke eder; sulbaktam ise birçok sınıf A β-laktamazı (Stafilokokal penisilinaz, TEM-1, SHV-1, B. fragilis β-laktamazı) geri dönüşsüz (intihar inhibitörü) inaktive ederek ampisilini hidrolizden korur. Benzersiz olarak sulbaktam, Acinetobacter baumannii’nin PBP1 ve PBP3 hedeflerine doğrudan bağlanarak intrinsik bakterisidal etki gösterir.',
    mechanismPillars: [
      {
        title: 'Sınıf A β-Laktamaz İntihar İnhibisyonu',
        detail:
          'Sulbaktam, β-laktamaz aktif serin bölgesini açilleyip kararlı enamin/imin ara ürünlerine dönüşerek enzimi kalıcı olarak devre dışı bırakır; ampisilinin spektrumunu MSSA ve B. fragilis’e genişletir.',
      },
      {
        title: 'Sulbaktamın İntrinsik Anti-Acinetobacter Etkisi',
        detail:
          'Acinetobacter baumannii’ye karşı esas aktif bileşen ampisilin değil SULBAKTAM’dır; 6–9 g/gün sulbaktam 4 saatlik uzamış infüzyonla dirençli CRAB suşlarında bile %fT>MIC hedefini yakalar.',
      },
      {
        title: 'Hızlı Renal Klirens & Kısa Yarı Ömür',
        detail:
          'Hem ampisilin hem sulbaktam ~1 saatlik t½’ye sahiptir; bu nedenle cerrahi profilakside 2 saatte bir redozaj ve YBÜ CRAB’da uzamış infüzyon (EI) zorunludur.',
      },
    ],
    pkCards: [
      {
        label: 'Yarı Ömür (t½)',
        value: '1,0 – 1,3 saat',
        detail: 'Her iki bileşen benzer PK profili sergiler; eGFR <15 mL/dk’da 6–10 saate uzar.',
      },
      {
        label: 'Protein Bağlanması',
        value: 'Amp %28 · Sulb %38',
        detail: 'Düşük protein bağlanması sayesinde yüksek serbest ilaç fraksiyonu ve iyi doku dağılımı.',
      },
      {
        label: 'Doku Penetrasyonu',
        value: 'Plevra, Periton, Safra',
        detail: 'Peritoneal sıvı, safra, akciğer parankimi ve mukozaya mükemmel geçer; inflame meninkslere orta düzeyde geçer.',
      },
      {
        label: 'Eliminasyon',
        value: '%75 – 85 Renal',
        detail: 'Glomerüler filtrasyon + tübüler sekresyon; her iki bileşen birlikte renal olarak ayarlanır.',
      },
    ],
    contraindications: {
      absoluteItems: [
        'Penisilinlere, β-laktamaz inhibitörlerine veya diğer β-laktamlara karşı ağır IgE-aracılı anafilaksi öyküsü.',
        'Ampisilin-sulbaktam kullanımına bağlı kolestatik sarılık veya hepatik disfonksiyon öyküsü.',
        'Şiddetli gecikmiş kütanöz reaksiyon (SJS/TEN/DRESS) öyküsü.',
      ],
      relativeItems: [
        'Enfeksiyöz mononükleoz (EBV) veya kronik lenfositik lösemi — ampisilin ile %70–90 oranında non-alerjik yaygın makülopapüler döküntü gelişir.',
        'Ağır hipernatremi, dekompanse kalp yetmezliği veya ileri sıvı yüklenmesi (yüksek doz CRAB rejiminde ~90 mEq/gün Na⁺ yükü!).',
        'İleri böbrek yetmezliği (eGFR <30 mL/dk) — doz aralığı uzatılmazsa nöbet/ensefalopati riski.',
      ],
      clinicalNote:
        'Ampisilin-sulbaktam, sefazolinden farklı olarak doğrudan aminopenisilin içerir; doğrulanmış IgE-aracılı penisilin anafilaksisinde kullanılmamalıdır.',
    },
    regimenCards: [
      {
        title: 'Orta-Ağır Diyabetik Ayak Enfeksiyonu & Polimikrobiyal cSSTI',
        setting: 'core',
        badge: 'IDSA / IWGDF 1. Basamak',
        dose: '3 g IV',
        infusionDuration: '15–30 dk IV',
        interval: 'q6sa',
        note: 'Orta-ağır diyabetik ayak ülseri, hayvan/insan ısırık yaraları ve polimikrobiyal cilt-yumuşak doku enfeksiyonlarında MSSA, streptokok ve anaerobları tek ajanla kapsar. MRSA şüphesinde Vankomisin, Psödomonas riskinde antipsödomonal ajan eklenir.',
      },
      {
        title: 'Derin Boyun / Odontojenik Enfeksiyon & Peritonsiller Apse',
        setting: 'core',
        badge: 'KBB / Oral Anaerob 1. Tercih',
        dose: '3 g IV',
        infusionDuration: '15–30 dk IV',
        interval: 'q6sa',
        note: 'Ludwig anjini, parafaringeal/retrofaringeal apse, odontojenik derin boyun enfeksiyonu ve peritonsiller apsede oral streptokoklar, MSSA ve β-laktamaz üreten oral anaerobları (Prevotella, Fusobacterium, Peptostreptococcus) güçlü mukozal penetrasyonla kapsar.',
      },
      {
        title: 'Pelvik İnflamatuvar Hastalık (PID) / Endometrit / Koryoamniyonit',
        setting: 'core',
        badge: 'CDC / ACOG Obstetrik-Jinekoloji',
        dose: '3 g IV (+ Doksisiklin 100 mg q12sa)',
        infusionDuration: '15–30 dk IV',
        interval: 'q6sa',
        note: 'Hospitalize ağır PID tedavisinde CDC onaylı parenteral rejim (3 g IV q6sa + Doksisiklin 100 mg PO/IV q12sa — C. trachomatis kapsamı için!). Postpartum endometrit ve koryoamniyonitte polimikrobiyal aerob + anaerob kapsama sağlar.',
      },
      {
        title: 'Hastane Yatışlı Toplum Kökenli Pnömoni (TKP)',
        setting: 'core',
        badge: 'ATS / IDSA TKP 1. Basamak',
        dose: '1,5–3 g IV (+ Makrolid)',
        infusionDuration: '15–30 dk IV',
        interval: 'q6sa',
        note: 'Psödomonas riski taşımayan hastane yatışlı TKP’de (aspirasyon/akciğer apsesi şüphesinde 3 g q6sa) S. pneumoniae, H. influenzae, MSSA ve oral anaerobları kapsar; atipik patojenler için mutlaka Makrolid (Azitromisin/Klaritromisin) veya Doksisiklin ile kombine edilir.',
      },
      {
        title: 'Perioperatif Cerrahi Profilaksi (KBB / GIS / Obstetrik)',
        setting: 'perioperative',
        badge: 'ASHP/IDSA · q2sa Redozaj',
        dose: '3 g IV',
        infusionDuration: '15–30 dk IV',
        interval: 'q2sa redozaj',
        note: 'İnsizyondan 30–60 dk önce 3 g IV (2 g ampisilin + 1 g sulbaktam). Kısa t½ nedeniyle ameliyat >2 saat sürerse veya kan kaybı >1500 mL olursa 3 g IV tekrarlanır.',
      },
      {
        title: 'Aspirasyon Pnömonisi / İntra-Abdominal / Yumuşak Doku',
        setting: 'icu',
        badge: 'Standart YBÜ',
        dose: '3 g IV',
        infusionDuration: '30 dk IV',
        interval: 'q6sa',
        note: 'Toplam 12 g/gün (8 g ampisilin + 4 g sulbaktam). Oral anaeroblar, streptokoklar ve MSSA’yı tek ajanla kapsar.',
      },
      {
        title: 'YBÜ Yüksek Doz CRAB (Acinetobacter) — IDSA 2024',
        setting: 'icu',
        badge: '9 g/gün SULBAKTAM · EI',
        dose: '9 g IV (3× 3 g flakon)',
        infusionDuration: '4 saat (EI)',
        interval: 'q8sa',
        note: 'IDSA 2024 AMR kılavuzu (Sulbaktam-Durlobaktam erişimi olmadığında): 9 g q8sa (4 saatlik uzamış infüzyon = 9 g/gün sulbaktam) veya alternatif olarak 3 g q4sa (6 g/gün sulbaktam), genellikle polimiksin/tigesiklin/minocycline gibi ikinci aktif ajanla kombine edilir!',
      },
      {
        title: 'CRAB Alternatif Yüksek Doz (6 g/gün Sulbaktam)',
        setting: 'special',
        badge: '6 g/gün SULBAKTAM',
        dose: '3 g IV',
        infusionDuration: '30 dk – 3 sa',
        interval: 'q4sa',
        note: 'Toplam 18 g/gün Ampisilin-Sulbaktam (= 6 g/gün sulbaktam). 4 saatlik infüzyon için ayrı lümen yoksa pratik alternatiftir; yine %0,9 NaCl ile hazırlanmalıdır.',
      },
    ],
    calculator: {
      defaultWeightKg: 75,
      weightScalar: 'TBW',
      obesityRationale:
        'Standart ve yüksek doz rejimler sabittir; morbid obezitede (VKİ ≥40 kg/m²) artan dağılım hacmi ve renal klirens nedeniyle alt sınır (1,5 g) yerine tam 3 g doz ve uzamış infüzyon tercih edilir.',
      perioperative: {
        applicable: true,
        summaryTitle: 'Perioperatif Profilaksi (Baş-Boyun, Biliyer, Kolorektal, Jinekoloji)',
        timingWindow: 'İnsizyondan 30–60 dk önce',
        standardDoseLabel: '3 g IV (2 g ampisilin + 1 g sulbaktam)',
        adultStandardDoseMg: 3000,
        pediatricMgKg: 75,
        pediatricMaxMg: 3000,
        infusionTimeText: '15–30 dakikada IV infüzyon',
        redoseHours: 2,
        bloodLossRedoseMl: 1500,
        clinicalNote:
          'Pediatrik hesaplama 50 mg/kg ampisilin bileşeni (= 75 mg/kg toplam Amp-Sulb, maks 3 g) üzerinden yapılır. Kısa t½ sebebiyle 2 saatte bir redozaj unutulmamalıdır!',
      },
      icu: {
        pkPdTarget: 'Bileşenlerin %fT>MIC ≥ %50–70 (CRAB’da sulbaktam %fT>MIC ≥ %60, 4 saatlik uzamış infüzyon)',
        pkPdBadge: '%fT > MIC · EI 4 saat',
        loadingDoseLabel: '3 g IV (CRAB’da ilk 9 g uzamış infüzyon öncesi 3 g bolus opsiyonel)',
        loadingFixedMg: 3000,
        loadingUnit: 'mg',
        loadingInfusionText: '30 dakikada IV infüzyon (%0,9 NaCl içinde)',
        maintenanceLabel: 'YBÜ Standart & Yüksek Doz CRAB Rejimleri',
        maintenanceMode: 'fixed_regimen',
        fixedOptions: [
          {
            id: 'std_q6h',
            label: 'Standart YBÜ (Aspirasyon / İAİ / E. faecalis)',
            singleDoseMg: 3000,
            intervalHours: 6,
            infusionHours: 0.5,
            diluentVolumeMl: 100,
            note: 'Toplam 12 g/gün (4 g sulbaktam/gün). Na⁺ yükü ≈ 40 mEq/gün.',
          },
          {
            id: 'crab_6g_sulb',
            label: 'CRAB Yüksek Doz (6 g/gün Sulbaktam · q4sa)',
            singleDoseMg: 3000,
            intervalHours: 4,
            infusionHours: 1,
            diluentVolumeMl: 100,
            note: 'Toplam 18 g/gün Amp-Sulb (= 6 g/gün sulbaktam). Na⁺ yükü ≈ 60 mEq/gün. SF ile hazırlayın!',
          },
          {
            id: 'crab_9g_sulb_ei',
            label: 'CRAB Maksimum Doz (IDSA 2024: 9 g/gün Sulbaktam · 4 sa EI)',
            singleDoseMg: 9000,
            intervalHours: 8,
            infusionHours: 4,
            diluentVolumeMl: 250,
            note: 'Toplam 27 g/gün Amp-Sulb (= 9 g/gün sulbaktam). 3×3 g flakon 250 mL %0,9 NaCl içinde 4 saatte verilir (D5W KULLANILMAZ!). Na⁺ yükü ≈ 90 mEq/gün!',
          },
        ],
        specialConversionNote:
          '2:1 Oran Kuralı: Her 3 g Ampisilin-Sulbaktam flakonunda 2 g Ampisilin + 1 g Sulbaktam vardır. CRAB tedavisinde sulbaktam bileşeni 6–9 g/gün hedeflenir (= 18–27 g/gün toplam ilaç).',
      },
      renalTiers: [
        {
          id: 'egfr_30',
          label: 'Normal / Hafif-Orta',
          egfrRange: 'eGFR ≥ 30 mL/dk',
          recommendation: 'Tam Doz',
          doseText: 'Standart: 3 g q6sa | CRAB: 9 g q8sa (4 sa EI) veya 3 g q4sa',
          note: 'eGFR ≥30 mL/dk’da standart ve yüksek doz CRAB rejimleri tam uygulanır.',
          tone: 'emerald',
        },
        {
          id: 'egfr_15_29',
          label: 'İleri KBH / ABH',
          egfrRange: 'eGFR 15–29 mL/dk',
          recommendation: 'q12sa (CRAB: q8–12sa)',
          doseText: 'Standart: 3 g q12sa | CRAB: 3 g q6–8sa veya 6 g q12sa (4 sa EI)',
          note: 'CRAB’da sulbaktam hedefi 3–4 g/gün’e indirilir; serum Na⁺ ve nörotoksisite izlenir.',
          tone: 'amber',
        },
        {
          id: 'egfr_lt15',
          label: 'Ağır KBY (Diyalizsiz)',
          egfrRange: 'eGFR < 15 mL/dk',
          recommendation: 'q24sa (CRAB: q12sa)',
          doseText: 'Standart: 3 g q24sa | CRAB: 3 g q12sa (2 g sulbaktam/gün)',
          note: 't½ 6–10 saate uzar; yüksek dozda nöbet riski doğar.',
          tone: 'rose',
        },
      ],
      crrtSummary:
        'CRRT (CVVH/CVVHDF): Standart enfeksiyonlarda 3 g IV q8sa; CRAB enfeksiyonlarında yüksek eflüent klirensi nedeniyle 3 g IV q4–6sa veya 6 g q8sa (4 saat EI, ~4–6 g/gün sulbaktam) önerilir.',
      hdSummary:
        'Aralıklı Hemodiyaliz (IHD): Standart 3 g IV q24sa (diyaliz günlerinde seans bitiminde); CRAB’da 3 g IV q12sa (HD sonrası ek 3 g takviye ile).',
    },
    turkeyFormulations: {
      preparations: [
        {
          name: 'Alfasid® / Combicid® / Duobaktam® 1,5 g IV Flakon',
          presentation: '1 g ampisilin + 0,5 g sulbaktam toz flakon (2:1)',
          concentration: '1,5 g (0,5 g sulbaktam) · ~5 mEq Na⁺',
          saltOrBaseNote: 'Standart erişkin YBÜ ve profilaksi dozu 3 g’dır (iki adet 1,5 g flakon = bir adet 3 g flakon).',
          alertLevel: 'standard',
        },
        {
          name: 'Alfasid® / Combicid® 3 g IV Flakon (ve IM Lidokainli Form)',
          presentation: '2 g ampisilin + 1 g sulbaktam toz flakon (2:1)',
          concentration: '3 g (1 g sulbaktam) · ~10 mEq Na⁺',
          saltOrBaseNote: 'IM ambalajdaki lidokainli çözücü ASLA IV kullanılmaz! CRAB 9 g dozu için 3 adet 3 g IV flakon gerekir.',
          alertLevel: 'high',
        },
      ],
      standardDilutions: [
        'Standart / Profilaksi (3 g): 50–100 mL %0,9 NaCl içinde 15–30 dk IV infüzyon.',
        'CRAB 4 Saatlik Uzamış İnfüzyon (9 g = 3×3 g flakon): 250 mL %0,9 NaCl içinde (konsantrasyon 36 mg/mL ≤ maks 45 mg/mL) 62,5 mL/saat hızla 4 saatte infüze edilir.',
        'D5W UYARISI: %5 Dekstroz içinde stabilite oda sıcaklığında yalnızca 2 saattir — 4 saatlik EI kesinlikle %0,9 NaCl ile hazırlanmalıdır!',
      ],
      concentrationTrapWarning:
        '9 g’lık CRAB dozu hazırlanırken hem konsantrasyon (≤45 mg/mL → en az 200–250 mL SF) hem taşıyıcı sıvı (%0,9 NaCl, ASLA D5W değil!) hem de günlük ~90 mEq sodyum yükü kontrol edilmelidir.',
    },
    compatibility: {
      accessRequirement: 'peripheral-ok',
      accessSummary:
        'Standart 3 g dozlar periferik IV hattan güvenle verilir. CRAB 9 g (4 saatlik uzamış infüzyon) rejiminde yüksek ozmolalite ve uzun temas süresi nedeniyle geniş ven veya santral lümen tercih edilir.',
      phRange: '8,0 – 10,0 (Alkali!)',
      osmolalityNote: '3 g / 100 mL SF çözeltisi ~380–420 mOsm/kg; 9 g / 250 mL çözeltisi hiperozmolar ve alkalidir.',
      compatibleDiluents: ['%0,9 NaCl (SF — 1. tercih, 8 saat stabil)', 'Ringer Laktat (8 saat stabil)', '%5 Dekstroz (yalnızca kısa 30 dk infüzyon, 2 saat stabil!)'],
      ySiteCompatible: ['Fentanil', 'Midazolam', 'Heparin', 'İnsülin', 'Potasyum klorür', 'Kalsiyum glukonat'],
      ySiteIncompatible: ['Amikasin / Gentamisin', 'Siprofloksasin', 'Amiodaron', 'Nikardipin', 'Ondansetron', 'Dobutamin / Dopamin', 'Kaspofungin'],
      stabilityNote:
        '%0,9 NaCl içinde oda sıcaklığında 8 saat stabildir (4 saatlik EI için güvenlidir); %5 Dekstroz içinde yalnızca 2 saat stabildir!',
      extravasationProtocol:
        'Alkali pH (8–10) nedeniyle irritan özellik gösterir. Ekstravazasyonda infüzyonu durdurun, aspire edin, ekstremiteyi eleve edin ve soğuk kompres uygulayın.',
    },
    organImpairment: {
      renalSummary: 'Hem ampisilin hem sulbaktam %75–85 renal atılır — eGFR <30 mL/dk’da doz aralığı uzatılır; CRAB’da sulbaktam hedefi korunur.',
      renalDetails: [
        'eGFR 15–29 mL/dk: standart 3 g q12sa (CRAB: 3 g q6–8sa veya 6 g q12sa 4 sa EI); eGFR <15 mL/dk: standart 3 g q24sa (CRAB: 3 g q12sa).',
        'CRAB tedavisinde böbrek yetmezliğinde bile sulbaktam hedefini korumak için doz aşırı kırpılmamalı, eGFR ve CRRT eflüent hızına göre bireyselleştirilmelidir.',
        'Hemodiyaliz ampisilinin ~%35’ini, sulbaktamın ~%45’ini temizler; diyaliz günlerinde doz mutlaka seans bitiminde verilmelidir.',
        'Yüksek doz CRAB rejiminde (~60–90 mEq Na⁺/gün) böbrek yetmezliği ile birlikte hipernatremi, sıvı yüklenmesi ve nöbet riski yakından izlenmelidir.',
      ],
      hepaticSummary: 'Karaciğer yetmezliğinde rutin doz azaltımı GEREKMEZ; ancak yüksek sodyum yükü ve kolestatik hepatotoksisite izlenir.',
      hepaticDetails: [
        'Sirozlu hastalarda dekompanse asit/ödem varlığında yüksek sodyum yükü (~10 mEq / 3 g; CRAB’da ~90 mEq/gün) asiti ve sıvı retansiyonunu şiddetle ağırlaştırabilir.',
        'Nadir ilaç ilişkili kolestatik karaciğer hasarı (DILI) gelişirse derhal kesilmelidir.',
      ],
      renalMatrix: [
        {
          stage: 'ARC (eGFR > 130 mL/dk)',
          doseBadge: '3 g IV q6sa',
          severeDoseBadge: 'CRAB: 9 g IV q8sa (4 sa EI · 9 g/gün sulb)',
          note: 'Kısa yarı ömür (~1 sa) nedeniyle ARC’de standart 30 dk infüzyonlar doz sonunda hızla MIC altına düşer. CRAB’da mutlaka 9 g q8sa (4 saat EI, %0,9 NaCl içinde) uygulanmalı; cerrahi profilakside q2sa redozaj kesinlikle aksatılmamalıdır.',
          tone: 'indigo',
        },
        {
          stage: 'eGFR ≥ 30 mL/dk (Normal / Hafif-Orta)',
          doseBadge: '1,5–3 g IV q6sa (6–12 g/gün)',
          severeDoseBadge: 'CRAB: 9 g q8sa (4 sa EI) veya 3 g q4sa',
          note: 'Standart ve IDSA 2024 yüksek doz CRAB (6–9 g/gün sulbaktam = 18–27 g/gün toplam ilaç) rejimleri tam uygulanır. Günlük ~60–90 mEq Na⁺ yükü izlenir.',
          tone: 'emerald',
        },
        {
          stage: 'eGFR 15–29 mL/dk (İleri KBH / ABH)',
          doseBadge: '1,5–3 g IV q12sa',
          severeDoseBadge: 'CRAB: 3 g q6–8sa veya 6 g q12sa (4 sa EI)',
          note: 'Her iki bileşenin klirensi paralel azalır. CRAB’da sulbaktam hedefi 3–4 g/gün’e (9–12 g/gün toplam ilaç) çekilerek %fT>MIC korunurken birikim/nöbet ve hipernatremi önlenir.',
          tone: 'amber',
        },
        {
          stage: 'eGFR < 15 mL/dk (Ağır KBY · Diyalizsiz)',
          doseBadge: '1,5–3 g IV q24sa',
          severeDoseBadge: 'CRAB: 3 g IV q12sa (2 g/gün sulbaktam)',
          note: 't½ 6–10 saate uzar. Standart enfeksiyonlarda 3 g q24sa yeterlidir; CRAB’da 3 g q12sa (4 sa EI) ile günlük nörolojik muayene (nöbet/miyoklonus) ve serum Na⁺ takibi zorunludur.',
          tone: 'rose',
        },
        {
          stage: 'İntermittan Hemodiyaliz (IHD)',
          doseBadge: '3 g IV q24sa (HD sonrası)',
          severeDoseBadge: 'CRAB: 3 g q12sa (+ HD sonrası ek 3 g)',
          note: 'Ampisilin (~%35) ve sulbaktam (~%45) HD ile anlamlı oranda diyalizlenir. Standart enfeksiyonda günlük 3 g doz diyaliz günlerinde seans bitiminde uygulanır; CRAB’da 3 g q12sa verilir ve HD günlerinde seans sonrası ek 3 g takviye yapılır.',
          tone: 'amber',
        },
        {
          stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
          doseBadge: '20–25 mL/kg/sa: 3 g q8sa · ≥30: 3 g q6sa',
          severeDoseBadge: 'CRAB: 20–25: 3 g q6sa · ≥30: 3 g q4sa / 6 g q8sa (EI)',
          note: 'Düşük protein bağlanması (%28–38) nedeniyle CRRT ile yüksek oranda (eflüent bağımlı) temizlenir. 20–25 mL/kg/sa’de standart 3 g q8sa (CRAB 3 g q6sa); ≥30 mL/kg/sa yüksek eflüentte standart 3 g q6sa, CRAB’da 3 g q4sa veya 6 g q8sa (4 saat EI = 6 g/gün sulbaktam) gerekir.',
          tone: 'sky',
        },
        {
          stage: 'SLED / PIRRT (6–12 sa/gün)',
          doseBadge: '3 g IV q12sa (SLED sonrası ek 1,5–3 g)',
          severeDoseBadge: 'CRAB: 3 g IV q8sa (seans sonrası tam doz)',
          note: 'Uzamış 8–12 saatlik SLED seansı her iki bileşeni belirgin temizler; dozlardan biri mutlaka SLED seansı bitimine zamanlanır (CRAB’da 3 g q8sa veya 6 g q12sa EI).',
          tone: 'sky',
        },
        {
          stage: 'Periton Diyalizi (CAPD / APD)',
          doseBadge: 'Sistemik: 1,5–3 g IV q24sa',
          severeDoseBadge: 'CRAB: 3 g IV q12sa (Na⁺ / bilinç izle)',
          note: 'Periton diyalizi ile sistemik klirens düşüktür (<%10–15); eGFR <15 mL/dk rejimi uygulanır. ISPD 2022 kılavuzunda rutin IP peritonit ajanı değildir (peritonitte IP sefazolin/vankomisin + seftazidim/sefepim seçilir).',
          tone: 'amber',
        },
      ],
      hepaticMatrix: [
        {
          childPugh: 'Child-Pugh A (5–6 Puan · Hafif)',
          badge: 'Doz Ayarı Yok',
          detail: '%75–85 renal eliminasyon nedeniyle farmakokinetik doz değişikliği gerekmez. Nadiren geçici transaminaz/ALP yükselmesi görülebilir.',
          tone: 'emerald',
        },
        {
          childPugh: 'Child-Pugh B (7–9 Puan · Orta)',
          badge: 'Doz Ayarı Yok · Na⁺ İzle',
          detail: 'Standart ve CRAB dozları hepatik klirens açısından değiştirilmez; ancak her 3 g flakonda ~10 mEq (230 mg) sodyum bulunduğundan asit/ödemli hastalarda günlük Na⁺ ve kilo takibi yapılmalıdır.',
          tone: 'amber',
        },
        {
          childPugh: 'Child-Pugh C (10–15 Puan · Dekompanse)',
          badge: 'Na⁺ Yükü & DILI Uyarısı',
          detail: 'Metabolik doz kısıtlaması yoktur ancak 27 g/gün CRAB rejimi günde ~90 mEq (~2,1 g) sodyum yükleyerek refrakter asiti, plevral efüzyonu ve hipernatremiyi şiddetle ağırlaştırır! Kolestatik DILI sinyali gelişirse derhal kesilir.',
          tone: 'rose',
        },
      ],
      dualOrganNote:
        'Dekompanse siroz (Child-Pugh C) + böbrek yetmezliği (HRS / eGFR <30) birlikteliğinde Ampisilin-Sulbaktam’ın yüksek sodyum yükü (~10 mEq / 3 g; CRAB’da ~60–90 mEq/gün) hem refrakter asit/ödemi hem de üremik ensefalopati zemininde nöbet riskini katlar. Bu hastalarda eGFR’ye göre kesin doz indirimi yapılmalı, serum Na⁺/K⁺ ve karaciğer enzimleri günlük izlenmeli, hipernatremi veya hipokalemi (hepatik ensefalopati tetikleyicisi) açısından aktif yönetim planlanmalıdır.',
    },
    geriatricObesity: {
      geriatricReductionBadge: 'eGFR & Na⁺ Takibi',
      geriatricPoints: [
        'Yaşlılarda azalmış renal rezerv ve kalp yetmezliği nedeniyle yüksek doz CRAB rejiminde (90 mEq Na⁺/gün) hipernatremi ve pulmoner ödem açısından günlük elektrolit/sıvı dengesi izlenmelidir.',
      ],
      obesityWeightScalarBadge: 'TBW · Sabit Üst Doz',
      obesityPoints: [
        'Morbid obezitede (≥120 kg) cerrahi profilakside 3 g tam doz + kesin 2 saatlik redozaj uyumu şarttır.',
        'YBÜ obez sepsis hastalarında 4 saatlik uzamış infüzyon %fT>MIC hedefini korur.',
      ],
      clinicalNote:
        'Hipernatremi eğilimli YBÜ hastalarında (Na⁺ >148 mEq/L) CRAB için 9 g q8sa yerine mümkünse Sulbaktam-Durlobaktam veya daha düşük Na⁺ yüklü alternatif rejim/hipotonik serbest su replasmanı planlanır.',
    },
    pregnancyLactation: {
      pregnancySummary: 'Gebelikte ve Obstetrik Enfeksiyonlarda Güvenle Kullanılır (Eski FDA B).',
      pregnancyDetails: [
        'Koryoamniyonit, post-sezaryen endometrit ve obstetrik cerrahi profilakside yaygın ve güvenli klinik deneyime sahiptir.',
        'Teratojenik etki bildirilmemiştir.',
      ],
      lactationSummary: 'Emzirme ile Uyumlu (LactMed).',
      lactationDetails: [
        'Anne sütüne eser miktarda geçer; bebekte nadiren hafif yumuşak dışkı veya oral pamukçuk yapabilir ancak emzirme güvenle sürdürülür.',
      ],
    },
    adverseEffects: [
      {
        title: 'Hipernatremi & Sıvı Yüklenmesi (CRAB Dozu)',
        incidenceOrSeverity: 'Yüksek Dozda Sık',
        detail:
          'Her 3 g flakonda ~10 mEq Na⁺ bulunur; 9 g q8sa rejiminde günde ~90 mEq sodyum yüklenerek kalp yetmezliği, ödem ve hipernatremiyi tetikler.',
        tone: 'amber',
      },
      {
        title: 'İshal & C. difficile Koliti',
        incidenceOrSeverity: '%3–10',
        detail:
          'Güçlü anaerobik aktivitesi nedeniyle bağırsak florasını bozarak antibiyotik ilişkili ishal ve C. difficile riskini artırır.',
        tone: 'amber',
      },
      {
        title: 'Hipersensitivite, Döküntü & Anafilaksi',
        incidenceOrSeverity: '%2–5 (EBV’de >%70)',
        detail:
          'Makülopapüler döküntü, ürtiker veya IgE-aracılı anafilaksi; EBV enfeksiyonunda non-alerjik yaygın döküntü gelişir.',
        tone: 'rose',
      },
      {
        title: 'Hepatotoksisite (Kolestatik) & Nörotoksisite',
        incidenceOrSeverity: 'Nadir (<%2)',
        detail:
          'Geçici transaminaz/ALP artışı ve ileri böbrek yetmezliğinde yüksek doz birikimine bağlı miyoklonus/nöbet görülebilir.',
        tone: 'indigo',
      },
    ],
    specialClinicalCautions: [
      {
        title: 'IDSA 2024 CRAB Stratejisi (Kombinasyon Kuralı)',
        detail:
          'Sulbaktam-Durlobaktam erişimi olmadığında yüksek doz Ampisilin-Sulbaktam (6–9 g/gün sulbaktam) CRAB için omurga ajandır ve mutlaka en az bir diğer aktif ajanla (Polimiksin B/Kolistin, Minosiklin, Tigesiklin veya Sefiderokol) kombine edilmelidir.',
      },
      {
        title: 'İntraoperatif 2 Saatlik Redozaj Hatırlatması',
        detail:
          'Sefazolinle alışkanlık sonucu 4 saat beklenmesi cerrahi profilaksinin başarısız olmasına yol açar; Ampisilin-Sulbaktam ameliyat 2 saati geçtiği anda redoze edilmelidir.',
      },
      {
        title: 'Alkali pH & Aminoglikozid İnaktivasyonu',
        detail:
          'Aynı IV hattan/torbadan Amikasin veya Gentamisin ile karıştırılırsa aminoglikozid molekülü kimyasal olarak inaktive olur; ayrı lümen veya araya SF yıkaması zorunludur.',
      },
      {
        title: 'Yalancı Pozitif İdrar Glukoz & Coombs Testi',
        detail:
          'Yüksek doz ampisilin direk Coombs testinde yalancı pozitiflik (nadiren immün hemolitik anemi) yapabilir.',
      },
    ],
    deepPharmacodynamics: {
      receptorMechanism: {
        title: 'Çift Hedef: Ampisilin PBP Blokajı + Sulbaktam Enzim/PBP Bağlanması',
        summary:
          'Ampisilin bakteriyel PBP1a/1b/2/3’ü açillerken, penisilanik asit sülfon yapısındaki sulbaktam β-laktamazları bloke eder ve Acinetobacter’de doğrudan PBP1/PBP3’ü hedefler.',
        points: [
          'Sulbaktamın Acinetobacter baumannii PBP1 ve PBP3’e yüksek afinitesi, β-laktamaz inhibitörleri arasında benzersiz bir doğrudan antibakteriyel mekanizma sağlar.',
          'Ancak Acinetobacter’de ADC (AmpC) ve OXA-23/24/58 β-laktamazların aşırı ekspresyonu sulbaktamı da hidrolize edebilir; bu direnci aşmak için 6–9 g/gün sulbaktam + 4 saat uzamış infüzyon gerekir.',
        ],
      },
      intracellularSignaling: {
        title: 'Peptidoglikan Çapraz Bağ İnhibisyonu & Filamentasyon',
        summary:
          'PBP3 inhibisyonu septasyonun durmasına ve bakteriyel filamentasyona, PBP1 blokajı ise hızlı otolitik parçalanmaya yol açar.',
        points: [
          'Sulbaktam, β-laktamaz aktif merkezindeki serin ile açil-enzim oluşturduktan sonra sülfon halkası açılarak enzimi kalıcı (irreversible) inaktive eder.',
          'Yüksek doz sulbaktam maruziyeti CRAB suşlarında hücre duvarı sentezini durdurarak polimiksin veya tigesiklinin penetrasyonunu sinerjistik olarak artırabilir.',
        ],
      },
      tissueOrganSystems: [
        {
          systemTitle: 'Akciğer Parankimi & ELF (VAP / Aspirasyon)',
          tissueTarget: 'Epitel Örtü Sıvısı',
          accent: 'teal',
          points: [
            'Sulbaktamın akciğer epitel örtü sıvısına (ELF) geçişi %50–60 düzeyindedir; 4 saatlik uzamış infüzyon VAP’ta hedef PK/PD olasılığını (PTA) belirgin artırır.',
            'Oral flora anaerobları (Peptostreptococcus, Prevotella, Fusobacterium) için aspirasyon pnömonisinde altın standarttır.',
          ],
        },
        {
          systemTitle: 'Periton, Safra & Jinekolojik Dokular',
          tissueTarget: 'İntra-Abdominal Odaklar',
          accent: 'sky',
          points: [
            'Peritoneal sıvıda serum düzeylerinin %70–90’ına ulaşır; biliyer obstrüksiyon yoksa safra konsantrasyonu yüksektir.',
            'Komplike kolesistit ve pelvik inflamatuvar hastalıkta polimikrobiyal (aerob + anaerob) kapsama sağlar.',
          ],
        },
        {
          systemTitle: 'Sıvı-Elektrolit & Kardiyovasküler Sistem',
          tissueTarget: 'Sodyum Yükü (Na⁺)',
          accent: 'amber',
          points: [
            'Her 3 g flakon ~10 mEq (230 mg) Na⁺ içerir; 27 g/gün CRAB protokolünde ~90 mEq/gün Na⁺ hipernatremi ve kalp yetmezliği dekompansasyonuna yol açabilir.',
            'Yüksek doz penisilin anyonu distal nefronda non-reabsorbe anyon etkisiyle potasyum kaybını (hipokalemi) artırabilir.',
          ],
        },
        {
          systemTitle: 'Renal Tübüler & SSS Etkileri',
          tissueTarget: 'OAT1/3 & GABA-A',
          accent: 'rose',
          points: [
            'Her iki bileşen proksimal tübül OAT sisteminden atılır; akut interstisyel nefrit nadirdir ancak döküntü/eozinofili ile gelişebilir.',
            'eGFR <15 mL/dk’da 27 g/gün gibi aşırı dozlar GABA-A inhibisyonu yoluyla jeneralize tonik-klonik nöbet tetikler.',
          ],
        },
      ],
      synergyAndCeiling: {
        title: 'Uzamış İnfüzyon (EI) PK/PD Kazancı & Sinerji',
        summary:
          'CRAB tedavisinde sulbaktam MIC’si sıklıkla 8–32 mcg/mL gibi yüksektir; 30 dk infüzyonla %fT>MIC hedefi sağlanamazken 4 saatlik EI (9 g q8sa) hedefe ulaşmayı mümkün kılar.',
        points: [
          'Klinik çalışmalarda CRAB pnömonisi/bakteriyemisinde yüksek doz sulbaktam tabanlı kombinasyonlar kolistin monoterapisine kıyasla daha düşük nefrotoksisite ve benzer/daha iyi mortalite göstermiştir.',
          'Allopurinol ile birlikte kullanımda ampisiline bağlı cilt döküntüsü insidansı 2–3 kat artar.',
        ],
      },
      clinicalPearls: [
        'CRAB reçete ederken order’a hem toplam flakonu hem sulbaktam eşdeğerini yazın: "Ampisilin-Sulbaktam 9 g (= 3 g sulbaktam) 250 mL SF içinde 4 saatte IV q8sa → Toplam 9 g/gün sulbaktam".',
        'Uzamış infüzyonda asla %5 Dekstroz kullanmayın — ampisilin dekstrozda 2 saat içinde hızla yıkılır!',
        'KBB, özofagus veya safra ameliyatı 2 saati geçtiği anda kırmızı alarm: 3 g ek doz uygulayın.',
      ],
    },
    referencesAndInteractions: {
      drugName: 'Ampisilin-Sulbaktam',
      structuredInteractions: [
        {
          severity: 'D',
          agent: 'Metotreksat (Yüksek Doz)',
          mechanism: 'Renal OAT tübüler sekresyon rekabeti',
          clinicalEffect: 'Metotreksat klirensi azalır; ciddi miyelosüpresyon, mukozit ve hepatotoksisite riski doğar.',
          management: 'Yüksek doz metotreksat ile birlikte kullanımdan kaçının; zorunluysa MTX düzeyi ve lökovorin kurtarmasını yakından izleyin.',
        },
        {
          severity: 'C',
          agent: 'Allopurinol',
          mechanism: 'İmmünomodülatör / hiperürisemi etkileşimi',
          clinicalEffect: 'Ampisilin ilişkili makülopapüler cilt döküntüsü riskini %20’nin üzerine çıkarır.',
          management: 'Döküntü gelişirse gerçek IgE alerjisinden ayırt edin ve gerekirse antibiyotiği değiştirin.',
        },
        {
          severity: 'C',
          agent: 'Aminoglikozidler (Aynı Y-Hat / Torba)',
          mechanism: 'β-laktam halkasının aminoglikozid amino grubuna nükleofilik saldırısı',
          clinicalEffect: 'Aynı çözeltide aminoglikozidin kimyasal inaktivasyonu.',
          management: 'Ayrı IV lümenlerden veya arada SF flush ile uygulayın.',
        },
      ],
      references: [
        {
          authors: 'Tamma PD, Heil EL, Justo JA, Mathers AJ, Satlin MJ, Bonomo RA.',
          title: 'Infectious Diseases Society of America 2024 Guidance on the Treatment of Antimicrobial-Resistant Gram-Negative Infections',
          journal: 'Clin Infect Dis',
          year: 2024,
          note: 'CRAB tedavisinde yüksek doz Ampisilin-Sulbaktam (6–9 g/gün sulbaktam; 9 g q8sa 4 saat EI) ve kombinasyon stratejisinin birincil kılavuzu.',
        },
        {
          authors: 'Bratzler DW, Dellinger EP, Olsen KM, et al.',
          title: 'Clinical practice guidelines for antimicrobial prophylaxis in surgery (ASHP/IDSA/SIS/SHEA)',
          journal: 'Am J Health Syst Pharm',
          year: 2013,
          note: 'Cerrahi profilakside Ampisilin-Sulbaktam 3 g IV ve 2 saatlik intraoperatif redozaj kılavuzu.',
        },
        {
          authors: 'Metlay JP, Waterer GW, Long AC, et al.',
          title: 'Diagnosis and Treatment of Adults with Community-acquired Pneumonia (ATS/IDSA Guideline)',
          journal: 'Am J Respir Crit Care Med',
          year: 2019,
          note: 'Aspirasyon pnömonisi ve YBÜ TKP yönetiminde β-laktam/BLI konumlandırması.',
        },
      ],
      drugsComUrl: 'https://www.drugs.com/drug-interactions/ampicillin-sulbactam.html',
      medscapeUrl: 'https://reference.medscape.com/drug-interactionchecker',
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 3. SEFTRİAKSON (CEFTRIAXONE)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'ceftriaxone',
    classTag: 'beta_lactam',
    accentColor: 'cyan',
    atcCode: 'J01DD04',
    classLabel: '3. Kuşak Sefalosporin · Çift Eliminasyon (Renal Ayarsız)',
    tradeNamesTr: 'Rocephin® · Novosef® · İesef® · Desefin® (1 g IV/IM Flakon)',
    title: 'Seftriakson Sodyum Monografisi',
    cardTitle: 'Seftriakson (Ceftriaxone)',
    cardBadge: 'Renal Doz Ayarı YOK · Ca²⁺ YASAK!',
    cardCategoryLabel: 'β-Laktam · 3. Kuşak Sefalosporin',
    cardShortDesc:
      'Uzun yarı ömürlü (q24sa; menenjitte 2 g q12sa), böbrek yetmezliğinde doz ayarı gerektirmeyen 3. kuşak sefalosporin. Yenidoğanda Ca²⁺ ile ölümcül çökelti (MUTLAK KONTRENDİKE!) ve Psödomonas/Enterokok/MRSA boşluğu.',
    cardHighlights: [
      {
        label: 'Renal / CRRT Ayarı',
        value: 'DOZ AYARI YOK',
        subtext: '%50 Renal + %50 Biliyer atılım',
        colorClass: 'text-emerald-700 dark:text-emerald-300',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'Kalsiyum / RL Uyarısı',
        value: 'Yenidoğan: YASAK!',
        subtext: 'Erişkinde aynı Y-hat/RL YASAK',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'Spektrum Boşluğu',
        value: 'Psödo / Entero / MRSA',
        subtext: 'Tamamına ETKİSİZDİR!',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
    ],
    aliases: ['seftriakson', 'ceftriaxone', 'rocephin', 'novosef', 'iesef', 'desefin'],
    searchKeywords: [
      'seftriakson',
      'ceftriaxone',
      'rocephin',
      'novosef',
      'iesef',
      'menenjit',
      'kalsiyum',
      'ringer laktat',
      'safra çamuru',
      'yenidoğan',
      'tkp',
    ],
    highAlert: {
      tallManName: 'cefTRIAXone',
      confusionRiskWith: 'ceFAZolin · cefTAZidime · cefEPime',
      criticalAlerts: [
        'YENİDOĞANLARDA (≤28 GÜN) KALSİYUM İÇEREN IV SIVILARLA ÖLÜMCÜL ÇÖKELTİ (FDA BLACK BOX!): Ringer Laktat, TPN veya IV CaGlukonat alan ≤28 günlük yenidoğanlarda FARKLI DAMAR YOLLARINDAN DAHİ OLSA seftriakson uygulanması akciğer ve böbrek kapillerlerinde ölümcül kalsiyum-seftriakson kristalleri oluşturur — MUTLAK KONTRENDİKE (yerine Sefotaksim kullanın)!',
        'ERİŞKİNLERDE AYNI Y-HATTAN / RİNGER LAKTAT İLE ASLA VERME: Erişkinlerde farklı lümenlerden veya ara yıkama (SF flush) yapılarak ardışık verilebilir; ancak seftriakson ASLA Ringer Laktat/Hartmann içinde sulandırılmaz ve kalsiyum/TPN giden lümenden verilmez!',
        'PSÖDOMONAS, ENTEROKOK, LİSTERİA VE MRSA’YA ETKİSİZDİR: Hastane kökenli pnömoni (VAP/HAP) veya nötropenik ateşte ampirik seçilmesi ölümcül tedavi başarısızlığına yol açar; menenjitte >50 yaş veya immünsüprese hastada mutlaka Ampisilin (Listeria için) + Vankomisin eklenmelidir!',
        'LİDOKAİNLİ IM FLAKON TUZAĞI: Türkiye’de 1 g IM flakonlar %1 lidokain çözücü ile satılır — ASLA IV uygulanmaz!',
      ],
      antidoteOrRescue:
        'Anafilakside standart Adrenalin + sıvı protokolü uygulanır. Seftriakson hemodiyaliz ve periton diyalizi ile ANLAMLI DÜZEYDE ATILMAZ (yüksek protein bağlanması %85–95); doz aşımında destekleyici tedavi esastır. Biliyer psödolitiyazis gelişirse ilacın kesilmesiyle çökeltiler haftalar içinde spontan erir.',
    },
    identitySummary:
      'Seftriakson, yüksek Gram-negatif (Enterobacterales, Neisseria, H. influenzae) ve güçlü anti-pnömokokal aktiviteye, mükemmel BOS geçişine ve ~8 saatlik uzun yarı ömre sahip 3. kuşak parenteral sefalosporindir. Çift (renal + biliyer) eliminasyonu sayesinde böbrek yetmezliğinde doz ayarı gerektirmez; toplum kökenli pnömoni (TKP), bakteriyel menenjit, spontan bakteriyel peritonit (SBP) ve biliyer/kolorektal profilakside temel ajandır.',
    spectrumHighlights: [
      {
        title: '1. Basamak Hedefler (Menenjit · TKP · SBP)',
        detail:
          'Streptococcus pneumoniae (BOS geçişi mükemmel), Neisseria meningitidis/gonorrhoeae, H. influenzae, toplum kökenli E. coli, Klebsiella ve Proteus. Günde tek doz (menenjitte q12sa) kullanım avantajı.',
        tone: 'emerald',
      },
      {
        title: 'Kalsiyum Geçimsizliği & Safra Çamuru',
        detail:
          'Yüksek biliyer sekresyonu nedeniyle safra kesesinde kalsiyum-seftriakson tuzu çökelerek geçici biliyer çamur/psödolitiyazis ve nadiren nefrolitiyazis yapabilir; IV Ca²⁺/RL ile fiziksel uyumsuzdur.',
        tone: 'amber',
      },
      {
        title: 'Kritik Boşluklar (Psödomonas / Enterokok / MRSA / ESBL)',
        detail:
          'Pseudomonas aeruginosa, Enterococcus spp., MRSA, Listeria monocytogenes, ESBL/AmpC üreten suşlar ve B. fragilis anaeroblarına ETKİSİZDİR!',
        tone: 'rose',
      },
    ],
    mechanismSummary:
      'Bakteriyel PBP1, PBP2 ve PBP3’e yüksek afinite ile bağlanarak peptidoglikan sentezini durdurur ve zamana bağımlı (%fT>MIC) bakterisidal etki gösterir. Oksimino-aminotiyazolil R1 yan zinciri sayesinde birçok sınıf A β-laktamaza (TEM-1, SHV-1) dayanıklıdır; ancak ESBL ve AmpC β-laktamazlar tarafından hidrolize edilir.',
    mechanismPillars: [
      {
        title: 'Yüksek BOS Penetrasyonu & Anti-Pnömokokal Güç',
        detail:
          'İnflamasyonlu meninkslere serum düzeyinin %8–16’sı oranında geçer; 2 g q12sa rejimi penisiline orta dirençli S. pneumoniae ve N. meningitidis için sterilizan BOS konsantrasyonu sağlar.',
      },
      {
        title: 'Çift Eliminasyon (Renal %50–60 + Biliyer %40–50)',
        detail:
          'Böbrek fonksiyonu düştüğünde biliyer atılım telafi edici olarak artar; bu nedenle izole böbrek yetmezliğinde veya CRRT’de birikim olmaz ve doz azaltımı gerekmez.',
      },
      {
        title: 'Konsantrasyona Bağlı Doyurulabilir Albümin Bağlanması',
        detail:
          'Düşük dozlarda %95, yüksek dozlarda %85 oranında albümine bağlanır; ağır hipoalbüminemik YBÜ hastalarında (albümin <2 g/dL) serbest klirens artarak 1 g q24sa dozunun yetersiz kalmasına yol açabilir (2 g q24sa veya 1 g q12sa tercih edilir!).',
      },
    ],
    pkCards: [
      {
        label: 'Yarı Ömür (t½)',
        value: '6 – 9 saat',
        detail: 'Sefalosporinler arasında en uzun yarı ömür; günde tek doz (menenjitte q12sa) rejime olanak tanır.',
      },
      {
        label: 'Protein Bağlanması',
        value: '%85 – 95 (Doyurulabilir)',
        detail: 'Yüksek albümin bağlanması nedeniyle yenidoğanda bilirubini yerinden oynatabilir; YBÜ hipoalbüminemisinde serbest klirens artar!',
      },
      {
        label: 'BOS & Safra Geçişi',
        value: 'BOS %8–16 · Safra Çok Yüksek',
        detail: 'Menenjitte ideal BOS düzeyi; safrada serumun 20–100 katı konsantrasyona ulaşır (biliyer çamur nedeni).',
      },
      {
        label: 'Eliminasyon',
        value: '%50–60 Renal · %40–50 Biliyer',
        detail: 'İzole böbrek veya karaciğer yetmezliğinde doz ayarı gerekmez; yalnızca her ikisi birlikte ağır bozuksa maks 2 g/gün.',
      },
    ],
    contraindications: {
      absoluteItems: [
        'Yenidoğanlarda (≤28 gün; prematürelerde düzeltilmiş 41 haftaya kadar) kalsiyum içeren IV sıvılar (Ringer Laktat, TPN, CaGlukonat) ile eşzamanlı kullanım — ölümcül akciğer/böbrek kalsiyum-seftriakson çökeltisi!',
        'Hiperbilirubinemik yenidoğanlar (özellikle prematüreler) — bilirubini albüminden ayırarak bilirubin ensefalopatisi (kernikterus) tetikler.',
        'Seftriaksona (veya aynı R1 yan zincirini paylaşan Sefotaksim/Sefepim/Sefpodoksime) karşı ağır IgE-aracılı anafilaksi veya SCAR (SJS/TEN/DRESS) öyküsü.',
      ],
      relativeItems: [
        'Aynı IV Y-hattından kalsiyum içeren çözeltiler (Ringer Laktat, CaCl₂, TPN) infüzyonu — erişkinde dahi ASLA karıştırılmaz!',
        'Aynı anda hem ağır böbrek (eGFR <10) hem ağır karaciğer yetmezliği (Child-Pugh C) bulunması — günlük toplam doz 2 g’ı aşmamalıdır.',
        'Semptomatik safra taşı / kolestaz veya uzun süreli yüksek doz kullanım (psödolitiyazis riski).',
      ],
      clinicalNote:
        'Seftriakson, Sefotaksim ve Sefepim aynı R1 yan zincirini (metoksiimino-aminotiyazol) paylaşır — bu üç ajan arasında gerçek IgE çapraz reaktivite riski vardır!',
    },
    regimenCards: [
      {
        title: 'Komplike Olmayan & Dissemine Gonore (Neisseria gonorrhoeae)',
        setting: 'core',
        badge: 'CDC STI 2021 1. Basamak',
        dose: '500 mg IM tek doz (≥150 kg: 1 g IM)',
        infusionDuration: 'Derin IM (Dissemine: 30 dk IV)',
        interval: 'Tek doz (Dissemine: 1 g IV q24sa)',
        note: 'CDC kılavuzu: komplike olmayan ürogenital/faringeal/rektal gonorede 500 mg IM tek doz; vücut ağırlığı ≥150 kg ise 1 g IM tek doz! Klamidya ekarte edilmediyse Doksisiklin 100 mg PO q12sa × 7 gün eklenir. Dissemine gonokok enfeksiyonunda (DGI) 1 g IV/IM q24sa × 7–14 gün uygulanır.',
      },
      {
        title: 'Lyme Hastalığı — Nöroborrelyoz / Kardit / Refrakter Artrit',
        setting: 'core',
        badge: 'IDSA / AAN / ACR 1. Tercih',
        dose: '2 g IV',
        infusionDuration: '30 dk IV',
        interval: 'q24sa × 14–28 gün',
        note: 'Borrelia burgdorferi kaynaklı akut nöroborrelyoz (menenjit, radikülopati, kraniyal nöropati: 14–21 gün), hospitalize yüksek dereceli AV bloklu Lyme karditi (14–21 gün) ve oral tedaviye yanıtsız Lyme artritinde (14–28 gün) 1. basamak parenteral tedavi.',
      },
      {
        title: 'Enterik Ateş / Tifo (Salmonella typhi / paratyphi)',
        setting: 'core',
        badge: 'WHO / IDSA Şiddetli Tifo',
        dose: '2 g IV',
        infusionDuration: '30 dk IV',
        interval: 'q24sa × 10–14 gün',
        note: 'Hastane yatışı gerektiren veya florokinolon dirençli şiddetli enterik ateş/tifo olgularında 1. basamak ampirik IV tedavi (XDR S. typhi salgın bölgesi öyküsünde Meropenem veya Azitromisin değerlendirilir).',
      },
      {
        title: 'Akut Piyelonefrit / Komplike ÜSE & Epididimo-orşit',
        setting: 'core',
        badge: 'IDSA / EAU 1. Basamak',
        dose: '1–2 g IV (Epididimit: 500 mg IM + Doksi)',
        infusionDuration: '30 dk IV (Epididimit: IM)',
        interval: 'q24sa',
        note: 'ESBL riski taşımayan toplum kökenli akut piyelonefrit ve komplike ÜSE’de 1–2 g IV q24sa 1. basamaktır. Cinsel yolla bulaşan akut epididimo-orşitte CDC: 500 mg IM tek doz (≥150 kg: 1 g IM) + Doksisiklin 100 mg PO q12sa × 10 gün.',
      },
      {
        title: 'Akut Epiglottit & Duyarlı Osteomiyelit / Septik Artrit',
        setting: 'core',
        badge: 'Acil Hava Yolu / Ortopedi',
        dose: '2 g IV',
        infusionDuration: '30 dk IV',
        interval: 'q24sa',
        note: 'Akut epiglottitte (H. influenzae, S. pneumoniae, S. pyogenes) acil hava yolu güvenliği ile 2 g IV q24sa (MRSA riskinde Vankomisin eklenir). Duyarlı streptokokal/Gram-negatif osteomiyelit ve septik artritte günde tek doz 2 g IV (OPAT için ideal) kullanılır.',
      },
      {
        title: 'Biliyer / Kolorektal Cerrahi Profilaksi (+ Metronidazol)',
        setting: 'perioperative',
        badge: 'ASHP/IDSA Alternatif',
        dose: '2 g IV (tek doz)',
        infusionDuration: '30 dk IV',
        interval: 'Zaman redozajı YOK',
        note: 'İnsizyondan 30–60 dk önce 2 g IV. Uzun t½ (6–9 sa) sayesinde rutin zaman bazlı intraop redozaj gerekmez; ancak >1500 mL kan kaybında ek 1–2 g değerlendirilir. Kolorektal cerrahide mutlaka Metronidazol 500 mg IV eklenir!',
      },
      {
        title: 'Akut Bakteriyel Menenjit (YBÜ / Acil)',
        setting: 'icu',
        badge: 'Menenjit 1. Basamak',
        dose: '2 g IV',
        infusionDuration: '30 dk IV',
        interval: 'q12sa (4 g/gün)',
        note: 'Deksametazon + Vankomisin ile birlikte başlanır; >50 yaş, alkolizm veya immünsüpresyonda Listeria için mutlaka Ampisilin 2 g q4sa eklenir!',
      },
      {
        title: 'YBÜ Ağır TKP / Spontan Bakteriyel Peritonit (SBP) / İAİ',
        setting: 'icu',
        badge: 'YBÜ Standart',
        dose: '2 g IV',
        infusionDuration: '30 dk IV',
        interval: 'q24sa',
        note: 'Ağır TKP’de Makrolid (Klaritromisin/Azitromisin) veya florokinolonla kombine edilir. Hipoalbüminemik (<2 g/dL) septik şok hastasında serbest klirens arttığından 1 g yerine 2 g q24sa (veya 1 g q12sa) önerilir!',
      },
      {
        title: 'Duyarlı Streptokokal / HACEK Endokardit veya Ürosepsis',
        setting: 'special',
        badge: 'Özel Endikasyon',
        dose: '2 g IV',
        infusionDuration: '30 dk IV',
        interval: 'q24sa',
        note: 'E. faecalis endokarditinde Ampisilin 2 g q4sa + Seftriakson 2 g q12sa (çift β-laktam PBP doygunluğu) aminoglikozidsiz sinerjistik standart rejimdir!',
      },
    ],
    calculator: {
      defaultWeightKg: 75,
      weightScalar: 'TBW',
      obesityRationale:
        'Sabit erişkin dozları (1–2 g) kullanılır; ancak morbid obezite (≥120 kg) veya ciddi hipoalbüminemik septik şok hastalarında 1 g q24sa yerine 2 g q24sa (menenjitte 2 g q12sa) seçilmelidir.',
      perioperative: {
        applicable: true,
        summaryTitle: 'Biliyer / Kolorektal / Ürolojik Cerrahi Profilaksi',
        timingWindow: 'İnsizyondan 30–60 dk önce',
        standardDoseLabel: '2 g IV tek doz (Kolorektalde + Metronidazol 500 mg)',
        adultStandardDoseMg: 2000,
        pediatricMgKg: 50,
        pediatricMaxMg: 2000,
        infusionTimeText: '30 dakikada IV infüzyon (ASLA Ringer Laktat ile değil!)',
        bloodLossRedoseMl: 1500,
        clinicalNote:
          't½ = 6–9 saat olduğu için standart ameliyat sürelerinde zaman bazlı redozaj gerekmez; ancak >1500 mL masif kan kaybında ek doz uygulanabilir. Temiz ortopedik/kardiyak cerrahide 1. tercih DEĞİLDİR (Sefazolin seçin; seftriaksonun MSSA aktivitesi sefazolinden zayıftır!).',
      },
      icu: {
        pkPdTarget: 'Serbest konsantrasyonun %fT>MIC ≥ %50–70 (hipoalbüminemide 2 g q24sa veya q12sa)',
        pkPdBadge: '%fT > MIC · Renal Ayarsız',
        loadingDoseLabel: '2 g IV (Menenjitte ve kritik sepsiste)',
        loadingFixedMg: 2000,
        loadingUnit: 'mg',
        loadingInfusionText: '30 dakikada %0,9 NaCl veya D5W içinde (RL YASAK!)',
        maintenanceLabel: 'YBÜ Tedavi Rejimleri',
        maintenanceMode: 'fixed_regimen',
        fixedOptions: [
          {
            id: 'icu_2g_q24',
            label: 'YBÜ Ağır TKP / SBP / İAİ (+Metro) / Sepsis',
            singleDoseMg: 2000,
            intervalHours: 24,
            infusionHours: 0.5,
            diluentVolumeMl: 100,
            note: 'Hipoalbüminemik YBÜ hastalarında 1 g q24sa yetersiz kalabileceğinden 2 g q24sa önerilir.',
          },
          {
            id: 'meningitis_2g_q12',
            label: 'Bakteriyel Menenjit / E. faecalis Çift β-Laktam',
            singleDoseMg: 2000,
            intervalHours: 12,
            infusionHours: 0.5,
            diluentVolumeMl: 100,
            note: 'Toplam 4 g/gün (maksimum erişkin günlük dozu). Menenjitte Vankomisin ± Ampisilin ile birlikte.',
          },
          {
            id: 'std_1g_q24',
            label: 'Standart Servis TKP / Komplike Olmayan İYE',
            singleDoseMg: 1000,
            intervalHours: 24,
            infusionHours: 0.5,
            diluentVolumeMl: 50,
            note: 'Normal albüminli, septik şokta olmayan hastalarda 1 g/gün.',
          },
        ],
        specialConversionNote:
          'KALSİYUM KURALI: Seftriaksonu YALNIZCA %0,9 NaCl veya %5 Dekstroz ile sulandırın; ameliyathanede Ringer Laktat giden hattan ASLA uygulamayın!',
      },
      renalTiers: [
        {
          id: 'renal_any',
          label: 'Tüm eGFR Düzeyleri (0–150)',
          egfrRange: 'eGFR <10 – ≥90 mL/dk',
          recommendation: 'DOZ AYARI GEREKMEZ',
          doseText: '1–2 g IV q24sa (Menenjitte 2 g IV q12sa)',
          note: 'Biliyer eliminasyon (%40–50) renal yetmezliği tamamen kompanse eder; böbrek yetmezliğinde doz düşürülmez!',
          tone: 'emerald',
        },
        {
          id: 'dual_organ',
          label: 'Kombine Ağır Böbrek + KC Yetmezliği',
          egfrRange: 'eGFR <10 + Child-Pugh C',
          recommendation: 'Maks 2 g/gün Sınırı',
          doseText: 'Maksimum 2 g/gün (1–2 g IV q24sa)',
          note: 'Her iki eliminasyon yolu aynı anda ağır bozuksa günlük toplam doz 2 g’ı aşmamalı ve nörotoksisite/safra çamuru izlenmelidir.',
          tone: 'amber',
        },
      ],
      crrtSummary:
        'CRRT (CVVH/CVVHD/CVVHDF): Doz ayarı GEREKMEZ — 2 g IV q24sa (menenjitte 2 g IV q12sa) tam doz uygulanır. Yüksek protein bağlanması nedeniyle CRRT ile minimal atılır.',
      hdSummary:
        'Aralıklı Hemodiyaliz (IHD): Diyalizle ANLAMLI ATILMAZ — ek post-diyaliz dozu gerekmez; standart 1–2 g IV q24sa uygulanır.',
    },
    turkeyFormulations: {
      preparations: [
        {
          name: 'Rocephin® / Novosef® / İesef® 1 g IV Flakon',
          presentation: '1 g liyofilize toz + 10 mL enjeksiyonluk su çözücü ampul',
          concentration: '1 g / flakon (~3,6 mEq Na⁺)',
          saltOrBaseNote: 'Her 1 g flakonda ~83 mg (3,6 mEq) sodyum bulunur.',
          alertLevel: 'standard',
        },
        {
          name: 'Rocephin® / Novosef® / İesef® 1 g IM Flakon (%1 Lidokainli!)',
          presentation: '1 g toz + 3,5 mL %1 lidokain HCl çözücü ampul',
          concentration: 'YALNIZCA IM — ASLA IV VERME!',
          saltOrBaseNote: 'Çözücü %1 lidokain (35 mg) içerir; IV uygulanması kardiyotoksisite ve nöbet riski taşır!',
          alertLevel: 'high',
        },
      ],
      standardDilutions: [
        'Standart 1–2 g IV İnfüzyon: 50–100 mL %0,9 NaCl veya %5 Dekstroz içinde 30 dakikada infüze edilir.',
        'RİNGER LAKTAT YASAĞI: Ameliyathanede sıvı idamesi Ringer Laktat ise hat mutlaka ≥20 mL %0,9 NaCl ile yıkanmalı veya seftriakson ayrı bir SF hattından verilmelidir!',
      ],
      concentrationTrapWarning:
        'Yenidoğan/pediatrik ameliyathanelerde Ringer Laktat veya kalsiyumlu TPN akarken seftriakson verilmesi ÖLÜMCÜL pulmoner/renal çökelti yapar! Yenidoğanda her zaman Sefotaksim seçin.',
    },
    compatibility: {
      accessRequirement: 'peripheral-ok',
      accessSummary:
        'Periferik IV hattan güvenle uygulanır; ancak kalsiyum içeren tüm sıvılardan (Ringer Laktat, Hartmann, CaCl₂, CaGlukonat, TPN) kesinlikle izole edilmelidir.',
      phRange: '6,0 – 8,0',
      osmolalityNote: '1–2 g / 50–100 mL SF veya D5W çözeltisi fizyolojik ozmolaliteye yakındır (~300–360 mOsm/kg).',
      compatibleDiluents: ['%0,9 NaCl (SF)', '%5 Dekstroz (D5W)', '%10 Dekstroz (Kalsiyumsuz!)'],
      ySiteCompatible: ['Propofol', 'Fentanil', 'Midazolam', 'Noradrenalin', 'Heparin', 'Metronidazol', 'Deksametazon'],
      ySiteIncompatible: ['RİNGER LAKTAT / HARTMANN (ÇÖKELTİ!)', 'Kalsiyum Glukonat / CaCl₂ (ÇÖKELTİ!)', 'TPN / Kalsiyumlu Aminoasitler', 'Vankomisin', 'Flukonazol', 'Amiodaron', 'Aminoglikozidler'],
      stabilityNote:
        'SF veya D5W içinde sulandırıldıktan sonra oda sıcaklığında 24 saat (buzdolabında 3 gün) stabildir.',
      extravasationProtocol:
        'Düşük irritandır. Ekstravazasyonda infüzyonu durdurup elevasyon ve soğuk kompres uygulayın.',
    },
    organImpairment: {
      renalSummary: 'İzole böbrek yetmezliğinde, CRRT ve hemodiyalizde DOZ AYARI GEREKMEZ (%50–60 renal + %40–50 biliyer çift eliminasyon)!',
      renalDetails: [
        '%40–50 biliyer eliminasyon renal kaybı telafi eder; izole eGFR <10 mL/dk’da dahi standart 1–2 g/gün (menenjitte 2 g q12sa) güvenle verilir.',
        'Yüksek protein bağlanması (%85–95) nedeniyle hemodiyaliz ve periton diyalizi ile anlamlı atılmaz (<%5–10); post-diyaliz ek doz verilmez.',
        'Periton diyalizi peritonitinde (ISPD 2022) intraperitoneal 1–2 g IP q24sa kullanılabilir (kalsiyumlu PD solüsyonu ile çökelme riskine dikkat!).',
        'Kombine ağır böbrek (eGFR <10) + ağır karaciğer yetmezliğinde (Child-Pugh C) günlük toplam doz 2 g/gün’ü aşmamalıdır!',
      ],
      hepaticSummary: 'İzole karaciğer yetmezliğinde doz ayarı gerekmez; kombine ağır böbrek+KC yetmezliğinde maks 2 g/gün.',
      hepaticDetails: [
        'Siroz hastalarında spontan bakteriyel peritonit (SBP) tedavisinde ve varis kanaması profilaksisinde 1. basamaktır (1–2 g q24sa).',
        'Ağır hipoalbüminemide (<2 g/dL) serbest seftriakson oranı 3–4 kat artar ve glomerüler klirens hızlanır; kritik enfeksiyonda 1 g yetersiz kalabilir, 2 g q24sa (veya 1 g q12sa) tercih edilir.',
        'Uzun süreli yüksek doz (≥2 g/gün) + kolestaz/açlık zemininde biliyer çamur (psödolitiyazis) gelişebilir.',
      ],
      renalMatrix: [
        {
          stage: 'ARC (eGFR > 130 mL/dk) / Hipoalbüminemi (<2 g/dL)',
          doseBadge: '2 g IV q24sa (1 g yetersiz olabilir!)',
          severeDoseBadge: 'Menenjit / Septik Şok: 2 g IV q12sa',
          note: '%85–95 albümine bağlandığından hipoalbüminemi (<2,0 g/dL) + ARC birlikteliğinde serbest fraksiyon hızla süzülür ve 1 g q24sa doz sonu MIC altına iner! Kritik YBÜ hastasında 2 g q24sa (veya 1 g q12sa; menenjitte 2 g q12sa) tercih edilir.',
          tone: 'indigo',
        },
        {
          stage: 'eGFR ≥ 60 mL/dk (Normal / Hafif)',
          doseBadge: '1–2 g IV q24sa',
          severeDoseBadge: '2 g IV q12sa (Menenjit · 4 g/gün)',
          note: 'Çift eliminasyon ve ~8 saatlik uzun yarı ömür sayesinde günde tek doz etkindir; menenjit ve E. faecalis çift β-laktam endokarditinde 2 g q12sa uygulanır.',
          tone: 'emerald',
        },
        {
          stage: 'eGFR 30–59 mL/dk (Orta KBH)',
          doseBadge: '1–2 g IV q24sa (Ayar YOK)',
          severeDoseBadge: '2 g IV q12sa (Ayar YOK)',
          note: 'Doz azaltımı GEREKMEZ; biliyer eliminasyon renal klirens düşüşünü tamamen kompanse eder.',
          tone: 'emerald',
        },
        {
          stage: 'eGFR 10–29 mL/dk (İleri KBH)',
          doseBadge: '1–2 g IV q24sa (Ayar YOK)',
          severeDoseBadge: '2 g IV q12sa (Karaciğer normalse)',
          note: 'İzole ileri böbrek yetmezliğinde doz azaltımı gerekmez; hidrasyon korunarak safra çamuru/üreteral kristal riski minimize edilir.',
          tone: 'emerald',
        },
        {
          stage: 'eGFR < 10 mL/dk (Ağır KBY · Diyalizsiz)',
          doseBadge: '1–2 g IV q24sa (İzole KBY: Ayar YOK)',
          severeDoseBadge: 'İzole: 2 g q12sa · +Child-Pugh C: Maks 2 g/gün!',
          note: 'Karaciğer fonksiyonu sağlamsa t½ yalnızca hafif uzar (~12–16 sa) ve doz azaltılmaz; ANCAK eşlik eden ağır karaciğer yetmezliğinde (Child-Pugh C) günlük toplam doz KESİNLİKLE 2 g’ı aşmamalıdır!',
          tone: 'sky',
        },
        {
          stage: 'İntermittan Hemodiyaliz (IHD)',
          doseBadge: '1–2 g IV q24sa (Ek doz YOK)',
          severeDoseBadge: '2 g IV q12sa (Ek doz YOK)',
          note: 'Yüksek protein bağlanması (%85–95) nedeniyle hemodiyalizle ANLAMLI ATILMAZ (<%5–10 klirens). Post-diyaliz takviye dozu GEREKMEZ; saatinden bağımsız standart rejim uygulanır.',
          tone: 'emerald',
        },
        {
          stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
          doseBadge: '20–25 & ≥30 mL/kg/sa: 2 g IV q24sa',
          severeDoseBadge: 'Menenjit / ≥30 mL/kg/sa + Hipoalb.: 2 g IV q12sa',
          note: 'Yüksek albümin bağlanması nedeniyle CRRT’de doz azaltılmaz. 20–25 mL/kg/sa eflüentte 2 g q24sa yeterlidir; ≥30 mL/kg/sa yüksek eflüent + ağır hipoalbüminemide (<2 g/dL) artan serbest fraksiyon filtreye geçebileceğinden 2 g q24sa veya 1–2 g q12sa (menenjitte 2 g q12sa) tercih edilir.',
          tone: 'emerald',
        },
        {
          stage: 'SLED / PIRRT (6–12 sa/gün)',
          doseBadge: '1–2 g IV q24sa (Ek doz YOK)',
          severeDoseBadge: '2 g IV q12sa (Menenjit)',
          note: 'SLED ile anlamlı eliminasyon gerçekleşmez; seans sonrası ek doz gerekmez (ağır hipoalbüminemide 2 g q24sa seçilir).',
          tone: 'emerald',
        },
        {
          stage: 'Periton Diyalizi (CAPD / APD · ISPD 2022)',
          doseBadge: 'Sistemik: 1–2 g IV q24sa (Ayar YOK)',
          severeDoseBadge: 'ISPD 2022 IP Peritonit: 1–2 g IP q24sa',
          note: 'PD ile sistemik klirens ihmal edilebilir (<%5). PD ilişkili peritonitte (ISPD 2022): 1–2 g IP q24sa uzun bekleme torbasına (≥6 saat) uygulanır; ancak kalsiyumlu PD solüsyonunda çökelti riski nedeniyle hazırlama uyumluluğu ve berraklık kontrol edilmelidir.',
          tone: 'sky',
        },
      ],
      hepaticMatrix: [
        {
          childPugh: 'Child-Pugh A (5–6 Puan · Hafif)',
          badge: 'Doz Ayarı Yok',
          detail: 'Renal eliminasyon (%50–60) normal olduğu sürece doz değişikliği gerekmez; SBP ve varis kanaması profilaksisinde 1–2 g q24sa 1. basamaktır.',
          tone: 'emerald',
        },
        {
          childPugh: 'Child-Pugh B (7–9 Puan · Orta)',
          badge: 'Doz Ayarı Yok · Safra İzle',
          detail: 'Böbrek fonksiyonu korunmuşsa standart 1–2 g q24sa güvenle uygulanır. Kolestaz, TPN veya açlık eşlik ediyorsa biliyer çamur (psödolitiyazis) açısından izlenir.',
          tone: 'emerald',
        },
        {
          childPugh: 'Child-Pugh C (10–15 Puan · Dekompanse)',
          badge: 'İzole: Ayar Yok · +eGFR<10: Maks 2 g/gün',
          detail: 'Böbrek fonksiyonu normalse SBP için 1–2 g q24sa güvenle verilir; ANCAK ciddi hipoalbüminemi (<2 g/dL) serbest klirensi artırırken, eşlik eden eGFR <10 mL/dk varsa her iki atılım yolu tıkandığından günlük doz 2 g’ı aşmamalıdır!',
          tone: 'amber',
        },
      ],
      dualOrganNote:
        'İki zıt farmakokinetik tuzak vardır: (1) Kombine ağır böbrek (eGFR <10 mL/dk) + ağır karaciğer yetmezliğinde (Child-Pugh C) hem renal hem biliyer yol çöktüğünden günlük toplam doz KESİNLİKLE 2 g/gün ile sınırlandırılmalı ve ensefalopati/biliyer psödolitiyazis izlenmelidir. (2) Buna karşın böbrek fonksiyonu normal/artmış (ARC >130 mL/dk) + ağır hipoalbüminemili (<2 g/dL) kritik YBÜ/siroz hastalarında bağlanmayan serbest seftriakson fraksiyonu 3–4 kat artarak hızla süzülür — 1 g q24sa yetersiz kalacağından 2 g q24sa (veya 1 g q12sa) uygulanmalıdır.',
    },
    geriatricObesity: {
      geriatricReductionBadge: 'Doz Azaltımı Yok',
      geriatricPoints: [
        'Yaşlılarda böbrek fonksiyonu azalmış olsa da çift eliminasyon nedeniyle doz azaltımı gerekmez.',
        'Uzun süreli kullanımda safra çamuru, C. difficile ve antibiyotik ilişkili ensefalopati açısından izlenmelidir.',
      ],
      obesityWeightScalarBadge: 'TBW · 2 g Tercih Et',
      obesityPoints: [
        '≥120 kg veya VKİ ≥40 kg/m² obez hastalarda artan dağılım hacmi nedeniyle 1 g yerine 2 g q24sa (menenjitte 2 g q12sa) önerilir.',
      ],
      clinicalNote:
        'Septik şoktaki ağır hipoalbüminemik (<2 g/dL) ve hiperdinamik (ARC) hastalarda 1 g q24sa rejimi son 8–12 saatte MIC altına düşebilir — YBÜ’de 2 g q24sa (veya 1 g q12sa) tercih edin.',
    },
    pregnancyLactation: {
      pregnancySummary: 'Gebelikte Güvenli 1. Basamak Sefalosporin (Eski FDA B).',
      pregnancyDetails: [
        'Gebelik piyelonefriti, pnömoni ve bakteriyel menenjitte güvenle kullanılır.',
        'Doğuma çok yakın (preterm yenidoğanda) teorik kernikterus riski yenidoğana direkt uygulanmadığı sürece maternal kullanımda klinik sorun oluşturmaz.',
      ],
      lactationSummary: 'Emzirme ile Uyumlu (LactMed).',
      lactationDetails: [
        'Anne sütüne çok düşük miktarda (~%3–4 maternal serum düzeyi) geçer ve oral emilimi yoktur; emzirme sürdürülebilir.',
      ],
    },
    adverseEffects: [
      {
        title: 'Biliyer Psödolitiyazis (Safra Çamuru)',
        incidenceOrSeverity: '%15–40 (USG’de; çoğu asemptomatik)',
        detail:
          'Yüksek biliyer konsantrasyonda seftriakson anyonu safra kalsiyumu ile çözünmeyen tuz oluşturur; sağ üst kadran ağrısı/kolestaz yaparsa ilaç kesilince spontan geriler.',
        tone: 'amber',
      },
      {
        title: 'Kalsiyum-Seftriakson Mikrovasküler Çökeltisi',
        incidenceOrSeverity: 'Yenidoğanda Ölümcül!',
        detail:
          '≤28 günlük yenidoğanlarda IV kalsiyum/RL ile eşzamanlı kullanımda pulmoner ve renal kapiller tromboembolik çökelti ve ani ölüm.',
        tone: 'rose',
      },
      {
        title: 'İmmün Hemolitik Anemi (Nadir ama Şiddetli)',
        incidenceOrSeverity: 'Nadir (Hayatı Tehdit Edici)',
        detail:
          'İlaç bağımlı antikorlar nedeniyle ani ağır intravasküler hemoliz ve hemoglobinüri yapabilir (özellikle orak hücreli anemi / tekrarlayan maruziyette).',
        tone: 'rose',
      },
      {
        title: 'C. difficile & ESBL Seçilimi (Kollateral Hasar)',
        incidenceOrSeverity: 'Orta-Yüksek',
        detail:
          'Yoğun biliyer atılım bağırsak mikrobiyotasını değiştirerek ESBL üreten Enterobacterales kolonizasyonunu ve C. difficile kolitini kolaylaştırır.',
        tone: 'indigo',
      },
    ],
    specialClinicalCautions: [
      {
        title: 'Ameliyathanede Ringer Laktat Hattı Kuralı',
        detail:
          'Ameliyathanede en sık kullanılan bazal sıvı Ringer Laktat’tır (Ca²⁺ içerir!). Seftriakson verileceği zaman aynı hattan asla göndermeyin; hattı SF ile yıkayın veya ayrı SF hattı kullanın.',
      },
      {
        title: 'YBÜ Hipoalbüminemisinde 1 g Yetersizliği',
        detail:
          'Seftriakson %85–95 albümine bağlandığından albümini <2,0 g/dL olan kritik hastalarda serbest fraksiyon 3–4 kat artar, renal klirens hızlanır ve 1 g q24sa doz aralığının sonunda terapötik düzeyin altına iner.',
      },
      {
        title: 'E. faecalis Endokarditinde Çift β-Laktam Sinerjisi',
        detail:
          'Tek başına Enterococcus’a etkisiz olmasına karşın, Ampisilin (PBP4/5) + Seftriakson (PBP2/3 doygunluğu) kombinasyonu E. faecalis endokarditinde gentamisine eşdeğer, nefrotoksisitesiz 1. basamak tedavidir.',
      },
      {
        title: 'MSSA İçin Sefazolinden Zayıftır',
        detail:
          'Seftriaksonun MSSA MIC değerleri (2–4 mcg/mL) sefazolinden (0,5–1 mcg/mL) belirgin yüksektir; temiz cerrahi profilaksi ve MSSA bakteriyemisinde sefazolin tercih edilmelidir.',
      },
    ],
    deepPharmacodynamics: {
      receptorMechanism: {
        title: 'Oksimino-Aminotiyazolil R1 Zinciri & PBP1–3 İnhibisyonu',
        summary:
          'Seftriakson, Gram-negatif dış membran porinlerinden geçerek PBP1a/1b, PBP2 ve PBP3’ü yüksek afinite ile açiller; metoksiimino R1 grubu dar spektrumlu β-laktamazlara sterik kalkan oluşturur.',
        points: [
          'S. pneumoniae’nin modifiye PBP2x/2b proteinlerine penisilinden çok daha yüksek afinite gösterir; bu nedenle penisiline dirençli pnömokok menenjitinde etkindir.',
          'Ancak P. aeruginosa dış membran geçirgenliği düşük olduğundan ve AmpC/eflüks pompalarıyla kolayca inaktive edildiğinden antipsödomonal aktivitesi yoktur.',
        ],
      },
      intracellularSignaling: {
        title: 'Bakteriyel Lizis & Çift β-Laktam PBP Doygunluğu',
        summary:
          'PBP blokajı sonrası peptidoglikan sentez durması ve endojen otolizin aktivasyonu ile ozmotik lizis gerçekleşir.',
        points: [
          'E. faecalis’te ampisilin PBP4/5’i, seftriakson ise PBP2/3’ü tamamen doyurarak tek başlarına bakteriyostatik olan iki ajanın güçlü bakterisidal sinerji üretmesini sağlar.',
          'Biliyer sekresyon sırasında hepatosit MRP2 taşıyıcısıyla safra kanaliküllerine yoğun atılır; safra Ca²⁺ iyonlarıyla çözünürlük çarpımı aşılınca kalsiyum-seftriakson kristalleri çöker.',
        ],
      },
      tissueOrganSystems: [
        {
          systemTitle: 'Santral Sinir Sistemi (Meninks & BOS)',
          tissueTarget: 'Kan-Beyin Bariyeri',
          accent: 'indigo',
          points: [
            '2 g q12sa rejimi ile BOS konsantrasyonu 2–10 mcg/mL’ye ulaşarak S. pneumoniae ve N. meningitidis MIC’sinin >10–100 katına çıkar.',
            'Sefepime kıyasla nörotoksisite/NCSE riski belirgin düşüktür ancak aşırı birikimde nadiren ensefalopati bildirilmiştir.',
          ],
        },
        {
          systemTitle: 'Hepatobiliyer Sistem & Safra Kesesi',
          tissueTarget: 'Biliyer Sekresyon',
          accent: 'amber',
          points: [
            'Dozun %40–50’si değişmeden safraya atılır; safra konsantrasyonu serumun 20–100 katına ulaşır.',
            'Dehidratasyon, açlık/TPN ve ≥2 g/gün uzun tedavi safra çamuru (psödolitiyazis) riskini artırır.',
          ],
        },
        {
          systemTitle: 'Plazma Protein Dinamiği (Albümin)',
          tissueTarget: 'Yüksek Bağlanma (%85–95)',
          accent: 'sky',
          points: [
            'Yenidoğanda albümindeki bilirubin bağlanma bölgeleri için yarışarak serbest indirekt bilirubini artırır (kernikterus!).',
            'YBÜ’de hipoalbüminemik septik şokta serbest fraksiyon artışı Vd ve renal klirensi büyütür.',
          ],
        },
        {
          systemTitle: 'Renal & Mikrovasküler Sistem',
          tissueTarget: 'Ca²⁺ Çökelti Riski',
          accent: 'rose',
          points: [
            'İzole renal yetmezlikte güvenli olsa da yenidoğanda IV Ca²⁺ ile intravasküler kalsiyum-seftriakson çökeltisi ölümcüldür.',
            'Yüksek doz + dehidratasyonda nadiren üreteral kalsiyum-seftriakson taşlarına bağlı post-renal ABH bildirilmiştir.',
          ],
        },
      ],
      synergyAndCeiling: {
        title: 'Yüksek Protein Bağlanması & Serbest Fraksiyon (%fT>MIC)',
        summary:
          'Yalnızca proteine bağlanmamış (serbest) seftriakson antibakteriyel aktiftir; %85–95 bağlanma oranına rağmen uzun t½ (8 saat) günde tek dozla %fT>MIC hedefini korur.',
        points: [
          'Hipoalbüminemik kritik hastalarda yüksek serbest fraksiyon hızla glomerülden süzülerek doz sonu konsantrasyonu düşürebilir — 2 g q24sa veya 1 g q12sa bu açığı kapatır.',
          'Ampisilin + Seftriakson kombinasyonu E. faecalis endokarditinde uluslararası kılavuz 1. basamak sinerji örneğidir.',
        ],
      },
      clinicalPearls: [
        'Böbrek yetmezliğinde doz ayarı gerektirmeyen tek majör parenteral sefalosporinlerden biridir (diğeri Sefoperazon).',
        'Ringer Laktat = Kalsiyum içerir! Ameliyathanede seftriaksonu ASLA RL’ye eklemeyin veya RL giden lümenden puşelemeyin.',
        'Toplum kökenli sepsis ve menenjitte mükemmeldir; ancak 48 saati geçmiş YBÜ/hastane enfeksiyonlarında Psödomonas ve ESBL boşluğu nedeniyle ampirik seçilmemelidir.',
      ],
    },
    referencesAndInteractions: {
      drugName: 'Seftriakson',
      structuredInteractions: [
        {
          severity: 'X',
          agent: 'Kalsiyum İçeren IV Sıvılar (Ringer Laktat, CaGlukonat, CaCl₂, TPN)',
          mechanism: 'Fizikokimyasal çözünmeyen kalsiyum-seftriakson tuzu çökelmesi',
          clinicalEffect: 'Yenidoğanlarda (≤28 gün) farklı hatlardan dahi olsa ölümcül akciğer/böbrek çökeltisi; erişkinde aynı Y-hatta tıkanma ve mikroemboli.',
          management: '≤28 günlük yenidoğanlarda MUTLAK KONTRENDİKE (Sefotaksim kullanın). Erişkinde asla aynı torba/Y-hat kullanmayın; ardışık uygulamada hattı SF ile iyice yıkayın.',
        },
        {
          severity: 'D',
          agent: 'Varfarin (K-Vitamini Antagonistleri)',
          mechanism: 'Bağırsak K-vitamini sentezleyen flora baskılanması + albüminden yer değiştirme',
          clinicalEffect: 'INR’de anlamlı yükselme ve kanama riski artışı.',
          management: 'Birlikte kullanımda INR’yi 48–72 saatte bir yakından izleyin ve varfarin dozunu ayarlayın.',
        },
        {
          severity: 'C',
          agent: 'Lansoprazol (Bazı Gözlemsel Veriler)',
          mechanism: 'hERG K⁺ kanalı potansiyel ortak etkileşimi (sınırlı klinik kanıt)',
          clinicalEffect: 'Bazı farmakovijilans analizlerinde QTc uzaması sinyali tartışılmıştır.',
          management: 'Yüksek aritmi riskli YBÜ hastalarında bazal QTc ve K⁺/Mg²⁺ düzeylerini takip edin.',
        },
      ],
      references: [
        {
          authors: 'Tunkel AR, Hartman BJ, Kaplan SL, et al.',
          title: 'Practice guidelines for the management of bacterial meningitis (IDSA)',
          journal: 'Clin Infect Dis',
          year: 2004,
          note: 'Akut bakteriyel menenjitte Seftriakson 2 g q12sa temel kılavuzu (Vankomisin ± Ampisilin kombinasyonu).',
        },
        {
          authors: 'U.S. Food and Drug Administration (FDA).',
          title: 'Information for Healthcare Professionals: Ceftriaxone (marketed as Rocephin) — Calcium Precipitation Warning',
          journal: 'FDA Drug Safety Communication',
          year: 2009,
          note: '≤28 günlük yenidoğanlarda IV kalsiyum ile kontrendikasyon ve erişkinde Y-site uyarısının birincil regülatör kaynağı.',
        },
        {
          authors: 'Garot D, Respaud R, Lanotte P, et al.',
          title: 'Population pharmacokinetics of ceftriaxone in critically ill septic patients: a reappraisal',
          journal: 'Br J Clin Pharmacol',
          year: 2011,
          note: 'Kritik hasta ve hipoalbüminemide serbest seftriakson klirensi ve 2 g q24sa doz optimizasyonu.',
        },
      ],
      drugsComUrl: 'https://www.drugs.com/drug-interactions/ceftriaxone.html',
      medscapeUrl: 'https://reference.medscape.com/drug-interactionchecker',
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 4. PİPERASİLİN-TAZOBAKTAM (PIPERACILLIN-TAZOBACTAM)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'piperacillin-tazobactam',
    classTag: 'beta_lactam',
    accentColor: 'teal',
    atcCode: 'J01CR05',
    classLabel: 'Antipsödomonal Penisilin + BLI (8:1) · Uzamış İnfüzyon',
    tradeNamesTr: 'Tazocin® · Tazoper® · Tazobakt® (4,5 g = 4 g + 0,5 g Flakon)',
    title: 'Piperasilin-Tazobaktam Monografisi',
    cardTitle: 'Piperasilin-Tazobaktam',
    cardBadge: 'EI 3–4 sa · ACORN 2023 · MERINO 2018',
    cardCategoryLabel: 'β-Laktam · Antipsödomonal BL/BLI',
    cardShortDesc:
      'Geniş antipsödomonal + anaerobik kapsamlı YBÜ sepsisi ve VAP omurga ajanı (4,5 g yükleme → 4,5 g q6–8sa 3–4 saat EI). MERINO (ESBL’de Meropenem üstün) & ACORN (JAMA 2023) kanıtları ve yüksek Na⁺ yükü.',
    cardHighlights: [
      {
        label: 'YBÜ Uzamış İnfüzyon',
        value: '4,5 g q6–8sa (3–4 sa)',
        subtext: 'İlk doz 4,5 g 30 dk yükleme!',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30',
      },
      {
        label: 'MERINO (JAMA 2018)',
        value: 'ESBL’de Meropenem Seç',
        subtext: 'ESBL bakteriyemide mortalite↑',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'ACORN (JAMA 2023)',
        value: 'ABH Farkı Yok · Nöro↓',
        subtext: 'Sefepime göre daha az deliryum',
        colorClass: 'text-sky-700 dark:text-sky-300',
        bgClass: 'bg-sky-500/10',
        borderClass: 'border-sky-500/30',
      },
    ],
    aliases: ['piperasilin tazobaktam', 'piperacillin tazobactam', 'tazocin', 'tazoper', 'piptazo', 'pip-tazo'],
    searchKeywords: [
      'piperasilin',
      'tazobaktam',
      'tazocin',
      'tazoper',
      'piptazo',
      'uzamış infüzyon',
      'acorn',
      'merino',
      'esbl',
      'psödomonas',
      'vankomisin abh',
    ],
    highAlert: {
      tallManName: 'piperacillin-TAZOBACTAM',
      confusionRiskWith: 'ampicillin-sulbactam · ticarcillin-clavulanate',
      criticalAlerts: [
        'ESBL BAKTERİYEMİSİNDE MEROPENEM’E GÖRE YÜKSEK MORTALİTE (MERINO TRIAL, JAMA 2018): Seftriaksona dirençli (ESBL üreten) E. coli veya K. pneumoniae kan dolaşımı enfeksiyonunda in vitro duyarlı görünse bile Piperasilin-Tazobaktam (30 günlük mortalite %12,3) Meropenem’e (%3,7) göre açıkça inferior bulunmuştur — ESBL sepsiste Meropenem kullanın!',
        'YÜKSEK SODYUM YÜKÜ (~9,4–11,1 mEq Na⁺ / 4,5 g flakon): q6sa rejimde günde ~38–44 mEq (~1 g) ekstra sodyum verir; hipernatremi, sirotik asit ve kalp yetmezliğinde sıvı/elektrolit takibi gerekir.',
        'VANKOMİSİN + PİP-TAZO KOMBİNASYONUNDA ABH TARTIŞMASI: Gözlemsel çalışmalarda kreatinin yükselmesi (kısmen OAT1/3 tübüler kreatinin sekresyon bloğuna bağlı psödo-ABH) bildirilse de randomize ACORN çalışması (JAMA 2023) Sefepim vs Pip-Tazo arasında ABH/ölüm farkı göstermemiştir; yine de kombine kullanımda kreatinin + idrar çıkışı (ve mümkünse sistatin C) yakından izlenmelidir.',
        'RİNGER LAKTAT YALNIZCA EDTA’LI FORMÜLASYONLA UYUMLUDUR: Jenerik bazı flakonlar EDTA içermez ve Ringer Laktat ile uyumsuz olabilir — standart olarak %0,9 NaCl veya D5W kullanın; Vankomisin ve Aminoglikozidlerle aynı Y-hattan ASLA vermeyin!',
      ],
      antidoteOrRescue:
        'Anafilakside standart Adrenalin protokolü uygulanır. Yüksek doz birikime bağlı nöbet/ensefalopatide ilacı kesin; piperasilin ve tazobaktam hemodiyaliz ile %30–40 oranında uzaklaştırılır. Trombosit disfonksiyonuna bağlı kanama gelişirse ilacı kesin ve gerekirse desmopressin/trombosit desteği değerlendirin.',
    },
    identitySummary:
      'Piperasilin-tazobaktam, antipsödomonal üreidopenisilin (piperasilin) ile sınıf A β-laktamaz inhibitörünün (tazobaktam) 8:1 oranında kombinasyonudur. MSSA, E. faecalis, Pseudomonas aeruginosa ve B. fragilis dahil anaerobları tek ilaçta kapsayan çok geniş spektrumlu YBÜ ampirik sepsis, VAP, komplike intra-abdominal enfeksiyon ve febril nötropeni omurga ajanıdır.',
    spectrumHighlights: [
      {
        title: 'Geniş Tek-Ajan Kapsama (Psödomonas + Anaerob)',
        detail:
          'Pseudomonas aeruginosa, MSSA, Streptococcus spp., Enterococcus faecalis, duyarlı Enterobacterales ve B. fragilis dahil güçlü anaerobik aktivite (ek Metronidazol GEREKMEZ!).',
        tone: 'emerald',
      },
      {
        title: 'MERINO & ACORN Kanıt Dengesi',
        detail:
          'ESBL bakteriyemisinde Meropenem’den inferior (MERINO 2018); buna karşın ampirik YBÜ sepsisinde Sefepim’e göre nörotoksisite/deliryum avantajı ve eşit ABH oranı (ACORN JAMA 2023).',
        tone: 'amber',
      },
      {
        title: 'Kesin Spektrum Boşlukları (Etkisiz)',
        detail:
          'MRSA, VRE/E. faecium, Stenotrophomonas maltophilia, karbapenemaz üreten CRE (KPC/OXA-48/NDM) ve yüksek düzey AmpC üreten suşlarda (Enterobacter cloacae ciddi enfeksiyonları) güvenilmez/etkisizdir.',
        tone: 'rose',
      },
    ],
    mechanismSummary:
      'Piperasilin, Gram-negatif dış membran porinlerinden geçip PBP3’e yüksek afinite ile bağlanarak septasyonu ve hücre duvarı sentezini bloke eder. Tazobaktam, plazmid aracılı sınıf A β-laktamazları (TEM, SHV, stafilokokal penisilinaz) geri dönüşsüz inhibe eder. Kısa yarı ömrü (~1 saat) nedeniyle YBÜ sepsisinde 3–4 saatlik uzamış infüzyon (EI) ile %fT>MIC dramatik şekilde yükseltilir.',
    mechanismPillars: [
      {
        title: 'Antipsödomonal PBP3 Yüksek Afinite',
        detail:
          'P. aeruginosa PBP3’üne güçlü bağlanır; ancak yüksek MIC’li suşlarda (8–16 mcg/mL) 30 dk standart infüzyon başarısız olabilir, 4 saatlik EI (4,5 g q6–8sa) hedef PK/PD’ye ulaşır.',
      },
      {
        title: 'Uzamış İnfüzyon (EI) Sağkalım Kanıtı',
        detail:
          'Kritik hastalarda 4,5 g yükleme (30 dk) sonrası 3–4 saatlik uzamış veya sürekli infüzyon, aralıklı 30 dk infüzyona kıyasla %fT>MIC’yi %50’den >%95’e çıkarır ve sepsis meta-analizlerinde mortaliteyi azaltır.',
      },
      {
        title: 'Tazobaktamın Sınırları (ESBL İnokülüm & AmpC)',
        detail:
          'Tazobaktam sınıf C (AmpC), sınıf B (MBL) ve sınıf D (OXA) enzimlerini inhibe edemez; yüksek bakteriyel inokülümlü ESBL/OXA-1 eş-üreticilerinde tazobaktam tükenir (MERINO başarısızlığının moleküler nedeni).',
      },
    ],
    pkCards: [
      {
        label: 'Yarı Ömür (t½)',
        value: '0,7 – 1,2 saat',
        detail: 'Kısa yarı ömür nedeniyle YBÜ’de 3–4 saatlik uzamış infüzyon (EI) idealdir; eGFR <20 mL/dk’da 3–5 saate uzar.',
      },
      {
        label: 'Protein Bağlanması',
        value: '~%30 (Her İki Bileşen)',
        detail: 'Düşük protein bağlanması sayesinde yüksek serbest ilaç fraksiyonu ve iyi interstisyel dağılım.',
      },
      {
        label: 'Doku Penetrasyonu',
        value: 'Akciğer, Safra, Periton',
        detail: 'Akciğer parankimi, pankreas, safra ve peritona mükemmel geçer; BOS geçişi güvenilir değildir (menenjitte KULLANILMAZ!).',
      },
      {
        label: 'Eliminasyon',
        value: '%70–80 Renal · %20 Biliyer',
        detail: 'Glomerüler filtrasyon + OAT1/OAT3 tübüler sekresyon; eGFR <40 mL/dk’da doz azaltımı gerekir.',
      },
    ],
    contraindications: {
      absoluteItems: [
        'Penisilinlere, β-laktamaz inhibitörlerine veya β-laktamlara karşı ağır IgE-aracılı anafilaksi öyküsü.',
        'Şiddetli gecikmiş kütanöz reaksiyon (SJS/TEN/DRESS/AGEP) öyküsü.',
      ],
      relativeItems: [
        'Kanıtlanmış ESBL üreten Enterobacterales bakteriyemisi veya septik şoku (MERINO çalışması: Meropenem tercih edilmelidir!).',
        'Ağır hipernatremi, refrakter ödem veya dekompanse kalp yetmezliği (günde ~40 mEq Na⁺ yükü).',
        'Aktif ciddi trombositopeni/kanama diyatezi (yüksek doz üreidopenisilinler trombosit ADP agregasyonunu bozabilir).',
      ],
      clinicalNote:
        'Kistik fibrozis hastalarında piperasilin ilişkili ilaç ateşi ve döküntü insidansı belirgin yüksektir.',
    },
    regimenCards: [
      {
        title: 'Orta-Ağır Diyabetik Ayak & Nekrotizan Yumuşak Doku / Fournier Gangreni',
        setting: 'core',
        badge: 'IDSA / WSES Cerrahi Acil',
        dose: '4,5 g IV (+ Vankomisin ± Klindamisin)',
        infusionDuration: '30 dk – 4 sa (EI)',
        interval: 'q6–8sa',
        note: 'Polimikrobiyal nekrotizan fasiit, Fournier gangreni ve Psödomonas riski taşıyan orta-ağır diyabetik ayak enfeksiyonlarında P. aeruginosa + Gram-negatif + B. fragilis anaeroblarını tek ajanla kapsar (ek Metronidazol gerekmez). MRSA için Vankomisin ve toksin baskılaması için Klindamisin (veya Linezolid) + acil cerrahi debridman eklenir.',
      },
      {
        title: 'Komplike İntra-Abdominal Enfeksiyon (Peritonit, Apse, Akut Kolanjit)',
        setting: 'core',
        badge: 'SIS / IDSA / Tokyo Kılavuzu',
        dose: '4,5 g IV',
        infusionDuration: '30 dk veya 4 sa EI',
        interval: 'q6–8sa',
        note: 'Sekonder/tersiyer peritonit, perfore apandisit/divertikülit, intra-abdominal apse, enfekte nekrotizan pankreatit ve Tokyo Grade II–III akut kolanjit/kolesistitte aerobik Gram-negatif + E. faecalis + anaerob kapsamını tek başına sağlar (ek Metronidazol EKLENMEZ).',
      },
      {
        title: 'Yüksek Riskli Febril Nötropeni Monoterapisi',
        setting: 'core',
        badge: 'IDSA / ECIL / NCCN 1. Basamak',
        dose: '4,5 g IV',
        infusionDuration: '30 dk veya 3 sa EI',
        interval: 'q6sa (18 g/gün)',
        note: 'Yüksek riskli febril nötropenide (MASCC <21) 1. basamak antipsödomonal monoterapidir; özellikle ağır mukozit, perianal selülit veya nötropenik enterokolit (tiflit) şüphesinde ek anaerobik kapsamı sayesinde Sefepime üstünlük sağlar.',
      },
      {
        title: 'Nozokomiyal Pnömoni — Hastane & Ventilatör İlişkili Pnömoni (HAP / VAP)',
        setting: 'core',
        badge: 'ATS / IDSA HAP-VAP 1. Tercih',
        dose: '4,5 g IV',
        infusionDuration: '3–4 sa (EI) · İlk doz 30 dk',
        interval: 'q6sa (18 g/gün)',
        note: 'HAP ve VAP ampirik tedavisinde P. aeruginosa ve MSSA’yı kapsayan 1. basamak antipsödomonal β-laktam; MRSA riskinde Vankomisin/Linezolid (ayrı lümenden!), septik şok veya MDR Psödomonas riskinde ikinci antipsödomonal ajan eklenir.',
      },
      {
        title: 'Komplike ÜSE / Akut Piyelonefrit (Psödomonas / Sağlık Bakımı Riski)',
        setting: 'core',
        badge: 'EAU / IDSA Komplike ÜSE',
        dose: '4,5 g IV',
        infusionDuration: '30 dk veya 4 sa EI',
        interval: 'q8sa (Ağır/Psödomonas: q6sa)',
        note: 'Kateter ilişkili komplike ÜSE, ürolojik girişim sonrası ürosepsis veya P. aeruginosa / E. faecalis riski taşıyan akut piyelonefritte etkindir. ESBL pozitif bakteriyemi kanıtlanırsa (MERINO) Meropenem’e geçilmelidir!',
      },
      {
        title: 'Komplike İntra-Abdominal / Pankreatobilier Cerrahi Profilaksi',
        setting: 'perioperative',
        badge: 'Yüksek Riskli GIS/HPB',
        dose: '4,5 g (veya 3,375 g) IV',
        infusionDuration: '30 dk IV',
        interval: 'q2sa redozaj',
        note: 'Rutin temiz cerrahide kullanılmaz; ancak biliyer stentli Whipple (pankreatikoduodenektomi), karaciğer nakli veya komplike perforasyon cerrahisinde insizyondan 30–60 dk önce uygulanır ve 2 saatte bir redoze edilir.',
      },
      {
        title: 'YBÜ Sepsis / Septik Şok / VAP — Uzamış İnfüzyon (EI)',
        setting: 'icu',
        badge: 'YBÜ 1. Tercih · EI',
        dose: '4,5 g Yükleme → 4,5 g EI',
        infusionDuration: '3–4 saat (EI)',
        interval: 'q6sa veya q8sa',
        note: 'İLK DOZ DAİMA 30 DAKİKADA YÜKLEME (4,5 g) olarak verilir! Ardından P. aeruginosa/VAP/febril nötropenide 4,5 g q6sa (3 saat EI) veya standart YBÜ sepsisinde 4,5 g q8sa (4 saat EI) sürdürülür.',
      },
      {
        title: 'YBÜ Standart Aralıklı İnfüzyon (Ayrı Lümen Yoksa)',
        setting: 'icu',
        badge: 'Standart Aralıklı',
        dose: '4,5 g IV',
        infusionDuration: '30 dk IV',
        interval: 'q6sa',
        note: 'VAP, hastane kökenli pnömoni ve febril nötropenide 4,5 g q6sa (18 g/gün); orta şiddetli İAİ/cilt enfeksiyonlarında 4,5 g q8sa (13,5 g/gün).',
      },
      {
        title: 'Sürekli İnfüzyon (CI — BLING III / Refrakte YBÜ)',
        setting: 'special',
        badge: 'Sürekli İnfüzyon (CI)',
        dose: '4,5 g Yükleme → 13,5–18 g/gün CI',
        infusionDuration: '24 saat (2× 12 sa torba)',
        interval: 'Sürekli',
        note: 'BLING III (JAMA 2024) protokolüne göre 4,5 g 30 dk yükleme sonrası günde 18 g sürekli infüzyon (%100 fT>MIC); oda sıcaklığında 24 saat stabildir.',
      },
    ],
    calculator: {
      defaultWeightKg: 75,
      weightScalar: 'TBW',
      obesityRationale:
        'Sabit 4,5 g doz kullanılır; morbid obezitede (≥120 kg) veya ARC’de (eGFR >130 mL/dk) 4,5 g q8sa yerine 4,5 g q6sa 3–4 saatlik uzamış infüzyon tercih edilmelidir.',
      perioperative: {
        applicable: true,
        summaryTitle: 'Yüksek Riskli HPB / Whipple / Komplike İntra-Abdominal Profilaksi',
        timingWindow: 'İnsizyondan 30–60 dk önce',
        standardDoseLabel: '4,5 g IV (yüksek riskli biliyer/pankreatik/perforasyon cerrahisi)',
        adultStandardDoseMg: 4500,
        pediatricMgKg: 100,
        pediatricMaxMg: 4500,
        infusionTimeText: '30 dakikada IV infüzyon',
        redoseHours: 2,
        bloodLossRedoseMl: 1500,
        clinicalNote:
          'Biliyer stentli pankreatikoduodenektomi (Whipple) ameliyatlarında Sefoksitin/Sefazolinden üstündür (Enterokok + Psödomonas + anaerob kapsar). Kısa t½ nedeniyle 2 saatte bir redozaj şarttır; ek Metronidazol GEREKMEZ.',
      },
      icu: {
        pkPdTarget: 'Serbest ilaç konsantrasyonunun %fT>MIC ≥ %50–100 (Septik şokta %100 fT>1–4×MIC için 3–4 saat EI)',
        pkPdBadge: '%fT > MIC · 3–4 sa EI',
        loadingDoseLabel: '4,5 g IV (DAİMA 30 dk hızlı yükleme!)',
        loadingFixedMg: 4500,
        loadingUnit: 'mg',
        loadingInfusionText: '30 dakikada IV yükleme → hemen ardından EI idameye geç',
        maintenanceLabel: 'YBÜ Uzamış İnfüzyon (EI) & Standart Rejimler',
        maintenanceMode: 'fixed_regimen',
        fixedOptions: [
          {
            id: 'vap_ei_q6h',
            label: 'VAP / Septik Şok / P. aeruginosa (4,5 g q6sa · 3 sa EI)',
            singleDoseMg: 4500,
            intervalHours: 6,
            infusionHours: 3,
            diluentVolumeMl: 100,
            note: 'En yüksek %fT>MIC hedefi (18 g/gün). 100 mL SF içinde 33,3 mL/saat hızla 3 saatte infüze edilir.',
          },
          {
            id: 'sepsis_ei_q8h',
            label: 'YBÜ Sepsis / İAİ (4,5 g q8sa · 4 sa EI)',
            singleDoseMg: 4500,
            intervalHours: 8,
            infusionHours: 4,
            diluentVolumeMl: 100,
            note: '13,5 g/gün ile 4 saatlik EI sayesinde 18 g/gün aralıklı rejime eşdeğer/üstün PK/PD ve daha düşük Na⁺ yükü (~30 mEq/gün).',
          },
          {
            id: 'std_30m_q6h',
            label: 'Standart Aralıklı (4,5 g q6sa · 30 dk)',
            singleDoseMg: 4500,
            intervalHours: 6,
            infusionHours: 0.5,
            diluentVolumeMl: 100,
            note: 'Ayrı IV lümen yoksa 30 dk’da verilir; ancak septik şokta EI tercih edilmelidir.',
          },
        ],
        tdmNote:
          'Rutin TDM yoktur; ancak Vankomisin eşlik ediyorsa günlük serum kreatinin + idrar çıkışı (+ mümkünse sistatin C) ile gerçek vs psödo-ABH ayrımı yapılmalıdır.',
      },
      renalTiers: [
        {
          id: 'egfr_40',
          label: 'Normal / Hafif KBH',
          egfrRange: 'eGFR > 40 mL/dk',
          recommendation: 'Tam Doz (EI Tercihli)',
          doseText: '4,5 g yükleme → 4,5 g q6sa (3 sa EI) veya q8sa (4 sa EI)',
          note: 'İlk 48 saatte geçici ABH’si olan septik şok hastalarında erken agresif doz düşürümünden kaçının (yüksek başarısızlık riski!).',
          tone: 'emerald',
        },
        {
          id: 'egfr_20_40',
          label: 'Orta-İleri KBH',
          egfrRange: 'eGFR 20–40 mL/dk',
          recommendation: 'Doz / Aralık Azaltımı',
          doseText: '4,5 g yükleme → 4,5 g q8sa (4 sa EI) veya 2,25–3,375 g q6sa',
          note: 'VAP/Psödomonas’ta 4,5 g q8sa (4 saat EI) hedef PK/PD’yi korurken birikimi önler.',
          tone: 'amber',
        },
        {
          id: 'egfr_lt20',
          label: 'Ağır KBY (Diyalizsiz)',
          egfrRange: 'eGFR < 20 mL/dk',
          recommendation: 'q8–12sa (Azaltılmış)',
          doseText: '4,5 g yükleme → 2,25 g q6–8sa veya 4,5 g q12sa (4 sa EI)',
          note: 'Yüksek birikimde nöbet eşiği düşer ve trombosit disfonksiyonu artabilir.',
          tone: 'rose',
        },
      ],
      crrtSummary:
        'CRRT (CVVH/CVVHD/CVVHDF): 4,5 g IV yükleme → 4,5 g q8sa (3–4 saat EI) [yüksek eflüent ≥30 mL/kg/saat veya P. aeruginosa/VAP’ta 4,5 g q6sa 3 saat EI].',
      hdSummary:
        'Aralıklı Hemodiyaliz (IHD): 2,25 g IV q8sa (VAP’ta 2,25 g q6sa) + her HD seansı bitiminde ek 0,75–2,25 g (veya pratik olarak 4,5 g yükleme → 2,25 g q8sa, bir doz HD sonrasına zamanlanır).',
    },
    turkeyFormulations: {
      preparations: [
        {
          name: 'Tazocin® EF / Tazoper® / Tazobakt® 4,5 g IV Flakon',
          presentation: '4 g piperasilin + 0,5 g tazobaktam liyofilize toz (8:1 oran)',
          concentration: '4,5 g / flakon (~9,4–11,1 mEq Na⁺)',
          saltOrBaseNote: 'Tazocin EF (EDTA + sitratlı) formülasyonu belirli koşullarda RL ile uyumludur; jenerik EDTA’sız formlar RL ile uyumsuz olabilir!',
          alertLevel: 'standard',
        },
        {
          name: 'Tazocin® / Jenerik 2,25 g IV Flakon',
          presentation: '2 g piperasilin + 0,25 g tazobaktam liyofilize toz',
          concentration: '2,25 g / flakon (~4,7–5,5 mEq Na⁺)',
          saltOrBaseNote: 'Ağır böbrek yetmezliği (eGFR <20) ve pediatrik hastalar için uygundur.',
          alertLevel: 'standard',
        },
      ],
      standardDilutions: [
        '4,5 g Flakon Rekonstitüsyonu: 20 mL SF veya enjeksiyonluk su ile iyice çalkalayarak eritin (tam çözünme 5–10 dk sürebilir!).',
        'YBÜ Uzamış İnfüzyon (EI): 4,5 g rekonstitüe çözelti 100 mL %0,9 NaCl veya D5W içine eklenip 3 saatte (33,3 mL/sa) veya 4 saatte (25 mL/sa) infüze edilir.',
      ],
      concentrationTrapWarning:
        '4,5 g tozun tamamen erimesi yavaştır; tam çözünmeden torbaya aktarmayın. Ayrıca Vankomisin ile AYNI Y-HATTAN verilirse anında beyaz bulanıklık/çökelti oluşur — mutlaka ayrı lümen kullanın!',
    },
    compatibility: {
      accessRequirement: 'central-preferred',
      accessSummary:
        'Aralıklı 30 dk dozlar periferikten verilebilir; ancak YBÜ’de 3–4 saatlik uzamış infüzyon (EI) sırasında Vankomisin/Noradrenalin/Amikasin geçimsizliklerini önlemek için ayrı santral lümen kuvvetle tercih edilir.',
      phRange: '5,5 – 6,5',
      osmolalityNote: '4,5 g / 100 mL SF çözeltisi hafif hiperozmolardır (~450–500 mOsm/kg).',
      compatibleDiluents: ['%0,9 NaCl (SF)', '%5 Dekstroz (D5W)', 'Enjeksiyonluk Su (rekonstitüsyon)'],
      ySiteCompatible: ['Fentanil', 'Midazolam', 'Propofol', 'Noradrenalin', 'Heparin', 'İnsülin', 'Potasyum klorür'],
      ySiteIncompatible: ['VANKOMİSİN (ÇÖKELTİ!)', 'Amikasin / Gentamisin', 'Amiodaron', 'Siprofloksasin', 'Dobutamin', 'Asiklovir / Gansiklovir', 'Kaspofungin', 'Ringer Laktat (EDTA’sız jenerikler)'],
      stabilityNote:
        'SF veya D5W içinde oda sıcaklığında 24 saat, buzdolabında 48 saat stabildir (4 saatlik EI ve 24 saatlik CI için tamamen güvenlidir!).',
      extravasationProtocol:
        'Düşük-orta irritan. Ekstravazasyonda infüzyonu durdurun, ekstremiteyi eleve edin ve soğuk kompres uygulayın.',
    },
    organImpairment: {
      renalSummary: 'Renal eliminasyon (%70–80) — eGFR ≤40 mL/dk’da doz azaltılır; ancak ilk 48 saat septik ABH’de erken kısıtlamadan kaçınılır.',
      renalDetails: [
        'eGFR 20–40 mL/dk: 4,5 g q8sa (4 saat EI) veya 2,25–3,375 g q6sa; eGFR <20 mL/dk: 2,25 g q6–8sa veya 4,5 g q12sa (4 sa EI).',
        'İlk 4,5 g yükleme dozu (30 dk) böbrek yetmezliği derecesinden bağımsız olarak DAİMA tam uygulanır.',
        'Hemodiyaliz piperasilinin %30–40’ını ve tazobaktamın %35–40’ını uzaklaştırır; HD günlerinde bir doz seans bitimine zamanlanır veya ek doz verilir.',
        'Vankomisin ile eşzamanlı kullanımda kreatinin yükselmesi gözlenirse OAT1/3 tübüler kreatinin sekresyon bloğu (psödo-ABH) akla gelmeli, idrar çıkışı ve sistatin C ile doğrulanmalıdır.',
      ],
      hepaticSummary: 'Karaciğer yetmezliğinde (Child-Pugh A/B/C) farmakokinetik doz ayarı GEREKMEZ; ancak yüksek Na⁺ yükü ve hipokalemi izlenir.',
      hepaticDetails: [
        'Sirotik asit/ödemli hastalarda günlük ~30–44 mEq (~0,7–1 g) sodyum yükü sıvı retansiyonunu ve hipernatremiyi ağırlaştırabilir.',
        'Non-reabsorbe penisilin anyonuna bağlı renal potasyum kaybı (hipokalemi) sirozda hepatik ensefalopatiyi tetikleyebilir.',
      ],
      renalMatrix: [
        {
          stage: 'ARC (eGFR > 130 mL/dk)',
          doseBadge: '4,5 g yükleme → 4,5 g q6sa (3 sa EI)',
          severeDoseBadge: '4,5 g yükleme → 4,5 g q6sa (3–4 sa EI) veya 18 g/gün CI',
          note: 'Hiperdinamik ARC hastalarında 30 dk aralıklı infüzyonla %fT>MIC başarısızlığı >%50’dir! Mutlaka 4,5 g 30 dk yükleme sonrası 3–4 saatlik uzamış (EI) veya BLING III protokolüyle 18 g/gün sürekli infüzyon (CI) uygulanmalıdır.',
          tone: 'indigo',
        },
        {
          stage: 'eGFR > 40 mL/dk (Normal / Hafif)',
          doseBadge: '4,5 g IV q8sa (4 sa EI · 13,5 g/gün)',
          severeDoseBadge: 'VAP / Psödo / FN: 4,5 g q6sa (3 sa EI · 18 g/gün)',
          note: 'İlk doz daima 4,5 g 30 dk yükleme! Septik şokun ilk 48 saatinde geçici ABH gelişse bile erken agresif doz düşürümünden kaçınılmalıdır.',
          tone: 'emerald',
        },
        {
          stage: 'eGFR 20–40 mL/dk (Orta-İleri KBH)',
          doseBadge: '2,25–3,375 g q6sa veya 4,5 g q8sa (4 sa EI)',
          severeDoseBadge: 'VAP / Psödo: 4,5 g yükleme → 4,5 g q8sa (4 sa EI)',
          note: 'Türkiye’de 3,375 g flakon bulunmadığından VAP/P. aeruginosa’da 4,5 g q8sa (4 saat EI = 13,5 g/gün) hedef PK/PD’yi korurken birikimi önleyen en pratik rejimdir.',
          tone: 'amber',
        },
        {
          stage: 'eGFR < 20 mL/dk (Ağır KBY · Diyalizsiz)',
          doseBadge: '2,25 g IV q8sa veya 4,5 g q12sa (EI)',
          severeDoseBadge: 'VAP / Psödo: 4,5 g yükleme → 2,25 g q6sa veya 4,5 g q12sa (4 sa EI)',
          note: 't½ 3–5 saate uzar. Yüksek birikimde nöbet eşiği düşüşü, ensefalopati ve trombosit ADP agregasyon bozukluğu (kanama riski) izlenir.',
          tone: 'rose',
        },
        {
          stage: 'İntermittan Hemodiyaliz (IHD)',
          doseBadge: '2,25 g IV q12sa (+ HD sonrası 0,75–2,25 g)',
          severeDoseBadge: 'VAP / Psödo: 2,25 g q8sa (1 doz HD sonrası)',
          note: '4 saatlik HD piperasilinin %30–40’ını, tazobaktamın %35–40’ını uzaklaştırır. Türkiye’de 0,75 g flakon olmadığından pratik YBÜ şeması: 4,5 g yükleme → 2,25 g q8sa (standart enfeksiyonda q12sa + HD bitiminde ek 2,25 g veya planlı dozun HD sonrasına zamanlanması).',
          tone: 'amber',
        },
        {
          stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
          doseBadge: '20–25 mL/kg/sa: 4,5 g q8sa (4 sa EI)',
          severeDoseBadge: '≥30 mL/kg/sa veya VAP/Psödo: 4,5 g q6sa (3 sa EI)',
          note: 'Düşük protein bağlanması (~%30) nedeniyle CRRT ile yüksek oranda temizlenir. 4,5 g 30 dk yükleme sonrası 20–25 mL/kg/sa eflüentte 4,5 g q8sa (4 sa EI); ≥30 mL/kg/sa yüksek eflüent veya P. aeruginosa/VAP’ta 4,5 g q6sa (3 sa EI) hedef PK/PD’yi güvenceye alır.',
          tone: 'sky',
        },
        {
          stage: 'SLED / PIRRT (6–12 sa/gün)',
          doseBadge: '4,5 g IV q12sa (seans sonrası tam doz)',
          severeDoseBadge: 'VAP / Psödo: 4,5 g IV q8sa (4 sa EI)',
          note: 'SLED seansı sırasında belirgin ilaç klirensi gerçekleşir; günlük dozlardan biri mutlaka SLED bitimine zamanlanır (ağır P. aeruginosa’da 4,5 g q8sa 4 sa EI).',
          tone: 'sky',
        },
        {
          stage: 'Periton Diyalizi (CAPD / APD)',
          doseBadge: 'Sistemik: 2,25 g IV q8–12sa',
          severeDoseBadge: 'Ağır / VAP: 2,25 g q6sa veya 4,5 g q12sa (EI)',
          note: 'PD piperasilinin ~%6’sını, tazobaktamın ~%20’sini uzaklaştırır (ek post-PD doz gerekmez). ISPD 2022 kılavuzunda rutin IP peritonit ajanı değildir (seftazidim/sefepim veya meropenem tercih edilir).',
          tone: 'amber',
        },
      ],
      hepaticMatrix: [
        {
          childPugh: 'Child-Pugh A (5–6 Puan · Hafif)',
          badge: 'Doz Ayarı Yok',
          detail: 'Ağırlıklı renal eliminasyon (%70–80) nedeniyle doz değişikliği gerekmez. Yüksek biliyer ve peritoneal penetrasyonu ile kolanjit/peritonitte idealdir.',
          tone: 'emerald',
        },
        {
          childPugh: 'Child-Pugh B (7–9 Puan · Orta)',
          badge: 'Doz Ayarı Yok · Na⁺ İzle',
          detail: 'Farmakokinetik doz azaltımı gerekmez; ancak her 4,5 g flakon ~9,4–11,1 mEq Na⁺ içerdiğinden 13,5–18 g/gün rejiminde ~30–44 mEq/gün sodyum yükü asit/ödemi artırabilir.',
          tone: 'amber',
        },
        {
          childPugh: 'Child-Pugh C (10–15 Puan · Dekompanse)',
          badge: 'Na⁺ Yükü · K⁺ & Kanama Uyarısı',
          detail: 'Metabolik doz kısıtlaması yoktur; ancak yüksek Na⁺ yükü (~38–44 mEq/gün) refrakter sirotik asit ve hipernatremiyi kötüleştirir, renal K⁺ kaybı hepatik ensefalopatiyi tetikleyebilir ve yüksek dozda trombosit disfonksiyonu kanama riskini artırır.',
          tone: 'rose',
        },
      ],
      dualOrganNote:
        'Dekompanse siroz/asit (Child-Pugh C) + böbrek yetmezliği (HRS / eGFR <40) birlikteliğinde: (1) günlük ~30–44 mEq Na⁺ yükü refrakter asit ve sıvı yüklenmesini ağırlaştırır (mümkünse 4,5 g q8sa 4 sa EI ile toplam Na⁺ yükü azaltılır veya sodyumsuz Sefepim/Meropenem düşünülür), (2) hipokalemi hepatik ensefalopatiyi tetikleyebilir, (3) renal birikimde trombosit agregasyon inhibisyonu sirotik kanama diyatezini artırır. Vankomisin eşlik ediyorsa OAT1/3 tübüler kreatinin bloğu (psödo-ABH) idrar çıkışı ve sistatin C ile gerçek HRS’den ayrılmalıdır.',
    },
    geriatricObesity: {
      geriatricReductionBadge: 'eGFR & Na⁺/K⁺ İzle',
      geriatricPoints: [
        'Yaşlılarda eGFR düşüşü ile birikim olabilir; ancak Sefepime kıyasla nörotoksisite ve deliryum riski anlamlı derecede düşüktür (ACORN JAMA 2023).',
      ],
      obesityWeightScalarBadge: 'TBW · 4,5 g q6sa EI',
      obesityPoints: [
        'Morbid obezitede (VKİ ≥40 kg/m²) artmış Vd ve artmış renal klirens nedeniyle 4,5 g q6sa (3 saat EI) standart 30 dk infüzyondan belirgin üstündür.',
      ],
      clinicalNote:
        'ACORN çalışması (JAMA 2023) yaşlı, altta yatan bilişsel kırılganlığı veya renal disfonksiyonu olan hastalarda ampirik antipsödomonal seçimde Piperasilin-Tazobaktam’ın nörolojik güvenlik avantajını ortaya koymuştur.',
    },
    pregnancyLactation: {
      pregnancySummary: 'Gebelikte Ciddi Polimikrobiyal/Psödomonal Sepsiste Güvenli Seçenek (Eski FDA B).',
      pregnancyDetails: [
        'Plasentayı geçer ancak insan verilerinde teratojenite artışı bildirilmemiştir.',
        'Ağır obstetrik sepsis ve koryoamniyonit/peritonit olgularında güvenle kullanılır.',
      ],
      lactationSummary: 'Emzirme ile Uyumlu (LactMed).',
      lactationDetails: [
        'Anne sütüne çok düşük konsantrasyonda geçer ve bebek tarafından oral emilimi ihmal edilebilir düzeydedir.',
      ],
    },
    adverseEffects: [
      {
        title: 'Kreatinin Artışı / ABH Tartışması (Vankomisin ile)',
        incidenceOrSeverity: 'ACORN 2023: Sefepimle Eşit',
        detail:
          'Gözlemsel çalışmalarda Vankomisin+Pip-Tazo ile kreatinin artışı (OAT1/3 tübüler sekresyon bloğu — psödo-ABH) bildirilse de randomize ACORN (JAMA 2023) çalışmasında 14. gün ABH/ölüm farkı çıkmamıştır.',
        tone: 'amber',
      },
      {
        title: 'Hipernatremi & Hipokalemi',
        incidenceOrSeverity: 'Sık (Yüksek Dozda)',
        detail:
          '4,5 g q6sa rejiminde ~40 mEq/gün Na⁺ yükü + non-reabsorbe penisilin anyonuna bağlı renal K⁺ kaybı.',
        tone: 'amber',
      },
      {
        title: 'Trombosit Disfonksiyonu & Kanama',
        incidenceOrSeverity: 'Nadir (Renal Yetmezlikte)',
        detail:
          'Yüksek piperasilin konsantrasyonları trombosit membranında ADP reseptör bağlanmasını bozarak kanama zamanını uzatabilir.',
        tone: 'rose',
      },
      {
        title: 'Nötropeni (Uzun Kullanımda) & C. difficile',
        incidenceOrSeverity: '%1–5 (>14 gün tedavide)',
        detail:
          'İki haftadan uzun tedavilerde geri dönüşlü lökopeni/nötropeni ve ilaç ateşi görülebilir; haftalık hemogram izlemi önerilir.',
        tone: 'indigo',
      },
    ],
    specialClinicalCautions: [
      {
        title: 'MERINO Trial (JAMA 2018) — ESBL Kuralı',
        detail:
          'Kan kültüründe seftriaksona dirençli (ESBL şüphesi/kanıtı) E. coli veya K. pneumoniae ürediğinde antibiyogramda "Pip-Tazo Duyarlı" yazsa bile mortalite riskini azaltmak için Meropenem’e geçilmelidir!',
      },
      {
        title: 'ACORN Trial (JAMA 2023) — Sefepim vs Pip-Tazo Seçimi',
        detail:
          '2511 hastaneye yatan erişkinde yapılan randomize ACORN çalışması Pip-Tazo’nun Sefepim’e göre ABH’yi artırmadığını, üstelik Sefepim’e göre daha az koma/deliryum yaptığını göstermiştir.',
      },
      {
        title: 'Vankomisin ile Çift Lümen Zorunluluğu',
        detail:
          'Vankomisin ve Piperasilin-Tazobaktam fiziksel olarak uyumsuzdur; özellikle 3–4 saatlik EI sırasında Vankomisin kesinlikle ayrı bir IV lümenden infüze edilmelidir.',
      },
      {
        title: 'Galaktomannan Testi (Tarihsel Not)',
        detail:
          'Eski preparatlarda Aspergillus galaktomannan testinde yalancı pozitiflik görülürdü; modern formülasyonlarda bu sorun büyük ölçüde giderilmiş olsa da sınırda pozitifliklerde akılda tutulmalıdır.',
      },
    ],
    deepPharmacodynamics: {
      receptorMechanism: {
        title: 'PBP3 Yüksek Afinite & Tazobaktam Sınıf A İnhibisyonu',
        summary:
          'Piperasilin Gram-negatif dış membran porinlerinden hızla difüze olarak PBP3’ü açiller; tazobaktam (penisilanik asit sülfon) sınıf A β-laktamazları geri dönüşsüz inaktive eder.',
        points: [
          'Tazobaktam, sulbaktamdan daha güçlü bir sınıf A β-laktamaz inhibitörüdür ve klavulanattan farklı olarak kromozomal AmpC indüksiyonu zayıftır.',
          'Ancak OXA-1 ve yüksek ekspresyonlu ESBL/AmpC enzimleri tazobaktam inhibisyonundan kaçar (MERINO başarısızlığı).',
        ],
      },
      intracellularSignaling: {
        title: 'Bakteriyel Filamentasyon, Lizis & Tübüler OAT Etkileşimi',
        summary:
          'PBP3 inhibisyonu bakteriyel bölünme septumunu felç ederek hızlı filamentasyon ve lizis oluşturur; konak böbrekte ise proksimal tübül OAT1/3 taşıyıcılarıyla etkileşir.',
        points: [
          'Piperasilin ve tazobaktam renal proksimal tübülde kreatinin sekresyonunu yapan OAT1/OAT3 ve OCT2 taşıyıcılarını kısmen yarışmalı bloke edebilir.',
          'Bu moleküler yarışma, gerçek glomerüler hasar (sistatin C artışı) olmadan serum kreatinininde 0,3–0,5 mg/dL’lik "psödo-ABH" artışına katkıda bulunabilir.',
        ],
      },
      tissueOrganSystems: [
        {
          systemTitle: 'Akciğer & Alveoler Epitel Sıvısı (VAP)',
          tissueTarget: 'ELF Penetrasyonu %40–55',
          accent: 'teal',
          points: [
            '4,5 g q6sa 3–4 saatlik uzamış infüzyon, P. aeruginosa VAP’ta ELF düzeylerini MIC ≤16 mcg/mL suşları için dahi terapötik bantta tutar.',
            'Eşzamanlı anaerobik kapsamı sayesinde aspirasyon kaynaklı nekrotizan pnömoni ve ampiyemde tek ajan olarak yeterlidir.',
          ],
        },
        {
          systemTitle: 'Pankreas, Safra & Periton',
          tissueTarget: 'İntra-Abdominal Sepsis',
          accent: 'sky',
          points: [
            'Nekrotizan pankreatit ve safra yolu enfeksiyonlarında yüksek pankreatik/biliyer doku konsantrasyonu sağlar.',
            'B. fragilis’e karşı yüksek etkinlik nedeniyle ek Metronidazol verilmesi gereksiz polifarmasi oluşturur.',
          ],
        },
        {
          systemTitle: 'Renal Tübüller & Elektrolit Dengesi',
          tissueTarget: 'OAT1/3 · Na⁺/K⁺',
          accent: 'amber',
          points: [
            'Vankomisin ile birlikte kullanımda kreatinin takibine ek olarak idrar çıkışı ve sistatin C ölçümü gerçek tübüler hasarı ayırt etmede değerlidir.',
            'Yüksek sodyum yükü (~40 mEq/gün) ve distal nefronda K⁺ atılımı artışı yakından izlenmelidir.',
          ],
        },
        {
          systemTitle: 'Hemostaz & Hematoloji',
          tissueTarget: 'Trombosit ADP & Kemik İliği',
          accent: 'rose',
          points: [
            'Ağır renal birikimde trombosit membran reseptörlerini kaplayarak agregasyonu azaltabilir.',
            '>14 gün yüksek doz tedavide immün/direkt miyeloid baskılanma ile geri dönüşlü nötropeni görülebilir.',
          ],
        },
      ],
      synergyAndCeiling: {
        title: 'Uzamış/Sürekli İnfüzyon (BLING III) & Sinerji',
        summary:
          'Zamana bağımlı öldürme karakteristiği nedeniyle kritik hastalarda 3–4 saatlik EI veya 24 saatlik CI klinik kür oranını artırır.',
        points: [
          'BLING III (JAMA 2024): 7031 septik YBÜ hastasında sürekli β-laktam infüzyonu (Pip-Tazo/Meropenem) 90 günlük klinik kür oranını anlamlı artırmış, mortalitede %1,9 mutlak düşüş eğilimi göstermiştir.',
          'İlk doz ASLA yavaş infüzyonla başlanmaz — terapötik düzeye 30 dakikada ulaşmak için DAİMA 4,5 g 30 dk yükleme verilir!',
        ],
      },
      clinicalPearls: [
        'İntra-abdominal sepsiste Piperasilin-Tazobaktam kullanırken yanına Metronidazol EKLEMEYİN (çifte anaerobik kaplama gereksizdir; istisna: C. difficile şüphesi).',
        'İlk 4,5 g dozu 30 dakikada yükleyin, hemen 1 saat sonra veya sıradaki dozda 3–4 saatlik uzamış infüzyona geçin.',
        'ESBL pozitif kan kültürü geldiği anda (duyarlı görünse bile!) Meropenem’e geçin.',
      ],
    },
    referencesAndInteractions: {
      drugName: 'Piperasilin-Tazobaktam',
      structuredInteractions: [
        {
          severity: 'D',
          agent: 'Vankomisin (Sistemik + Y-Site)',
          mechanism: 'Y-hatta fiziksel çökelme + OAT/tübüler kreatinin etkileşimi',
          clinicalEffect: 'Aynı hattan verilirse çökelir; eşzamanlı kullanımda kreatinin yükselmesi gözlemsel olarak sık bildirilmiştir (ACORN 2023’te Sefepimle ABH farkı yok).',
          management: 'Kesinlikle ayrı IV lümen kullanın; kreatinin, idrar çıkışı ve Vankomisin AUC/trough düzeyini izleyin.',
        },
        {
          severity: 'D',
          agent: 'Metotreksat',
          mechanism: 'Renal OAT tübüler sekresyon inhibisyonu',
          clinicalEffect: 'Metotreksat toksisitesi (pansitopeni, mukozit).',
          management: 'Yüksek doz metotreksatla birlikte kullanmayın.',
        },
        {
          severity: 'C',
          agent: 'Non-Depolarizan Nöromüsküler Blokerler (Veküronyum / Roküronyum)',
          mechanism: 'Presinaptik asetilkolin salınımında hafif azalma',
          clinicalEffect: 'Yüksek doz üreidopenisilinlerde nöromüsküler blok süresinde hafif uzama bildirilmiştir.',
          management: 'Ameliyathanede TOF monitörizasyonu ile ekstübasyon öncesi tam derlenmeyi doğrulayın.',
        },
      ],
      references: [
        {
          authors: 'Qian ET, Casey JD, Wright A, et al. (ACORN Investigators).',
          title: 'Cefepime vs Piperacillin-Tazobactam in Adults Hospitalized With Acute Infection: The ACORN Randomized Clinical Trial',
          journal: 'JAMA',
          year: 2023,
          note: 'Pip-Tazo vs Sefepim arasında ABH/ölüm farkı olmadığını, Sefepimde nörolojik disfonksiyonun daha yüksek olduğunu kanıtlayan landmark RKÇ.',
        },
        {
          authors: 'Harris PNA, Tambyah PA, Lye DC, et al. (MERINO Trial Investigators).',
          title: 'Effect of Piperacillin-Tazobactam vs Meropenem on 30-Day Mortality for Patients With E coli or Klebsiella pneumoniae Bloodstream Infection and Ceftriaxone Resistance',
          journal: 'JAMA',
          year: 2018,
          note: 'ESBL bakteriyemisinde Piperasilin-Tazobaktam’ın Meropenem’e göre daha yüksek mortaliteye yol açtığını gösteren landmark çalışma.',
        },
        {
          authors: 'Dulhunty JM, Brett SJ, De Waele JJ, et al. (BLING III Investigators).',
          title: 'Continuous vs Intermittent β-Lactam Antibiotic Infusions in Critically Ill Patients With Sepsis: A Randomized Clinical Trial',
          journal: 'JAMA',
          year: 2024,
          note: 'Kritik sepsis hastalarında sürekli β-laktam infüzyonunun klinik kür üstünlüğünü gösteren 7031 hastalık uluslararası RKÇ.',
        },
      ],
      drugsComUrl: 'https://www.drugs.com/drug-interactions/piperacillin-tazobactam.html',
      medscapeUrl: 'https://reference.medscape.com/drug-interactionchecker',
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 5. SEFEPİM (CEFEPIME)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'cefepime',
    classTag: 'beta_lactam',
    accentColor: 'cyan',
    atcCode: 'J01DE01',
    classLabel: '4. Kuşak Sefalosporin · Antipsödomonal + AmpC Stabil',
    tradeNamesTr: 'Maxipime® · Unisef® · Ekipim® (1 g & 2 g IV Flakon)',
    title: 'Sefepim Hidroklorür Monografisi',
    cardTitle: 'Sefepim (Cefepime)',
    cardBadge: 'AmpC 1. Tercih · CIN/NCSE Uyarısı!',
    cardCategoryLabel: 'β-Laktam · 4. Kuşak Sefalosporin',
    cardShortDesc:
      'Antipsödomonal + AmpC β-laktamaz stabil (Enterobacter, Citrobacter 1. basamak), febril nötropeni/VAP/sepsis 2 g q8sa 3 saat EI. KRİTİK: eGFR <60’ta Sefepim Nörotoksisitesi (CIN / NCSE) ve anaerobik boşluk!',
    cardHighlights: [
      {
        label: 'YBÜ Uzamış İnfüzyon',
        value: '2 g q8sa (3 sa EI)',
        subtext: 'Febril nötropeni · VAP · AmpC',
        colorClass: 'text-cyan-700 dark:text-cyan-300',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30',
      },
      {
        label: 'KRİTİK: CIN / NCSE',
        value: 'eGFR <60 Nörotoksisite!',
        subtext: 'ACORN 2023: Deliryum↑ · EEG çek!',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'Anaerob Boşluğu',
        value: 'B. fragilis ETKİSİZ',
        subtext: 'İAİ’de Metronidazol EKLE!',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
    ],
    aliases: ['sefepim', 'cefepime', 'maxipime', 'unisef', 'ekipim', 'cin'],
    searchKeywords: [
      'sefepim',
      'cefepime',
      'maxipime',
      'unisef',
      'ampc',
      'nörotoksisite',
      'ncse',
      'ensefalopati',
      'miyoklonus',
      'febril nötropeni',
      'acorn',
    ],
    highAlert: {
      tallManName: 'cefEPime',
      confusionRiskWith: 'ceFAZolin · cefTAZidime · cefTRIAXone',
      criticalAlerts: [
        'SEFEPİM İNDÜKLEDİĞİ NÖROTOKSİSİTE (CIN) & NON-KONVÜLZİF STATUS EPİLEPTİKUS (NCSE): Özellikle eGFR <60 mL/dk’da doz ayarlanmadığında (ancak normal GFR’li YBÜ hastalarında da %10–15!) GABA-A antagonizmasına bağlı açıklanamayan konfüzyon, afazi, miyoklonus, uyanamama/koma ve NCSE gelişir! ACORN çalışması (JAMA 2023) Pip-Tazo’ya göre daha fazla nörolojik disfonksiyon göstermiştir. Şüphede ACİL EEG çekin ve sefepimi DERHAL kesin!',
        'ANAEROBLARA ETKİSİZDİR (B. FRAGİLİS BOŞLUĞU): İntra-abdominal enfeksiyon, aspirasyon pnömonisi veya nekrotizan yumuşak doku enfeksiyonunda tek başına verilmesi ölümcül tedavi başarısızlığına yol açar — mutlaka Metronidazol ekleyin!',
        'SEFTRİAKSON / SEFOTAKSİM İLE AYNI R1 YAN ZİNCİRİ: Bu ajanlara karşı gerçek IgE-aracılı anafilaksi öyküsü varsa sefepimle çapraz reaksiyon riski yüksektir.',
        'ESBL ENFEKSİYONLARINDA MIC ≥4 mcg/mL İSE BAŞARISIZLIK RİSKİ: IDSA 2024 kılavuzu ESBL üreten Enterobacterales enfeksiyonlarında MIC yüksekse Meropenem’i önerir (sefepim esas olarak AmpC üreticileri için 1. basamaktır).',
      ],
      antidoteOrRescue:
        'CIN (ensefalopati / miyoklonus / NCSE) geliştiğinde: 1) Sefepimi DERHAL KESİN (başka sınıfa geçin). 2) ACİL EEG çekin; NCSE/nöbet varsa IV Benzodiazepin (Lorazepam/Midazolam) ± Levetirasetam uygulayın. 3) Ağır böbrek yetmezliğinde veya ağır komada ACİL HEMODİYALİZ sefepimin ~%68’ini 3 saatlik tek seansta hızla temizleyerek nörolojik iyileşmeyi dramatik hızlandırır!',
    },
    identitySummary:
      'Sefepim, zwitteriyonik yapısı sayesinde Gram-negatif dış membran porinlerinden hızla geçen, hem güçlü antipsödomonal hem MSSA aktivitesine sahip ve kromozomal AmpC β-laktamazlara karşı stabil 4. kuşak sefalosporindir. Febril nötropeni, VAP, hastane kökenli sepsis ve AmpC üreten Enterobacterales (Enterobacter cloacae, Citrobacter freundii, Klebsiella aerogenes) enfeksiyonlarında 1. basamaktır; ancak dar nörolojik güvenlik penceresi (CIN/NCSE) nedeniyle böbrek fonksiyonu titizlikle izlenmelidir.',
    spectrumHighlights: [
      {
        title: '1. Basamak: AmpC + Psödomonas + Febril Nötropeni',
        detail:
          'Enterobacter cloacae, Citrobacter freundii, Klebsiella aerogenes (AmpC stabil — IDSA 2024 1. tercih!), Pseudomonas aeruginosa, MSSA ve S. pneumoniae. Mükemmel BOS penetrasyonu.',
        tone: 'emerald',
      },
      {
        title: 'Nörotoksisite (CIN) & Sıkı Renal Ayar Zorunluluğu',
        detail:
          'GABA-A antagonizması ile ensefalopati, afazi, miyoklonus ve NCSE (ACORN JAMA 2023). eGFR <60 mL/dk’da doz azaltılmaması en büyük risk faktörüdür; açıklanamayan deliryumda EEG şarttır.',
        tone: 'amber',
      },
      {
        title: 'Kesin Boşluklar (Anaerob · Enterokok · MRSA)',
        detail:
          'Bacteroides fragilis dahil anaeroblara, Enterococcus spp.’ye, MRSA’ya ve karbapenemaz üreten CRE’ye ETKİSİZDİR. İntra-abdominal enfeksiyonda mutlaka Metronidazol ekleyin!',
        tone: 'rose',
      },
    ],
    mechanismSummary:
      'Zwitteriyonik (çift yüklü) molekül yapısı Gram-negatif bakterilerin OmpF/OmpC porinlerinden 3. kuşak sefalosporinlerden çok daha hızlı geçiş sağlar. PBP2 ve PBP3’e yüksek afinite ile bağlanarak hücre duvarı sentezini bloke eder; kromozomal AmpC β-laktamazları zayıf indükler ve AmpC tarafından çok yavaş hidrolize edilir.',
    mechanismPillars: [
      {
        title: 'Zwitteriyonik Hızlı Porin Geçişi & AmpC Stabilitesi',
        detail:
          'Hem pozitif hem negatif yük taşıyan yapısı dış membrandan hızlı penetrasyon sağlar; AmpC β-laktamazlara düşük afinitesi sayesinde Enterobacter cloacae gibi yüksek riskli AmpC üreticilerinde karbapenem koruyucu 1. basamaktır (MIC ≤2 mcg/mL).',
      },
      {
        title: 'Geniş Gram-Pozitif + Antipsödomonal Denge',
        detail:
          'Seftazidimden farklı olarak MSSA ve S. pneumoniae üzerine de güçlüdür; bu nedenle febril nötropeni ve post-nöroşirürji menenjitte antipsödomonal omurga ajanıdır.',
      },
      {
        title: 'GABA-A Antagonizması (CIN Biyofiziği)',
        detail:
          'BOS’a %10–20 (sepsiste/BBB bozukluğunda %45’e kadar!) geçer ve plazma vadi (trough) düzeyi >20–22 mg/L’yi aştığında nöronal GABA-A reseptörlerini bloke ederek NCSE/ensefalopatiyi tetikler.',
      },
    ],
    pkCards: [
      {
        label: 'Yarı Ömür (t½)',
        value: '2,0 – 2,3 saat',
        detail: 'Normal böbrek fonksiyonunda; eGFR <10 mL/dk’da 13–18 saate uzar (CIN riski!).',
      },
      {
        label: 'Protein Bağlanması',
        value: '%16 – 20',
        detail: 'Çok düşük protein bağlanması → serbest fraksiyon >%80, yüksek doku ve BOS penetrasyonu.',
      },
      {
        label: 'BOS Penetrasyonu',
        value: '%10 – 20 (Sepsiste ↑)',
        detail: 'Nöroşirürji sonrası P. aeruginosa/Gram-negatif menenjitte 2 g q8sa etkindir; aynı özellik yüksek birikimde CIN riskini doğurur.',
      },
      {
        label: 'Eliminasyon',
        value: '%85 Renal (Değişmeden)',
        detail: 'Esasen glomerüler filtrasyonla atılır; eGFR <60 mL/dk’dan itibaren doz mutlaka azaltılmalıdır!',
      },
    ],
    contraindications: {
      absoluteItems: [
        'Sefepime veya aynı R1 yan zincirini paylaşan Sefotaksim/Seftriaksona karşı belgelenmiş ağır IgE-aracılı anafilaksi öyküsü.',
        'Şiddetli gecikmiş kütanöz reaksiyon (SJS/TEN/DRESS/AGEP) öyküsü.',
      ],
      relativeItems: [
        'Mevcut ağır ensefalopati, açıklanamayan deliryum veya kontrolsüz epilepsi / NCSE öyküsü (mümkünse Pip-Tazo veya Meropenem tercih edilir).',
        'Hızla kötüleşen ABH veya eGFR <60 mL/dk’da yakın renal izlem olmadan 2 g q8sa yüksek doz uygulaması.',
        'İntra-abdominal veya aspirasyon enfeksiyonunda Metronidazol eklenmeden monoterapi kullanımı.',
      ],
      clinicalNote:
        'Postoperatif veya YBÜ’de anestezi/sedasyon kesilmesine rağmen "uyanamayan", ajite/afazik veya hafif yüz/el miyoklonusu olan sefepim hastasında ilk akla gelecek tanı Sefepim Nörotoksisitesi (CIN) olmalıdır!',
    },
    regimenCards: [
      {
        title: 'Komplike ÜSE & Akut Piyelonefrit (Psödomonas / AmpC Riski)',
        setting: 'core',
        badge: 'FDA / EAU / IDSA Onaylı',
        dose: '1–2 g IV',
        infusionDuration: '30 dk IV',
        interval: 'q12sa (Ağır/Ürosepsis: 2 g q8sa)',
        note: 'Orta şiddetli komplike ÜSE ve akut piyelonefritte 1–2 g q12sa; ağır ürosepsis, P. aeruginosa veya yüksek riskli AmpC üreten Enterobacterales (E. cloacae, C. freundii) enfeksiyonlarında 2 g q8sa (3 saat EI) uygulanır.',
      },
      {
        title: 'Komplike İntra-Abdominal Enfeksiyon (+ Metronidazol ZORUNLU!)',
        setting: 'core',
        badge: 'FDA / SIS · +Metronidazol ŞART',
        dose: '2 g IV (+ Metronidazol 500 mg q8sa)',
        infusionDuration: '30 dk – 3 sa (EI)',
        interval: 'q8–12sa',
        note: 'Peritonit, intra-abdominal apse ve kolorektal/biliyer perforasyonda 2 g q8–12sa (ağır/YBÜ/Psödomonas’ta 2 g q8sa). KRİTİK: Sefepim B. fragilis anaeroblarına ETKİSİZDİR — mutlaka ayrı IV lümenden Metronidazol 500 mg q8sa eklenmelidir!',
      },
      {
        title: 'Komplike Deri ve Yumuşak Doku Enfeksiyonu (cSSTI)',
        setting: 'core',
        badge: 'FDA / IDSA Onaylı',
        dose: '2 g IV',
        infusionDuration: '30 dk IV',
        interval: 'q12sa (Ağır/Psödo: q8sa)',
        note: 'P. aeruginosa veya Gram-negatif riskli komplike cilt-yumuşak doku ve diyabetik ayak enfeksiyonlarında MSSA + Gram-negatif kapsam sağlar (2 g q12sa; ağır/Psödomonas’ta 2 g q8sa). MRSA için Vankomisin/Linezolid, anaerob/nekroz şüphesinde Metronidazol eklenir.',
      },
      {
        title: 'Orta-Ağır Toplum & Hastane Kökenli Pnömoni (HAP / VAP)',
        setting: 'core',
        badge: 'ATS / IDSA HAP-VAP 1. Basamak',
        dose: '2 g IV',
        infusionDuration: '30 dk – 3 sa (EI)',
        interval: 'q8sa (Orta TKP: q12sa)',
        note: 'Psödomonas riskli ağır TKP (makrolid/florokinolon ile) ve HAP/VAP tedavisinde 2 g q8sa (3 saat EI; MRSA riskinde Vankomisin/Linezolid ekli) 1. basamak antipsödomonal ajandır. Aspirasyon/akciğer apsesinde Metronidazol eklenir.',
      },
      {
        title: 'Yüksek Riskli Antipsödomonal / AmpC Cerrahi Profilaksi (Özel)',
        setting: 'perioperative',
        badge: 'Seçilmiş Yüksek Risk',
        dose: '2 g IV',
        infusionDuration: '30 dk IV',
        interval: 'q4sa redozaj',
        note: 'Rutin temiz cerrahi profilaksisi DEĞİLDİR (Sefazolin seçin!). Yalnızca antipsödomonal/AmpC kolonize seçilmiş olgularda insizyondan 30–60 dk önce 2 g IV; intra-abdominalde mutlaka Metronidazol 500 mg IV eklenir.',
      },
      {
        title: 'YBÜ Febril Nötropeni / VAP / Septik Şok — Uzamış İnfüzyon',
        setting: 'icu',
        badge: 'YBÜ 1. Tercih · 3 sa EI',
        dose: '2 g Yükleme → 2 g EI',
        infusionDuration: '3 saat (EI)',
        interval: 'q8sa (6 g/gün)',
        note: 'İlk doz 2 g 30 dk yükleme → ardından 2 g q8sa 3 saatlik uzamış infüzyon (100 mL SF → 33,3 mL/saat). Yüksek MIC’li P. aeruginosa ve AmpC suşlarında %fT>MIC maksimizasyonu sağlar.',
      },
      {
        title: 'AmpC Enterobacterales (E. cloacae / C. freundii / K. aerogenes)',
        setting: 'icu',
        badge: 'IDSA 2024 1. Basamak',
        dose: '2 g IV',
        infusionDuration: '3 saat (EI)',
        interval: 'q8sa (MIC ≤2)',
        note: 'IDSA 2024 kılavuzu: MIC ≤2 mcg/mL ise 2 g q8sa (3 saat EI) 1. tercihtir; MIC 4–8 (SDD) ise 2 g q8sa EI veya ESBL eşlik şüphesinde Meropenem tercih edilir.',
      },
      {
        title: 'Post-Nöroşirürji Menenjit / Ventrikülit',
        setting: 'special',
        badge: 'SSS Antipsödomonal',
        dose: '2 g IV',
        infusionDuration: '30 dk – 3 sa',
        interval: 'q8sa',
        note: 'Sağlık bakımı ilişkili menenjitte Vankomisin ile kombine 1. basamak ajanlardan biridir (MRSA + P. aeruginosa kapsama).',
      },
    ],
    calculator: {
      defaultWeightKg: 75,
      weightScalar: 'TBW',
      obesityRationale:
        'Sabit erişkin dozları (2 g q8sa) uygulanır; morbid obezitede (≥120 kg) veya ARC’de 3 saatlik uzamış infüzyon önerilir, ancak eGFR düşüşü geliştiği anda CIN riskine karşı doz derhal böbrek fonksiyonuna göre ayarlanmalıdır.',
      perioperative: {
        applicable: true,
        summaryTitle: 'Seçilmiş Yüksek Riskli Cerrahi Profilaksi (Rutin Temiz Cerrahide Sefazolin Seçin!)',
        timingWindow: 'İnsizyondan 30–60 dk önce',
        standardDoseLabel: '2 g IV (İntra-abdominalde + Metronidazol 500 mg IV)',
        adultStandardDoseMg: 2000,
        pediatricMgKg: 50,
        pediatricMaxMg: 2000,
        infusionTimeText: '30 dakikada IV infüzyon',
        redoseHours: 4,
        bloodLossRedoseMl: 1500,
        clinicalNote:
          'Rutin cerrahi profilaksi ajanı DEĞİLDİR (aşırı geniş spektrum + direnç seçilimi). Yalnızca MDR/Psödomonas/AmpC kolonize özel olgularda kullanılır; anaeroblara etkisiz olduğu için GIS/biliyer vakada Metronidazol eklenmesi şarttır.',
      },
      icu: {
        pkPdTarget: 'Serbest konsantrasyonun %fT>MIC ≥ %60–100; ancak nörotoksisite eşiği vadi (trough) <20 mg/L!',
        pkPdBadge: '%fT > MIC · 3 sa EI · CIN Sınırı',
        loadingDoseLabel: '2 g IV (30 dk yükleme)',
        loadingFixedMg: 2000,
        loadingUnit: 'mg',
        loadingInfusionText: '30 dakikada IV yükleme → ardından 3 saatlik EI',
        maintenanceLabel: 'YBÜ Uzamış İnfüzyon (EI) & Standart Rejimler',
        maintenanceMode: 'fixed_regimen',
        fixedOptions: [
          {
            id: 'icu_ei_2g_q8',
            label: 'Febril Nötropeni / VAP / AmpC / Sepsis (2 g q8sa · 3 sa EI)',
            singleDoseMg: 2000,
            intervalHours: 8,
            infusionHours: 3,
            diluentVolumeMl: 100,
            note: 'eGFR ≥60 mL/dk’da altın standart (6 g/gün). 100 mL SF’de 33,3 mL/saat pompa hızı. eGFR <60’ta mutlaka renal sekmeye geçin!',
          },
          {
            id: 'std_2g_q8_30m',
            label: 'Standart Aralıklı (2 g q8sa · 30 dk)',
            singleDoseMg: 2000,
            intervalHours: 8,
            infusionHours: 0.5,
            diluentVolumeMl: 100,
            note: 'Ayrı lümen yoksa 30 dk infüzyon; menenjit ve febril nötropeni (eGFR ≥60).',
          },
          {
            id: 'mod_2g_q12',
            label: 'Orta Şiddetli Enfeksiyon / eGFR 30–60 (2 g q12sa · 3 sa EI)',
            singleDoseMg: 2000,
            intervalHours: 12,
            infusionHours: 3,
            diluentVolumeMl: 100,
            note: 'eGFR 30–60 mL/dk’da CIN riskini belirgin azaltan güvenli rejim (4 g/gün).',
          },
        ],
        tdmNote:
          'Merkezde β-laktam TDM mevcutsa serbest vadi (Cmin) 8–16 mg/L hedeflenir; >20–22 mg/L düzeyleri yüksek CIN/NCSE riski ile ilişkilidir!',
      },
      renalTiers: [
        {
          id: 'egfr_60',
          label: 'Normal Renal Fonksiyon',
          egfrRange: 'eGFR > 60 mL/dk',
          recommendation: 'Tam Doz (2 g q8sa)',
          doseText: '2 g IV q8sa (3 saat EI) — 6 g/gün',
          note: 'Günlük kreatinin ve bilinç/deliryum (CAM-ICU) takibi yapın.',
          tone: 'emerald',
        },
        {
          id: 'egfr_30_60',
          label: 'Orta KBH / ABH (CIN Eşiği!)',
          egfrRange: 'eGFR 30–60 mL/dk',
          recommendation: 'q12sa’ya İndir!',
          doseText: '2 g IV yükleme → 2 g IV q12sa (3 saat EI) — 4 g/gün',
          note: 'KRİTİK: eGFR 30–60 aralığında 2 g q8sa’da ısrar etmek CIN/NCSE’nin en sık nedenidir!',
          tone: 'amber',
        },
        {
          id: 'egfr_11_29',
          label: 'İleri KBH',
          egfrRange: 'eGFR 11–29 mL/dk',
          recommendation: 'q24sa’ya İndir!',
          doseText: '2 g IV yükleme → 2 g IV q24sa (veya 1 g q12sa)',
          note: 'Günlük nörolojik muayene (miyoklonus, afazi, uyanıklık); şüphede hemen EEG ve ilaç değişimi.',
          tone: 'rose',
        },
        {
          id: 'egfr_lt10',
          label: 'Ağır KBY (Diyalizsiz)',
          egfrRange: 'eGFR ≤ 10 mL/dk',
          recommendation: '1 g q24sa (Yüksek CIN Riski)',
          doseText: '1–2 g IV yükleme → 1 g IV q24sa',
          note: 't½ 13–18 saate uzar. Mümkünse ağır KBY’de nörotoksisitesi daha düşük alternatif (Pip-Tazo/Meropenem) düşünün.',
          tone: 'rose',
        },
      ],
      crrtSummary:
        'CRRT (CVVH/CVVHD/CVVHDF): 2 g IV yükleme → 1–2 g IV q12sa (yüksek eflüent ≥30 mL/kg/saat ve Psödomonas/VAP’ta 2 g q12sa 3 saat EI; 2 g q8sa yüksek CIN riski taşır, yakın EEG/bilinç izlemi gerektirir).',
      hdSummary:
        'Aralıklı Hemodiyaliz (IHD): Sefepimin ~%68’i 3 saatlik HD ile temizlenir! Rejim: 1 g IV q24sa (HD gününde seans sonrası) VEYA pratik olarak haftada 3 kez her HD seansı bitiminde 2 g IV. CIN gelişiminde acil HD kurtarıcıdır!',
    },
    turkeyFormulations: {
      preparations: [
        {
          name: 'Maxipime® / Unisef® 1 g IV/IM Flakon',
          presentation: '1 g sefepim HCl + L-arjinin tamponlu toz flakon',
          concentration: '1 g / flakon (Sodyumsuz / Arjinin tamponlu)',
          saltOrBaseNote: 'Sodyum içermez! Hipernatremili YBÜ hastalarında Pip-Tazo veya Amp-Sulb’a kıyasla belirgin Na⁺ avantajı vardır.',
          alertLevel: 'standard',
        },
        {
          name: 'Maxipime® / Unisef® 2 g IV Flakon',
          presentation: '2 g sefepim HCl + L-arjinin toz flakon',
          concentration: '2 g / flakon (Yalnızca IV)',
          saltOrBaseNote: 'YBÜ 2 g q8sa rejimi için tek flakonda hazırlama kolaylığı sağlar.',
          alertLevel: 'standard',
        },
      ],
      standardDilutions: [
        'YBÜ 3 Saatlik Uzamış İnfüzyon (2 g): 10 mL SF/WFI ile sulandırılıp 100 mL %0,9 NaCl veya D5W içine eklenir → 33,3 mL/saat hızla 3 saatte infüze edilir.',
        'Standart 30 dk İnfüzyon (2 g): 50–100 mL %0,9 NaCl veya D5W içinde 30 dakikada infüze edilir.',
      ],
      concentrationTrapWarning:
        'Sefepim SODYUMSUZDUR (L-arjinin ile tamponlanır) — bu hipernatremide avantajdır; ancak eGFR <60’ta 2 g q8sa dozunun unutulup devam ettirilmesi birkaç gün içinde gizli NCSE/koma oluşturur!',
    },
    compatibility: {
      accessRequirement: 'peripheral-ok',
      accessSummary:
        'Periferik veya santral IV hattan güvenle uygulanır. 3 saatlik uzamış infüzyonda Vankomisin ve Metronidazol (özellikle yüksek kons.) geçimsizliklerinden kaçınmak için ayrı lümen tercih edilir.',
      phRange: '4,0 – 6,0',
      osmolalityNote: '2 g / 100 mL SF çözeltisi ~340–380 mOsm/kg olup damar toleransı iyidir.',
      compatibleDiluents: ['%0,9 NaCl (SF)', '%5 Dekstroz (D5W)', 'Ringer Laktat', 'Enjeksiyonluk Su'],
      ySiteCompatible: ['Propofol', 'Fentanil', 'Midazolam', 'Noradrenalin', 'Heparin', 'İnsülin', 'Potasyum klorür'],
      ySiteIncompatible: ['Vankomisin (yüksek kons. / değişken)', 'Metronidazol (aynı torba/hatta renk değişimi — ayrı verin!)', 'Aminoglikozidler', 'Amiodaron', 'Siprofloksasin', 'Magnezyum sülfat (yüksek kons.)', 'Kaspofungin'],
      stabilityNote:
        'SF veya D5W içinde oda sıcaklığında 24 saat (2–8°C’de 7 gün) stabildir; hafif kehribar sararması aktivite kaybı değildir.',
      extravasationProtocol:
        'Düşük irritandır. Ekstravazasyonda infüzyonu durdurup ekstremiteyi eleve edin ve soğuk kompres uygulayın.',
    },
    organImpairment: {
      renalSummary: 'Ağırlıklı (%85) renal atılım — eGFR ≤60 mL/dk’da MUTLAKA doz azaltılır (CIN / NCSE önlemi!); HD ile %68 temizlenir.',
      renalDetails: [
        'eGFR 30–60: ağır FN/VAP’ta 2 g q12sa (standart ÜSE/cSSTI’de 1–2 g q24sa); eGFR 11–29: 2 g q24sa (veya 1 g q12sa); eGFR ≤10: 1 g q24sa (standart: 250–500 mg q24sa).',
        'Sefepim nörotoksisitesi (CIN / NCSE) tipik olarak tedavinin 3–5. gününde başlar; vadi düzeyi >20–22 mg/L toksiktir ve 3 saatlik ACİL HEMODİYALİZ (%68 klirens) kurtarıcı tedavidir.',
        'Periton diyalizi (CAPD/APD) peritonitinde ISPD 2022 IP dozu 1 g IP q24sa (uzun bekleme torbasına) şeklindedir; sistemik absorbsiyona bağlı CIN açısından nörolojik izlem gerekir.',
      ],
      hepaticSummary: 'Karaciğer yetmezliğinde (Child-Pugh A/B/C) farmakokinetik doz ayarı GEREKMEZ; ancak HE vs CIN ayırıcı tanısı kritiktir!',
      hepaticDetails: [
        'Hepatik metabolizma minimaldir ve sodyumsuz (L-arjinin tamponlu) yapısı sirotik asit/hipernatremide avantajdır.',
        'Ancak dekompanse siroz ve hepatik ensefalopatili (HE) hastada CIN tablosu (konfüzyon, miyoklonus, EEG’de trifazik dalgalar) klinik ve EEG olarak HE alevlenmesini birebir taklit eder!',
      ],
      renalMatrix: [
        {
          stage: 'ARC (eGFR > 130 mL/dk)',
          doseBadge: '2 g IV q12sa (3 sa EI)',
          severeDoseBadge: 'FN / VAP / AmpC: 2 g q8sa (3–4 sa EI)',
          note: 'Düşük protein bağlanması (%16–20) nedeniyle ARC’de glomerüler klirens hızlanır; 2 g q8sa (3 saat EI) hedef %fT>MIC sağlar. Ancak eGFR hızla düşmeye başladığı gün CIN/NCSE riski doğduğundan günlük kreatinin ve bilinç (CAM-ICU) takibi zorunludur.',
          tone: 'indigo',
        },
        {
          stage: 'eGFR > 60 mL/dk (Normal Renal Fonksiyon)',
          doseBadge: '1–2 g IV q12sa (Orta ÜSE / cSSTI)',
          severeDoseBadge: 'FN / VAP / Menenjit / AmpC: 2 g q8sa (3 sa EI)',
          note: 'Tam doz uygulanır. Normal eGFR’de dahi yaşlı ve BBB geçirgenliği artmış septik YBÜ hastalarında %10–15 oranında CIN/deliryum gelişebileceğinden günlük nörolojik izlem şarttır.',
          tone: 'emerald',
        },
        {
          stage: 'eGFR 30–60 mL/dk (Orta KBH / ABH · CIN EŞİĞİ!)',
          doseBadge: '1–2 g IV q24sa',
          severeDoseBadge: 'FN / VAP: 2 g yükleme → 2 g IV q12sa (3 sa EI)',
          note: 'KRİTİK EŞİK: eGFR 30–60 aralığında 2 g q8sa’ya devam edilmesi Sefepim Nörotoksisitesi (CIN / NCSE) olgularının en sık nedenidir! Mutlaka q12sa’ya (standart ÜSE/cSSTI’de q24sa’ya) indirilmelidir.',
          tone: 'amber',
        },
        {
          stage: 'eGFR 11–29 mL/dk (İleri KBH)',
          doseBadge: '500 mg–1 g IV q24sa',
          severeDoseBadge: 'FN / VAP: 2 g yükleme → 2 g q24sa (veya 1 g q12sa)',
          note: 'Serbest vadi düzeyi hızla >20 mg/L nörotoksik eşiği aşabilir; günlük afazi, miyoklonus ve uyanıklık muayenesi şarttır. Şüphede acil EEG çekilip alternatif sınıfa (Pip-Tazo/Meropenem) geçilir.',
          tone: 'rose',
        },
        {
          stage: 'eGFR ≤ 10 mL/dk (Ağır KBY · Diyalizsiz)',
          doseBadge: '250–500 mg IV q24sa',
          severeDoseBadge: 'FN / VAP: 1–2 g yükleme → 1 g IV q24sa (Yüksek CIN!)',
          note: 't½ 13–18 saate uzar ve üremik toksinler GABA-A inhibisyonunu potansiyalize eder! Ağır KBY’de mümkünse nörotoksisite riski daha düşük antipsödomonal alternatif (Pip-Tazo/Meropenem) tercih edilir.',
          tone: 'rose',
        },
        {
          stage: 'İntermittan Hemodiyaliz (IHD · 3×/hf)',
          doseBadge: 'HD sonrası 1 g IV (3×/hf) veya 500 mg q24sa',
          severeDoseBadge: 'FN / VAP: 1 g q24sa (HD sonrası) veya HD sonrası 2 g (3×/hf)',
          note: 'Sefepimin ~%68’i tek bir 3 saatlik yüksek akımlı HD seansıyla hızla temizlenir! Pratik 3×/hafta şema: her HD seansı bitiminde 1–2 g IV (72 saatlik hafta sonu aralığında 2 g; ağır FN/VAP’ta 1 g q24sa, HD gününde seans sonrası). CIN/NCSE gelişiminde ACİL HEMODİYALİZ en hızlı kurtarıcı tedavidir!',
          tone: 'amber',
        },
        {
          stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
          doseBadge: '20–25 mL/kg/sa: 1 g IV q12sa',
          severeDoseBadge: '≥30 mL/kg/sa veya VAP/FN: 2 g IV q12sa (3 sa EI)',
          note: '2 g IV tam yükleme sonrası 20–25 mL/kg/sa eflüentte 1–2 g q12sa, ≥30 mL/kg/sa yüksek eflüent veya P. aeruginosa/VAP’ta 2 g q12sa (3 sa EI) önerilir. CRRT’de 2 g q8sa yüksek CIN/NCSE riski taşır (yalnızca çok yüksek eflüent + TDM veya yakın EEG izlemiyle düşünülür).',
          tone: 'sky',
        },
        {
          stage: 'SLED / PIRRT (6–12 sa/gün)',
          doseBadge: '1 g IV q12sa (seans sonrası)',
          severeDoseBadge: 'FN / VAP: 2 g yükleme → 1 g q12sa veya 2 g q24sa (SLED sonrası)',
          note: 'SLED seansı sırasında anlamlı (~%50–65) klirens gerçekleşir; dozlardan biri mutlaka SLED bitimine zamanlanmalı, diyalizsiz günlerde birikim/CIN açısından bilinç izlemi sürdürülmelidir.',
          tone: 'sky',
        },
        {
          stage: 'Periton Diyalizi (CAPD / APD · ISPD 2022)',
          doseBadge: 'Sistemik: 1 g IV q48sa (Ağır: 1–2 g q48sa / 1 g q24sa)',
          severeDoseBadge: 'ISPD 2022 IP Peritonit: 1 g IP q24sa',
          note: 'CAPD/APD sistemik klirensi düşüktür (~%20–25) — aşırı sistemik doz ağır CIN yapar! PD ilişkili peritonitte (ISPD 2022): 1 g IP q24sa uzun bekleme torbasına (≥6 saat bekleme; sürekli IP’de 500 mg/L yükleme → 125 mg/L idame) uygulanır; 3–5. günde nörolojik izlem şarttır.',
          tone: 'amber',
        },
      ],
      hepaticMatrix: [
        {
          childPugh: 'Child-Pugh A (5–6 Puan · Hafif)',
          badge: 'Doz Ayarı Yok',
          detail: '%85 değişmeden renal atılır; hepatik metabolizma minimal olduğundan doz değişikliği gerekmez. Sodyumsuz (L-arjinin tamponlu) yapısı asitli hastalarda avantajdır.',
          tone: 'emerald',
        },
        {
          childPugh: 'Child-Pugh B (7–9 Puan · Orta)',
          badge: 'Doz Ayarı Yok · Bilinç İzle',
          detail: 'Hepatik klirens nedeniyle doz azaltımı gerekmez; ancak sirozda BBB geçirgenliği arttığı ve sarkopeni gerçek GFR’yi maskelediği için ensefalopati taraması yapılmalıdır.',
          tone: 'amber',
        },
        {
          childPugh: 'Child-Pugh C (10–15 Puan · Dekompanse)',
          badge: 'Doz Ayarı Yok · HE vs CIN Tuzağı!',
          detail: 'Sodyumsuz formülasyonu asit/hipernatremide avantaj sunar; ANCAK Child-Pugh C’de gelişen Sefepim Nörotoksisitesi (konfüzyon, asteriksis benzeri miyoklonus, koma, EEG’de trifazik dalgalar) HEPATİK ENSEFALOPATİ ile birebir karışır! Laktüloza yanıtsız ensefalopatide derhal Sefepim kesilip acil EEG çekilir.',
          tone: 'rose',
        },
      ],
      dualOrganNote:
        'Sefepim için en tehlikeli klinik tablo dekompanse siroz (Child-Pugh C) + böbrek yetmezliği (HRS / eGFR <60) veya kırılgan yaşlı KBH hastasıdır: (1) Sefepim Nörotoksisitesi (CIN / NCSE) ile hepatik ensefalopati hem klinik (konfüzyon, miyoklonus, uyanamama) hem EEG (trifazik dalgalar / GPD) olarak ayırt edilemeyebilir ve yanlışlıkla laktüloz artırılırken CIN derinleşir. (2) eGFR <60’a düştüğü anda doz derhal renal matrise göre azaltılmalı; CIN şüphesinde Sefepim hemen kesilmeli, acil EEG çekilmeli ve ağır KBY/komada 3 saatlik ACİL HEMODİYALİZ (~%68 klirens) kurtarıcı tedavi olarak uygulanmalıdır!',
    },
    geriatricObesity: {
      geriatricReductionBadge: 'Yüksek CIN Riski!',
      geriatricPoints: [
        '65 yaş üstü ve bilişsel kırılganlığı olan hastalarda sefepim ilişkili deliryum, afazi ve NCSE riski en yüksektir (ACORN JAMA 2023).',
        'Kreatinin normal görünse bile Cockcroft-Gault ile eGFR hesaplayın; belirsiz deliryumda acil EEG ve alternatif antibiyotik (Pip-Tazo/Meropenem) düşünün.',
      ],
      obesityWeightScalarBadge: 'TBW · 2 g q8sa EI',
      obesityPoints: [
        'eGFR normal olan obez hastalarda (VKİ ≥40 kg/m²) 2 g q8sa 3 saatlik EI önerilir; ancak obez + KBH kombinasyonunda aşırı birikim riskine dikkat edilmelidir.',
      ],
      clinicalNote:
        'YBÜ’de anestezi sonrası veya sedasyon tatilinde beklenen uyanma gerçekleşmiyorsa, antibiyotik listesinde Sefepim olup olmadığını ilk 60 saniyede kontrol edin!',
    },
    pregnancyLactation: {
      pregnancySummary: 'Gebelikte Ciddi Psödomonal/Febril Nötropeni Enfeksiyonlarında Kullanılabilir (Eski FDA B).',
      pregnancyDetails: [
        'Hayvan çalışmalarında teratojenite göstermemiştir; insan gebelik verileri sefazolinden/seftriaksondan daha sınırlı olmakla birlikte ağır enfeksiyonda fayda riski aşar.',
      ],
      lactationSummary: 'Emzirme ile Uyumlu (LactMed).',
      lactationDetails: [
        'Anne sütüne çok düşük düzeyde (~0,5 mg/L) geçer; bebekte sistemik birikim beklenmez.',
      ],
    },
    adverseEffects: [
      {
        title: 'Sefepim Nörotoksisitesi (CIN: Ensefalopati / Miyoklonus / NCSE)',
        incidenceOrSeverity: 'YBÜ’de %3–15 (Kritik!)',
        detail:
          'Özellikle eGFR <60’ta (ancak normal böbrekte de!) konfüzyon, afazi, multifokal miyoklonus, koma ve EEG’de trifazik dalgalar/NCSE. ACORN (JAMA 2023) çalışmasında Pip-Tazo’dan daha sık nörolojik disfonksiyon saptanmıştır.',
        tone: 'rose',
      },
      {
        title: 'C. difficile İlişkili İshal & Kolit',
        incidenceOrSeverity: '%2–5',
        detail:
          'Geniş spektrumlu Gram-negatif aktivitesi nedeniyle flora bozulması ve C. difficile riski.',
        tone: 'amber',
      },
      {
        title: 'Pozitif Direkt Coombs Testi / Nötropeni',
        incidenceOrSeverity: '%1–16 (Coombs)',
        detail:
          'Çoğunlukla hemolizsiz pozitif Coombs testi; uzun süreli kullanımda nadiren geri dönüşlü nötropeni.',
        tone: 'indigo',
      },
      {
        title: 'Hipersensitivite & Döküntü',
        incidenceOrSeverity: '%1–4',
        detail:
          'Seftriakson ve Sefotaksim ile aynı R1 yan zincirini paylaştığından aralarında çapraz alerji görülebilir.',
        tone: 'teal',
      },
    ],
    specialClinicalCautions: [
      {
        title: 'Açıklanamayan YBÜ Deliryumu / Komasında ACİL EEG',
        detail:
          'CIN’in tipik EEG bulgusu jeneralize periyodik deşarjlar (GPD), trifazik dalgalar veya non-konvülzif status epileptikus (NCSE) paternidir; ilaç kesildikten 2–3 gün içinde (HD yapılırsa 24 saatte) dramatik düzelir.',
      },
      {
        title: 'İntra-Abdominal Enfeksiyonda Metronidazol Zorunluluğu',
        detail:
          'Sefepim B. fragilis’e etkisizdir; peritonit, apse veya kolorektal kaçak şüphesinde mutlaka IV Metronidazol 500 mg q8sa ile kombine edilmelidir (farklı lümenden!).',
      },
      {
        title: 'Hipernatremili YBÜ Hastasında Avantaj',
        detail:
          'Piperasilin-Tazobaktam (~40 mEq Na⁺/gün) ve Ampisilin-Sulbaktam (~60–90 mEq Na⁺/gün) aksine Sefepim sodyumsuzdur (L-arjinin tamponlu).',
      },
      {
        title: 'AmpC Üreten Bakterilerde Karbapenem Koruyucu 1. Basamak',
        detail:
          'IDSA 2024: E. cloacae, C. freundii ve K. aerogenes için Seftriakson/Pip-Tazo tedavi sırasında AmpC derepresyonu ile direnç geliştirir; Sefepim (MIC ≤2) ise karbapenem kullanmadan güvenli kür sağlar.',
      },
    ],
    deepPharmacodynamics: {
      receptorMechanism: {
        title: 'Zwitteriyonik Porin Penetrasyonu, PBP2/3 & Nöronal GABA-A Antagonizması',
        summary:
          'Sefepim bakteride PBP2/PBP3’ü açillerken, santral sinir sisteminde yüksek BOS konsantrasyonlarında inhibitör GABA-A reseptörlerinin klorür kanalını kompetitif olarak bloke eder.',
        points: [
          'Pozitif yüklü N-metilpirolidin grubu Gram-negatif dış membran porinlerinden hızlı giriş sağlar ve AmpC β-laktamaz aktif merkezine bağlanma afinitesini düşürür.',
          'BOS’ta yüksek konsantrasyonlarda β-laktam halkası nöronal GABA-A reseptörlerine bağlanarak GABA-aracılı Cl⁻ girişini azaltır ve kortikal hipereksitabilite (NCSE) başlatır.',
        ],
      },
      intracellularSignaling: {
        title: 'Bakteriyel Lizis vs Kortikal İnhibisyon Kaybı',
        summary:
          'Bakteri duvarında peptidoglikan sentezini durdurarak hızlı otoliz tetikler; memeli nöronlarında ise inhibitör postsinaptik potansiyelleri (IPSP) baskılar.',
        points: [
          'Sepsis ve üremide kan-beyin bariyeri (BBB) geçirgenliği artar ve organik asitlerin BOS’tan dışa pompalanması (OAT3) bozulur; böylece BOS sefepim oranı %10’dan %45’e fırlayabilir.',
          'Aynı zamanda böbrek yetmezliğinde biriken üremik toksinler de GABA-A inhibisyonunu potansiyalize ederek miyoklonus ve trifazik EEG dalgalarını tetikler.',
        ],
      },
      tissueOrganSystems: [
        {
          systemTitle: 'Santral Sinir Sistemi (BOS & Korteks)',
          tissueTarget: 'GABA-A Reseptörleri',
          accent: 'rose',
          points: [
            'Post-nöroşirürji menenjitte yüksek BOS geçişi terapötik avantajdır.',
            'Vadi plazma düzeyi >20–22 mg/L olduğunda CIN olasılığı %50’yi aşar; yaşlı ve KBH’li hastada en yüksek dikkat gerekir.',
          ],
        },
        {
          systemTitle: 'Akciğer & Alveoler Epitel Sıvısı (VAP)',
          tissueTarget: 'ELF Penetrasyonu ~%60–100',
          accent: 'teal',
          points: [
            'Yüksek serbest fraksiyon (%80–84) sayesinde akciğer parankimi ve ELF’ye mükemmel geçer.',
            '3 saatlik uzamış infüzyon (2 g q8sa) P. aeruginosa MIC ≤8 mcg/mL suşlarında >%90 PTA sağlar.',
          ],
        },
        {
          systemTitle: 'Renal Eliminasyon & Hemodiyaliz',
          tissueTarget: 'Glomerüler Filtrasyon',
          accent: 'sky',
          points: [
            'Düşük protein bağlanması (%16–20) ve küçük molekül ağırlığı nedeniyle konvansiyonel hemodiyalizle %68 oranında hızla temizlenir.',
            'ABH’de kreatinin yükselmeye başladığı gün doz aralığı uzatılmazsa 48–72 saat içinde toksik birikim oluşur.',
          ],
        },
        {
          systemTitle: 'Sıvı-Elektrolit Profili',
          tissueTarget: 'Sodyumsuz Formülasyon',
          accent: 'amber',
          points: [
            'L-arjinin tamponu nedeniyle sodyum yükü yoktur; ağır hipernatremi veya konjestif kalp yetmezliğinde Pip-Tazo’ya göre sıvı-elektrolit avantajı sunar.',
          ],
        },
      ],
      synergyAndCeiling: {
        title: 'Dar Terapötik-Nörotoksik Pencere & 3 Saatlik EI',
        summary:
          '3 saatlik uzamış infüzyon pik düzeyi düşürüp vadiyi (fT>MIC) iyileştirir; ancak böbrek yetmezliğinde vadi konsantrasyonunun >20 mg/L’ye tırmanması CIN’i tetikler.',
        points: [
          'ACORN çalışması (JAMA 2023) ampirik sepsiste Pip-Tazo vs Sefepim arasında ABH farkı olmadığını, buna karşın Sefepim kolunda koma/deliryumsuz günlerin daha az olduğunu kanıtlamıştır.',
          'AmpC üreten Enterobacterales’te (MIC ≤2) Sefepim karbapenem tasarrufu sağlayan en güçlü ajandır.',
        ],
      },
      clinicalPearls: [
        'Sefepim alan YBÜ hastasında yeni gelişen afazi, konfüzyon, yüz/el seyirmesi (miyoklonus) veya sedasyon sonrası uyanamama = aksi kanıtlanana kadar CIN / NCSE!',
        'CIN tedavisinde benzodiazepin tek başına yetmez — asıl tedavi SEFEPİMİ KESMEK ve ağır KBY’de acil HEMODİYALİZ yapmaktır.',
        'İntra-abdominal sepsiste Sefepim + Metronidazol kombinasyonunu ayrı Y-hatlardan uygulayın.',
      ],
    },
    referencesAndInteractions: {
      drugName: 'Sefepim',
      structuredInteractions: [
        {
          severity: 'D',
          agent: 'Yüksek Doz Aminoglikozidler & Loop Diüretikler (Furosemid)',
          mechanism: 'Aditif renal klirens düşüşü → sefepim birikimi',
          clinicalEffect: 'ABH gelişirse sefepim klirensi hızla düşerek ikincil CIN/NCSE tablosunu tetikler.',
          management: 'Günlük kreatinin takibi yapın; eGFR <60’a düştüğü anda sefepim dozunu q12sa’ya çekin.',
        },
        {
          severity: 'C',
          agent: 'Metronidazol (Fiziksel Y-Site)',
          mechanism: 'Aynı çözelti/hatta fizikokimyasal geçimsizlik (renk değişimi/çökelme)',
          clinicalEffect: 'Etkinlik kaybı ve partikül oluşumu.',
          management: 'İntra-abdominal enfeksiyonda mutlaka ayrı IV lümenden veya arada SF yıkamasıyla verin.',
        },
        {
          severity: 'C',
          agent: 'Nöbet Eşiğini Düşüren Ajanlar (Teofilin, Florokinolonlar, Tramadol)',
          mechanism: 'Aditif santral GABA-A inhibisyonu',
          clinicalEffect: 'Sefepim ilişkili nöbet ve NCSE riskinde artış.',
          management: 'eGFR <60 olan hastalarda nöbet eşiğini düşüren eşzamanlı ilaçları minimize edin.',
        },
      ],
      references: [
        {
          authors: 'Qian ET, Casey JD, Wright A, et al. (ACORN Investigators).',
          title: 'Cefepime vs Piperacillin-Tazobactam in Adults Hospitalized With Acute Infection: The ACORN Randomized Clinical Trial',
          journal: 'JAMA',
          year: 2023,
          note: 'Sefepim kolunda nörolojik disfonksiyon/deliryum artışını gösteren 2511 hastalık randomize klinik çalışma.',
        },
        {
          authors: 'Tamma PD, Heil EL, Justo JA, Mathers AJ, Satlin MJ, Bonomo RA.',
          title: 'Infectious Diseases Society of America 2024 Guidance on the Treatment of Antimicrobial-Resistant Gram-Negative Infections',
          journal: 'Clin Infect Dis',
          year: 2024,
          note: 'AmpC üreten Enterobacterales (E. cloacae, C. freundii, K. aerogenes) enfeksiyonlarında Sefepim 2 g q8sa (3 saat EI) 1. basamak kılavuzu.',
        },
        {
          authors: 'Payne LE, Gagnon DJ, Riker RR, et al.',
          title: 'Cefepime-induced neurotoxicity: a systematic review',
          journal: 'Crit Care',
          year: 2017,
          note: 'CIN klinik spektrumu (bilinç bulanıklığı, miyoklonus, afazi, NCSE), renal risk faktörleri ve acil hemodiyalizin rolü.',
        },
      ],
      drugsComUrl: 'https://www.drugs.com/drug-interactions/cefepime.html',
      medscapeUrl: 'https://reference.medscape.com/drug-interactionchecker',
    },
  },
];
