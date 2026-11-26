import type { OrganImpairmentMatrixPayload } from '../../components/treatments/shared/DrugMonographBlocks';

export type StandaloneOrganPart1Id =
  | 'acetazolamide'
  | 'atropine'
  | 'desflurane'
  | 'dexamethasone'
  | 'dobutamine'
  | 'dopamine'
  | 'ephedrine'
  | 'epinephrine'
  | 'esmolol'
  | 'flumazenil'
  | 'furosemide'
  | 'glyceryl-trinitrate'
  | 'hydrocortisone';

/**
 * Bağımsız Monografiler (Part 1 — 13 İlaç) için Tam Böbrek (eGFR / IHD / PD / CRRT / SLED)
 * ve Karaciğer (Child-Pugh A / B / C) Doz Ayarlama Matrisleri.
 *
 * Kaynaklar: KDIGO, EASL, AHA ACLS, Aronoff (Drug Prescribing in Renal Failure),
 * Miller's Anesthesia, Stoelting's Pharmacology & Physiology in Anesthetic Practice.
 */
export const STANDALONE_ORGAN_PART1: Record<StandaloneOrganPart1Id, OrganImpairmentMatrixPayload> = {
  acetazolamide: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (CrCl > 50 · Normal)',
        doseBadge: 'Standart (%100 · q6h–q24h)',
        note: 'İlaç neredeyse %100 değişmeden proksimal tübüler sekresyonla atılır (t½ 2,4–5,8 sa). Endikasyona göre standart rejim (met. alkaloz 250–500 mg IV q12–24h; ADVOR 500 mg IV/gün × 3 gün) uygulanır.',
        tone: 'emerald',
      },
      {
        stage: 'Orta–İleri KBY (CrCl 10–50 mL/dk)',
        doseBadge: 'Aralık ≥ q12h (Maks 250–500 mg q12h)',
        note: 'Renal klirens belirgin düşer ve t½ uzar; doz aralığı en az 12 saat olmalıdır. Birikime bağlı ağır hiperkloremik normal anyon açıklı metabolik asidoz (NAGMA), hipokalemi, parestezi ve SSS toksisitesi için yakın kan gazı/HCO₃⁻ izlemi şarttır.',
        tone: 'amber',
      },
      {
        stage: 'Ağır KBY / Anüri (CrCl < 10 mL/dk)',
        doseBadge: 'KONTRENDİKE',
        note: 'Mutlak kontrendike! Tübüler karbonik anhidraz inhibisyonu etkisiz kalırken ilaç masif birikir → refrakter şiddetli metabolik asidoz, ensefalopati, miyoklonus ve ağır elektrolit bozukluğu gelişir.',
        tone: 'rose',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'KAÇININ / KONTRENDİKE',
        note: 'IHD ile yalnızca %20–30 oranında uzaklaştırılır. Son dönem böbrek yetmezliğinde (SDBY) diüretik etki yoktur ve ağır asidoz/nörotoksisite riski nedeniyle rutin kullanılmaz; metabolik alkaloz diyalizat HCO₃⁻ azaltılarak düzeltilir.',
        tone: 'rose',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'KAÇININ / KONTRENDİKE',
        note: 'Periton diyalizi klirensi ihmal edilebilir düzeydedir. Ciddi ilaç birikimi, uzamış metabolik asidoz ve SSS toksisitesi riski nedeniyle kaçınılmalıdır.',
        tone: 'rose',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'KAÇININ / KONTRENDİKE',
        note: 'CRRT ile orta düzeyde temizlense de öngörülemeyen asidoz yükü yaratır ve klinik gereksinimi yoktur; YBÜ’de metabolik alkaloz yönetimi CRRT replasman/diyalizat bikarbonat reçetesi üzerinden yapılır.',
        tone: 'rose',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: 'Dikkatli Kullanım · İzlem',
        detail:
          'Karaciğerde metabolize olmaz; siroz/portal hipertansiyon yoksa standart doz uygulanabilir. Ancak kompanse sirozda dahi idrar alkalinizasyonu amonyak retansiyonunu tetikleyebileceğinden mental durum ve serum NH₃ yakından izlenmelidir.',
        tone: 'amber',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'KONTRENDİKE',
        detail:
          'İdrar alkalinizasyonu tübül lümeninde NH₄⁺ iyonunu lipofilik NH₃ gazına dönüştürerek renal amonyum atılımını bloke eder ve sistemik geri emilimi hızlandırır → akut hiperamonyemi ve hepatik ensefalopati presipite eder.',
        tone: 'rose',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'MUTLAK KONTRENDİKE',
        detail:
          'Hızlı hepatik ensefalopati ve hepatik koma riski nedeniyle kesinlikle kontrendikedir. Sirotik asit/volüm yönetiminde asla tercih edilmez; Spironolakton + Furosemid kombinasyonu seçilmelidir.',
        tone: 'rose',
      },
    ],
    dualOrganNote:
      'Hem CrCl < 10 mL/dk hem de Child-Pugh B/C sirozda MUTLAK KONTRENDİKEDİR. Kombine hepatorenal disfonksiyonda tek bir 500 mg IV doz dahi eş zamanlı ağır metabolik asidoz ve hiperamonyemik koma tetikleyebilir; hipoalbüminemi (ilaç %90–95 protein bağlıdır) serbest fraksiyonu ve nörotoksisite riskini daha da artırır.',
  },

  atropine: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: 'Standart (%100)',
        note: 'Atropinin %30–50’si değişmeden böbreklerden, ~%50’si hepatik hidrolizle atılır (t½ 2–4 sa). ACLS bradikardide sabit 1 mg IV (q3–5dk, maks 3 mg), NMB geri dönüşünde 0,015–0,02 mg/kg uygulanır.',
        tone: 'emerald',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: 'Standart (%100)',
        note: 'Tek doz acil veya perioperatif uygulamada doz azaltımı gerekmez. Tekrarlayan dozlarda idrar retansiyonu, taşikardi ve ağız kuruluğu izlenmelidir.',
        tone: 'sky',
      },
      {
        stage: 'Ağır KBY (eGFR < 30 mL/dk)',
        doseBadge: 'Acil %100 · Tekrarda DİKKAT',
        note: 'Renal atılım (%30–50) azaldığından yarı ömür uzar. Acil bradikardi bolusu azaltılmaz; ancak tekrarlayan dozlarda veya organofosfat infüzyonunda kümülatif antikolinerjik deliryum, idrar retansiyonu ve ileus riski belirgin artar.',
        tone: 'amber',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'ACLS %100 · Diyalize Olmaz',
        note: 'Geniş dağılım hacmi (Vd 2–4 L/kg) nedeniyle IHD ile anlamlı uzaklaştırılmaz; diyaliz sonrası ek doz gerekmez. Acil ACLS dozu değişmez, ancak tekrarlayan antikolinerjik dozlardan kaçının.',
        tone: 'amber',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'ACLS %100 · Zayıf Klirens',
        note: 'Periton diyalizi ile anlamlı klirens sağlanmaz. Tek acil doz standarttır; kümülatif dozlarda SSS toksisitesi ve paralitik ileus yakından izlenmelidir.',
        tone: 'amber',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'ACLS %100 · Klinik Titrasyon',
        note: 'CRRT klirensi düşüktür. Organofosfat/karbamat zehirlenmesinde sürekli infüzyon yapılıyorsa sabit şema yerine bronkore/sekresyon kuruluğu ve hemodinamiye göre titre edin.',
        tone: 'indigo',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: 'Standart (%100)',
        detail:
          'Hepatik enzimatik hidroliz (tropin ve tropik asit) büyük ölçüde korunur. Tek doz acil bradikardi ve perioperatif kullanımda doz revizyonu gerekmez.',
        tone: 'emerald',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'Tek Bolus %100 · Tekrarda Dikkat',
        detail:
          'Tek acil bolus dozu değişmez; ancak tekrarlayan dozlarda hepatik klirens yavaşlaması nedeniyle antikolinerjik etki süresi uzar, taşikardi ve konfüzyon riski artar.',
        tone: 'amber',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'ACLS %100 · Tekrar Dozdan Kaçının',
        detail:
          'Hayatı tehdit eden bradikardide standart 1 mg IV verilir; fakat tersiyer amin kan-beyin bariyerini geçerek santral antikolinerjik deliryumu tetikler ve hepatik ensefalopatiyi ağırlaştırır/maskeler. NMB reversal için Glikopirolat veya Sugammadeks tercih edilmelidir.',
        tone: 'rose',
      },
    ],
    dualOrganNote:
      'Hem böbrek (%30–50) hem karaciğer (~%50) eliminasyona eşit katkı verdiğinden hepatorenal sendrom veya ileri yaş (>65 yaş) + KBY birlikteliğinde tekrarlayan atropin dozları t½’yi 6–10 saate çıkararak ciddi Santral Antikolinerjik Sendrom (SAS) oluşturur; acil ACLS dışı endikasyonlarda KBB’yi geçmeyen Glikopirolat tercih edin.',
  },

  desflurane: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 · MAC-Titre',
        note: 'Yalnızca %0,02 hepatik metabolizma ile neredeyse tamamen alveoler ventilasyonla elimine olur. İnorganik florür (F⁻) nefrotoksisitesi ve Compound A üretimi SIFIRDIR.',
        tone: 'emerald',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 · MAC-Titre',
        note: 'Doz azaltımı gerekmez. Düşük taze gaz akımında (0,5–1 L/dk) dahi nefrotoksik Compound A oluşturmadığından güvenli idame volatilidir.',
        tone: 'emerald',
      },
      {
        stage: 'Ağır KBY (eGFR < 30 / < 15 mL/dk)',
        doseBadge: '%100 · MAC-Titre',
        note: 'Böbrek yetmezliği farmakokinetiği etkilemez. Düşük kan:gaz çözünürlük katsayısı (0,42) sayesinde renal transplantasyon ve SDBY hastalarında hızlı ve öngörülebilir uyanma sağlar.',
        tone: 'emerald',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '%100 · MAC-Titre',
        note: 'Alveoler eliminasyon diyalizden tamamen bağımsızdır. Hızlı uyanma avantajıyla IHD hastalarında ideal idame ajanıdır; ani konsantrasyon artışlarında sempatik taşikardi/hipertansiyona dikkat edin.',
        tone: 'emerald',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '%100 · MAC-Titre',
        note: 'Doz revizyonu gerekmez. Periton diyalizi sıvısı mevcutsa azalmış FRC nedeniyle hızlı alveoler dengeleme (FA/FI yükselmesi) gözlenebilir; BIS/MAC ile titre edin.',
        tone: 'sky',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '%100 · MAC-Titre',
        note: 'Ekstrakorporeal klirensten etkilenmez. Kritik hastalarda düşük SVR veya hipovolemi varlığında MAC gereksiniminin azalabileceğini dikkate alarak hemodinami ve BIS eşliğinde titre edin.',
        tone: 'sky',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 · MAC-Titre (Tercih Edilir)',
        detail:
          'Metabolizma oranı %0,02 olup TFA hapten oluşumu tüm halojenli volatiller içinde en düşüktür; volatil ilişkili immün hepatit riski teorik düzeydedir.',
        tone: 'emerald',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: '%100 · MAC-Titre (Tercih Edilir)',
        detail:
          'Hepatik arteriyel tampon yanıtını (HABR) ve total hepatik kan akımını en iyi koruyan volatil ajanlardan biridir. Sirotik cerrahide güvenli idame sağlar.',
        tone: 'emerald',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: '%100 · BIS/MAC-Titre (Altın Seçenek)',
        detail:
          'Karaciğer transplantasyonu (anhepatik faz dahil) ve dekompanse sirozda en hızlı nörolojik derlenmeyi sağlayarak postoperatif hepatik ensefalopati ayrımını kolaylaştırır. Ağır ensefalopati, hipoalbüminemi ve hipotermide etkin MAC gereksinimi düşebileceğinden BIS/entropi ile titre edin.',
        tone: 'emerald',
      },
    ],
    dualOrganNote:
      'Kombine hepatorenal yetmezlikte, SDBY’de ve karaciğer transplantasyonunda organ-bağımsız alveoler eliminasyonu ve sıfır florür/Compound A profiliyle en öngörülebilir volatil idame ajanıdır; tek kritik uyarısı kurumuş CO₂ absorbanında (Baralyme/kurumuş soda lime) masif karbon monoksit (CO) üretimi ve ani >1 MAC artışlarda sempatik aktivasyondur.',
  },

  dexamethasone: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: 'Standart (%100)',
        note: 'Başlıca hepatik CYP3A4 (6β-hidroksilasyon) ile metabolize olur; <%10 değişmeden böbrekten atılır. Endikasyona göre tam doz (PONV 4–8 mg IV; hava yolu ödemi 4–8 mg q6h; beyin ödemi 10 mg → 4 mg q6h) verilir.',
        tone: 'emerald',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: 'Standart (%100)',
        note: 'Doz azaltımı gerekmez. Sıfır (0) mineralokortikoid aktivitesi sayesinde Hidrokortizona kıyasla sodyum-su retansiyonu minimaldir; ancak glisemi ve kan basıncı izlenmelidir.',
        tone: 'emerald',
      },
      {
        stage: 'Ağır KBY (eGFR < 30 / < 15 mL/dk)',
        doseBadge: 'Standart (%100) · Glisemi/Sıvı İzle',
        note: 'Aktif ilaç birikmez ve doz indirimi gerekmez. İleri KBY’de insülin direnci, steroid ilişkili hiperglisemi, hipertansiyon ve üremik GİS kanama riski nedeniyle yakın izlem ve gerekirse PPI profilaksisi uygulanmalıdır.',
        tone: 'sky',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '%100 · Post-HD Ek Doz YOK',
        note: 'Yüksek lipofilisite ve ~%77 protein bağlanması nedeniyle hemodiyalizle anlamlı uzaklaştırılmaz; diyaliz sonrası ek replasman dozu gerekmez ve seans zamanlamasından bağımsız verilir.',
        tone: 'emerald',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'Standart (%100)',
        note: 'Periton diyalizi ile anlamlı klirens olmaz. Glukoz bazlı periton diyalizatlarıyla kombine hiperglisemi gelişme riski yüksek olduğundan kan şekeri sık takip edilmelidir.',
        tone: 'sky',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'Standart (%100)',
        note: 'CRRT klirensi ihmal edilebilir düzeydedir. COVID-19/ARDS (6 mg/gün), bakteriyel menenjit veya beyin ödemi dozları tam uygulanır.',
        tone: 'emerald',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: 'Standart (%100)',
        detail:
          'CYP3A4 metabolizması büyük ölçüde korunur. Perioperatif tek doz PONV (4–8 mg IV) ve kısa süreli tedavilerde doz değişikliği gerekmez.',
        tone: 'emerald',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'Tek Doz %100 · Uzun Sürede Dikkat',
        detail:
          'Tek doz perioperatif uygulama değişmez. Çok günlük sistemik tedavilerde CYP3A4 klirensi kısmen azalabileceğinden hiperglisemi, enfeksiyon ve GİS kanama profilaksisi (PPI) değerlendirilmelidir.',
        tone: 'amber',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'Tek Doz %100 · En Düşük İdame Dozu',
        detail:
          'Ağır sirozda CYP3A4 6β-hidroksilasyon yavaşlar (t½ 1,5–2 kat uzar) ve hipoalbüminemi serbest aktif fraksiyonu yükseltir. Tek acil/PONV dozu korunur; ancak çok günlük tedavide GİS/varis kanaması, SBP/fırsatçı enfeksiyon ve asitte sekonder sodyum/sıvı dengesizliği riski yüksektir — en kısa sürede sonlandırılmalıdır.',
        tone: 'amber',
      },
    ],
    dualOrganNote:
      'Kombine böbrek + karaciğer yetmezliğinde Deksametazon 0 mineralokortikoid aktivitesi sayesinde oligürik KBY/asitte Hidrokortizona göre çok daha az Na⁺/su yükü oluşturur; ancak Child-Pugh C + hipoalbüminemide serbest fraksiyon artışı ve üremik trombositopati birleştiğinde GİS kanaması ve hiperglisemi riski katlanır.',
  },

  dobutamine: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 · CO/ScvO₂ Titrasyon',
        note: 'COMT (3-O-metildobutamin) ve hepatik glukuronidasyonla ultra-hızlı yıkılır (t½ ~2 dk); yalnızca inaktif metabolitler idrarla atılır. 2–20 mcg/kg/dk aralığında hemodinamik hedefe göre titre edilir.',
        tone: 'emerald',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 · CO/ScvO₂ Titrasyon',
        note: 'Aktif ilaç birikimi olmaz ve başlangıç doz revizyonu gerekmez. Kardiyorenal sendromda kardiyak debiyi artırıp CVP’yi düşürerek renal perfüzyonu destekleyebilir.',
        tone: 'emerald',
      },
      {
        stage: 'Ağır KBY (eGFR < 30 / < 15 mL/dk)',
        doseBadge: '%100 · Milrinona Üstün',
        note: 'Renal birikim yapmaz (t½ ~2 dk korunur). %80–85 renal atılımlı Milrinonun aksine ağır ABH/ESRD’de uzamış vazoplejik hipotansiyon oluşturmaz (DOREMI avantajı); β₂ vazodilatasyon ve hipokalemiye dikkat edin.',
        tone: 'emerald',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '%100 · Post-HD Ek Doz YOK',
        note: 'Yarı ömrü 2 dk olup sürekli infüzyon hemodinamik yanıta göre titre edildiğinden IHD klirensi klinik olarak önemsizdir; post-HD ek doz gerekmez. UF sırasında β₂ aracılı hipotansiyon ve K⁺ düşüşü izlenmelidir.',
        tone: 'sky',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '%100 · CO/ScvO₂ Titrasyon',
        note: 'Periton diyalizi klirensi ihmal edilebilir; standart hemodinamik titrasyon uygulanır.',
        tone: 'emerald',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '%100 · CO/ScvO₂ Titrasyon',
        note: 'CRRT’de aktif ilaç klirensi endojen doku COMT hızının yanında önemsizdir. Kardiyojenik şok + ABH’de CRRT altında güvenle ve hızla titre edilir.',
        tone: 'emerald',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 · Hemodinamik Titrasyon',
        detail:
          'Yaygın ekstrahepatik doku COMT aktivitesi ve konjugasyon korunduğundan standart titrasyon (2,5–20 mcg/kg/dk) uygulanır.',
        tone: 'emerald',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: '%100 · Hemodinamik Titrasyon',
        detail:
          'Rutin doz azaltımı gerekmez; kardiyak debi (CO), SvO₂/ScvO₂ ve laktat yanıtına göre titre edilir. İskemik hepatopatide ("şok karaciğeri") hepatik venöz konjesyonu azaltarak transaminaz gerilemesini destekler.',
        tone: 'emerald',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: '%100 · Körelmiş β-Yanıt Uyarısı',
        detail:
          'Glukuronidasyon kısmen yavaşlasa da ekstrahepatik COMT klirensi sürer; 2,5 mcg/kg/dk ile başlayın. DİKKAT: Sirotik kardiyomiyopatide miyokardiyal β₁-reseptör down-regülasyonu nedeniyle körelmiş inotropik yanıt görülebilir; eşlik eden düşük SVR’de β₂ vazodilatasyon derin hipotansiyon yapabileceğinden Noradrenalin ile kombine edilmelidir.',
        tone: 'amber',
      },
    ],
    dualOrganNote:
      'Kombine hepatorenal veya kardiyorenal yetmezlikte Dobutaminin organ-bağımsız 2 dakikalık yarı ömrü Milrinona kıyasla büyük güvenlik üstünlüğü sağlar; ancak dekompanse sirozda körelmiş β₁ yanıt ve bazal vazopleji nedeniyle tek başına değil, sıklıkla Noradrenalin eşliğinde ve dinamik CO/EKO izlemiyle titre edilmelidir.',
  },

  dopamine: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 · MAP/KAH Titrasyon',
        note: 'Plazma ve dokularda MAO/COMT ile hızla inaktif HVA/VMA’ya yıkılır (t½ ~2 dk). Bradikardi veya seçilmiş şokta 2–20 mcg/kg/dk aralığında hemodinamik hedefe göre titre edilir.',
        tone: 'emerald',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 · Renal-Doz YASAK (KDIGO 1A)',
        note: 'Doz ayarı gerekmez. KDIGO 2012 Grade 1A: "Renal-doz dopamin" (1–3 mcg/kg/dk) ABH’yi ÖNLEMEZ ve TEDAVİ ETMEZ; diyaliz ihtiyacını veya mortaliteyi azaltmaz, aksine aritmi ve mezenterik iskemi riskini artırır!',
        tone: 'amber',
      },
      {
        stage: 'Ağır KBY (eGFR < 30 / < 15 mL/dk)',
        doseBadge: '%100 · Renal-Doz YASAK (KDIGO 1A)',
        note: 'Aktif ilaç birikmez, hemodinamik hedefe göre titre edilir. Oligürik ABH’de idrar çıkışı artırmak için düşük doz dopamin başlanması kesinlikle kontrendikedir (KDIGO Grade 1A).',
        tone: 'amber',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '%100 · Hemodinamik Titrasyon',
        note: 'Ultra-kısa yarı ömrü (~2 dk) nedeniyle diyaliz klirensi klinik olarak önemsizdir; post-HD ek doz gerekmez. Diyaliz hastalarında aritmi (AF/VT) eşiği düşük olduğundan vazopresör gerektiğinde Noradrenalin tercih edilir (SOAP II).',
        tone: 'sky',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '%100 · Hemodinamik Titrasyon',
        note: 'Periton klirensi klinik etkiyi değiştirmez; MAP ve kalp hızı hedefine göre titre edilir.',
        tone: 'sky',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '%100 · Hemodinamik Titrasyon',
        note: 'CRRT klirensi endojen MAO/COMT yıkımı yanında ihmal edilebilir. Septik/kardiyojenik şokta artmış taşiaritmi ve mortalite riski (SOAP II) nedeniyle ilk seçenek vazopresör Noradrenalindir.',
        tone: 'sky',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 · Hemodinamik Titrasyon',
        detail:
          'Ekstrahepatik doku/plazma MAO ve COMT klirensi korunur; standart hemodinamik titrasyon uygulanır.',
        tone: 'emerald',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: '%100 · Taşiaritmi İzlemi',
        detail:
          'Doz azaltımı gerekmez; ancak sirozda hiperdinamik dolaşım ve bazal sinüs taşikardisi nedeniyle β₁ aracılı AF/SVT/VT riski yakından izlenmelidir.',
        tone: 'amber',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: '%100 · HRS’de Etkisiz / Aritmi Riski',
        detail:
          'Klirens sürer, fakat >10 mcg/kg/dk dozlarda α₁-aracılı splanknik/mezenterik vazokonstriksiyon ve ciddi taşiaritmi riski artar. Hepatorenal sendromda (HRS) dopamin etkisizdir — Terlipressin veya Noradrenalin + Albümin tercih edilmelidir.',
        tone: 'amber',
      },
    ],
    dualOrganNote:
      'Hem ABH/KBY’de ("renal-doz dopamin" — KDIGO 2012 Grade 1A karşıtı) hem de hepatorenal sendromda (HRS) dopaminin renal koruyucu veya tedavi edici rolü YOKTUR; kombine organ yetmezliği + şokta daha düşük aritmi profili nedeniyle ilk basamak vazopresör Noradrenalindir.',
  },

  ephedrine: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (CrCl ≥ 50 · Normal)',
        doseBadge: 'Standart (5–10 mg IV Bolus)',
        note: 'Ana atılım yolu böbrektir (%60–75 değişmeden idrarla atılır; t½ 3–6 sa). İdrar pH’sına yüksek bağımlılık gösterir: asidik idrarda t½ ~3 sa iken ALKALİ İDRARDA (NaHCO₃, asetazolamid, RTA) tübüler geri emilim artar ve t½ > 6 saate uzar!',
        tone: 'emerald',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 · CrCl 10–50)',
        doseBadge: 'İlk Bolus %100 · Sık Tekrardan Kaçın',
        note: 'Renal klirens belirgin yavaşlar ve eliminasyon yarı ömrü uzar. İlk 5–10 mg kurtarıcı bolus verilebilir ancak sık tekrarlayan boluslardan kaçının — uzamış hipertansiyon, taşikardi ve taşiflaksi gelişir.',
        tone: 'amber',
      },
      {
        stage: 'Ağır KBY (eGFR < 30 / CrCl < 10 mL/dk)',
        doseBadge: 'KAÇININ · Fenilefrin / Noradrenalin',
        note: 'Tekrarlayan dozlarda ciddi ilaç birikimi, dirençli hipertansiyon, miyokardiyal iskemi ve taşiflaksi gelişir. Spinal/genel anestezi hipotansiyonunda direkt etkili Fenilefrin veya Noradrenalin tercih edilmelidir.',
        tone: 'rose',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'Zayıf Diyalize Olur · Alternatif Seç',
        note: 'IHD ile zayıf uzaklaştırılır; diyaliz sonrası ek doz gerekmez. Kümülatif hipertansiyon/aritmi ve taşiflaksi riski nedeniyle tekrarlayan efedrin bolusları yerine Fenilefrin/Noradrenalin üstündür.',
        tone: 'rose',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'Zayıf Klirens · Alternatif Seç',
        note: 'Periton diyalizi ile anlamlı klirens sağlanmaz. Tekrarlayan dozlarda birikim ve uzamış pressör etki nedeniyle direkt vazopresörlere geçilmelidir.',
        tone: 'rose',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'Düşük/Değişken · Direkt Ajan Seç',
        note: 'CRRT altındaki kritik hastalarda hem birikim/taşiflaksi hem de presinaptik noradrenalin depolarının tükenmiş olması nedeniyle etkisiz ve güvensizdir — sürekli Noradrenalin infüzyonu tercih edilir.',
        tone: 'amber',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: 'Standart Tek Bolus (%100)',
        detail:
          'Hepatik metabolizma minördür (~%10–20 oksidatif deaminasyon ve p-hidroksilasyon). İntraoperatif tek veya birkaç düşük bolusta doz revizyonu gerekmez.',
        tone: 'emerald',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'Dikkatli Titrasyon',
        detail:
          'Metabolizma etkilenmese de sirotik splanknik vazodilatasyon ve bazal sempatik aktivasyon nedeniyle dolaylı vazopresör yanıtı değişkenleşir; 5 mg’lık küçük boluslarla titre edin.',
        tone: 'amber',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'Kaçının · Noradrenalin Üstün',
        detail:
          'Dekompanse sirozda kronik katekolamin deplesyonu, otonom nöropati ve derin düşük SVR nedeniyle efedrinin dolaylı etkisi zayıf ve öngörülemezdir; erken düşük doz Noradrenalin infüzyonu çok daha güvenlidir.',
        tone: 'amber',
      },
    ],
    dualOrganNote:
      'KBY’de metabolik asidozu düzeltmek için verilen NaHCO₃ veya idrar alkalinizasyonu, efedrinin tübüler geri emilimini artırarak t½’sini dramatik biçimde uzatır; ileri KBY + siroz/kritik hastalıkta tekrarlayan efedrin yerine daima direkt etkili Fenilefrin veya Noradrenalin seçin.',
  },

  epinephrine: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 · Standart ACLS / Titrasyon',
        note: 'Yaygın doku/plazma MAO ve COMT enzimleriyle dakikalar içinde inaktif metanefrin ve VMA’ya yıkılır (t½ ~2 dk). ACLS (1 mg IV q3–5dk), anafilaksi (0,3–0,5 mg IM) ve infüzyon (0,01–0,5 mcg/kg/dk) standarttır.',
        tone: 'emerald',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 · Standart / Titrasyon',
        note: 'Organ-bağımsız klirens nedeniyle doz azaltımı gerekmez. β₂ aracılı hücre içine K⁺ kayması serum potasyumunu hızla düşürebileceğinden seri kan gazı/K⁺ izlemi önerilir.',
        tone: 'emerald',
      },
      {
        stage: 'Ağır KBY (eGFR < 30 / < 15 mL/dk)',
        doseBadge: '%100 · Standart / Titrasyon',
        note: 'Aktif epinefrin birikmez; ACLS, anafilaksi ve şok infüzyon dozları %100 korunur. SDBY hastalarında ani K⁺ dalgalanmaları ve koroner iskemi/aritmi açısından sürekli EKG izlemi şarttır.',
        tone: 'emerald',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '%100 · Diyalizden Etkilenmez',
        note: 'Anlamlı düzeyde diyalize olmaz ve sürekli hemodinamik titrasyon ekstrakorporeal klirensi tamamen geçersiz kılar; post-HD ek doz gerekmez.',
        tone: 'emerald',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '%100 · Standart / Titrasyon',
        note: 'Periton diyalizi klirensi ihmal edilebilir; tüm acil ve infüzyon dozları %100 uygulanır.',
        tone: 'emerald',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '%100 · Standart / Titrasyon',
        note: 'CRRT sırasında doz ayarı gerekmez; MAP, kardiyak debi ve perfüzyon hedeflerine göre titre edilir.',
        tone: 'emerald',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 · Hemodinamik Titrasyon',
        detail:
          'Ekstrahepatik doku/plazma MAO ve COMT klirensi tamamen korunur; ACLS, anafilaksi ve infüzyon dozları standarttır.',
        tone: 'emerald',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: '%100 · Laktat Yorumuna Dikkat',
        detail:
          'Doz revizyonu gerekmez. β₂-reseptör aracılı glikojenoliz/aerobik glikoliz serum laktatını yükseltebilir; hepatik laktat klirensi de yavaşlamaya başladığından trendler klinik perfüzyonla birlikte yorumlanmalıdır.',
        tone: 'amber',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: '%100 · Tip-B Hiperlaktatemi Tuzağı',
        detail:
          'ACLS/anafilaksi ve infüzyon dozları %100 titre edilir. KRİTİK TUZAK: β₂-aracılı aerobik glikoliz + sirozda bozulmuş hepatik Cori döngüsü nedeniyle şiddetli Tip-B hiperlaktatemi gelişir ve kötüleşen doku hipoperfüzyonunu/şoku taklit eder! Şok takibini yalnızca laktata değil ScvO₂, veno-arteriyel pCO₂ gap ve kapiller dolum süresine dayandırın.',
        tone: 'amber',
      },
    ],
    dualOrganNote:
      'Epinefrin hem ağır KBY/RRT hem de Child-Pugh C sirozda tam doz titre edilir; ancak kombine karaciğer + böbrek yetmezliğinde (her iki organ da Cori glukoneogenezinde rol oynar) β₂-kaynaklı Tip-B laktat yüksekliği dramatiktir — bunu yalancı şok progresyonu sanarak gereksiz sıvı/vazopresör tırmandırmaktan kaçının.',
  },

  esmolol: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 · KAH/KB Titrasyon',
        note: 'Ana ilaç eritrosit sitozolik esterazlarıyla organ-bağımsız hidrolize olur (t½ ~9 dk). İnaktif asit metaboliti (ASL-8123; ~1/1500 β-bloker gücü) %100 böbrekten atılır (t½ ~3,7 sa).',
        tone: 'emerald',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 · KAH/KB Titrasyon',
        note: 'Ana ilaç klirensi ve 9 dakikalık yarı ömrü değişmez; 50–300 mcg/kg/dk aralığında standart titre edilir. ASL-8123 birikimi klinik olarak anlamlı uzamış β-blokaj yapmaz.',
        tone: 'emerald',
      },
      {
        stage: 'Ağır KBY (eGFR < 30 / < 15 mL/dk)',
        doseBadge: '%100 · ASL-8123 t½ >37 sa (Minimal Etki)',
        note: 'Ana ilaç t½ (~9 dk) korunur ve doz azaltımı gerekmez. Asit metaboliti ASL-8123’ün yarı ömrü >37 saate (10×) uzar, ancak β-bloker gücü ana ilacın ~1/1500’ü olduğundan klinik etkisi minimaldir; >48 sa yüksek dozda hafif bradikardi ve serum K⁺ izlenmelidir.',
        tone: 'sky',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '%100 · ASL-8123 Diyalize Olur',
        note: 'Ana ilacın 9 dakikalık eritrositer yıkımı IHD’den bağımsızdır (ek doz gerekmez). Biriken asit metaboliti ASL-8123 IHD ile etkin biçimde temizlenir; SDBY’de β-blokajın hafif hiperkalemi potansiyeli izlenmelidir.',
        tone: 'emerald',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '%100 · KAH/KB Titrasyon',
        note: 'Ana ilaç dozu değişmez. ASL-8123 periton diyalizi ile kısmen uzaklaştırılır; uzun süreli infüzyonlarda kalp hızı ve serum K⁺ takip edilmelidir.',
        tone: 'sky',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '%100 · ASL-8123 CRRT ile Temizlenir',
        note: 'Ana ilaç dozu %100 KAH/KB hedefine göre titre edilir. CRRT, biriken ASL-8123 metabolitini sürekli temizleyerek uzun süreli YBÜ infüzyonlarında dahi birikimi sınırlar.',
        tone: 'emerald',
      },
      {
        stage: 'SLED / PIRRT',
        doseBadge: '%100 · KAH/KB Titrasyon',
        note: 'Ana ilaç klirensi tamamen eritrosit esterazlarına bağlıdır; SLED seansı sırasında ek doz gerekmez ve ASL-8123 kısmen temizlenir.',
        tone: 'emerald',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 · Organ-Bağımsız',
        detail:
          'Metabolizma tamamen eritrosit içi esterazlarla gerçekleştiğinden hepatik CYP450 veya karaciğer kan akımı klirensi etkilemez; standart doz uygulanır.',
        tone: 'emerald',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: '%100 · Organ-Bağımsız',
        detail:
          'Eritrositer hidroliz sirozdan etkilenmez (plazma psödokolinesterazından farklıdır!). Standart infüzyonla KAH/KB hedefine göre titre edilir.',
        tone: 'emerald',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: '%100 · Yavaş Başla (Düşük SVR)',
        detail:
          'Karaciğer transplantasyonu anhepatik fazı dahil eliminasyon hızı (t½ ~9 dk) tamamen korunur. Ancak dekompanse sirozda bazal düşük SVR ve hiperdinamik dolaşım nedeniyle hipotansiyon riskini azaltmak için 500 mcg/kg yükleme bolusu atlanıp 25–50 mcg/kg/dk infüzyonla başlanması önerilir.',
        tone: 'emerald',
      },
    ],
    dualOrganNote:
      'Esmolol, eritrosit içi esteraz metabolizması sayesinde hem ağır KBY/RRT hem de Child-Pugh C/anhepatik fazda yarı ömrü (~9 dk) değişmeyen en güvenli ultra-kısa etkili β-blokerdir (plazma psödokolinesterazı düşüklüğünden etkilenmez); yalnızca ağır anemide teorik hafif uzama ve SDBY’de ASL-8123 / K⁺ takibi akılda tutulmalıdır.',
  },

  flumazenil: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: 'Standart (0,2 mg IV q1dk)',
        note: 'Flumazenil %99 hepatik yüksek-ekstraksiyonla inaktif karboksilik asit metabolitine çevrilir (t½ 40–80 dk). Standart titrasyon (0,2 mg IV, gerekirse 0,1–0,2 mg tekrar, maks 1–3 mg) uygulanır.',
        tone: 'emerald',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 · Midazolam Resedasyon İzlemi',
        note: 'Flumazenil farmakokinetiği değişmez. Ancak midazolam tersine çevriliyorsa böbrekten atılan aktif 1-OH-midazolam glukuronid birikmeye başladığından resedasyon izlem süresi uzatılmalıdır.',
        tone: 'sky',
      },
      {
        stage: 'Ağır KBY (eGFR < 30 / < 15 mL/dk)',
        doseBadge: '%100 · YÜKSEK RESEDASYON RİSKİ!',
        note: 'Flumazenil dozu değişmez; ANCAK KBY/SDBY’de midazolamın aktif 1-OH-midazolam glukuronid metaboliti çok uzun süre plazmada kalır ve flumazenilin kısa yarı ömrünü (40–80 dk) aşar → saatler içinde ağır resedasyon ve solunum depresyonu! En az 2–4+ saat monitörize izlem ve gerekirse tekrar doz/infüzyon planlayın.',
        tone: 'amber',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '%100 · Ek Doz Yok · Resedasyon İzle',
        note: 'Hepatik klirensi yüksek olduğundan IHD’de doz revizyonu veya post-HD ek doz gerekmez. Diyaliz hastasında midazolam/diazepam birikimi nedeniyle resedasyon riski çok yüksektir.',
        tone: 'amber',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '%100 · Uzatılmış Gözlem',
        note: 'Doz ayarı gerekmez. Aktif benzodiazepin metabolitleri PD ile yavaş uzaklaştırıldığından tersine çevirme sonrası yakın solunum/bilinç takibi şarttır.',
        tone: 'amber',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '%100 · Resedasyon / Nöbet İzlemi',
        note: 'CRRT altında flumazenil dozu değişmez. Uzun süreli YBÜ midazolam infüzyonundan sonra uygulanması akut yoksunluk ve nöbet tetikleyebileceğinden yalnızca kesin endikasyonda ve düşük titrasyonla verilmelidir.',
        tone: 'amber',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: 'Standart (%100)',
        detail:
          'Başlangıç titrasyon dozu ve kısa süreli tekrar dozlarında klinik olarak anlamlı doz revizyonu gerekmez; standart 2 saatlik resedasyon takibi uygulanır.',
        tone: 'emerald',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'İlk Doz %100 · Tekrar −%40–50',
        detail:
          'Yüksek hepatik ekstraksiyon nedeniyle klirens %40–60’a düşer ve t½ yaklaşık 2 katına (~1,3–1,6 sa) çıkar. İlk uyanma titrasyon dozu (0,2 mg IV) değişmez; ANCAK tekrar dozları veya sürekli infüzyon hızı %40–50 azaltılmalı ya da doz aralığı uzatılmalıdır.',
        tone: 'amber',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'İlk Doz %100 · Tekrar −%60–75',
        detail:
          'Klirens ~%25’e düşer ve t½ yaklaşık 3 katına (~2,4 sa) uzar! İlk titrasyon dozu değişmez; tekrar dozları/infüzyon %60–75 azaltılmalıdır. DİKKAT: Hepatik ensefalopatide endojen benzodiazepin-benzeri ligand antagonizması geçici uyanıklık sağlasa da ensefalopatiyi tedavi etmez ve nöbet/ajitasyon riskini artırır.',
        tone: 'rose',
      },
    ],
    dualOrganNote:
      'Flumazenil böbrekten bağımsız (%99 hepatik) atılırken, tersine çevirdiği midazolamın aktif 1-OH-glukuronidi böbrekten, ana benzodiazepinler ise karaciğerden atılır; bu nedenle hepatorenal disfonksiyonda başlangıç flumazenil yanıtı aldatıcı olabilir — tekrar flumazenil dozlarını %50–75 azaltırken hastayı olası gecikmiş resedasyon ve hepatik ensefalopati açısından uzatılmış monitörizasyonda tutun.',
  },

  furosemide: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: 'Standart (20–40 mg IV/PO)',
        note: 'Henle kalın çıkan kolundaki NKCC2 taşıyıcısına ulaşmak için proksimal tübülden OAT1/OAT3 yoluyla aktif sekrete edilir (%95–99 albümine bağlı). Diüretik naif hastada 20–40 mg IV standart başlangıçtır.',
        tone: 'emerald',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: 'Yükseltilmiş Eşik (40–80 mg IV)',
        note: 'Azalmış renal plazma akımı ve tübüler sekresyon nedeniyle etki bölgesine ulaşan ilaç azalır; diüretik eşik (ceiling) doz yükselir (40–80 mg IV; yanıt yoksa dozu ikiye katlayın).',
        tone: 'amber',
      },
      {
        stage: 'Ağır KBY (eGFR 10–29 mL/dk)',
        doseBadge: '80–200 mg IV · İnfüzyon 10–40 mg/sa',
        note: 'Üremik organik asitler OAT1/3 taşıyıcıları için furosemid ile yarışır → yüksek tek doz (80–200 mg IV) veya sürekli infüzyon (10–40 mg/sa) gerekir. t½ 9–24 saate uzar! OTOTOKSİSİTE ÖNLEMİ: IV uygulama hızı kesinlikle ≤ 4 mg/dk olmalıdır.',
        tone: 'amber',
      },
      {
        stage: 'eGFR < 10 / Anürik IHD',
        doseBadge: 'Anüride ETKİSİZ · Diyalize Olmaz',
        note: 'Yüksek protein bağlanması (%98) nedeniyle hemodiyalizle uzaklaştırılmaz. Anürik hastada tamamen etkisizdir ve yalnızca ototoksisite riski yaratır → kesilmelidir. Rezidüel idrar çıkışı >100–200 mL/gün ise 160–250 mg yüksek doz denemesi yapılabilir.',
        tone: 'rose',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'RRF Varsa 80–250 mg/gün PO/IV',
        note: 'Periton diyalizi ile anlamlı atılmaz. Rezidüel böbrek fonksiyonu (RRF) korunan hastalarda idrar hacmini ve volüm dengesini desteklemek için yüksek doz oral/IV (80–250 mg/gün) kullanılabilir; anürik PD hastasında kesilmelidir.',
        tone: 'amber',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'Etkin UF’de Gereksiz · Weaning’de Kullan',
        note: 'CRRT klirensi ihmal edilebilir. Etkin ultrafiltrasyon (UF) altında sıvı dengesi için rutin furosemid gerekmez ve renal derlenmeyi hızlandırmaz; CRRT’den ayırma (weaning) sürecinde rezidüel diürezi değerlendirmek (furosemid stres testi) veya desteklemek için kullanılabilir.',
        tone: 'indigo',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: 'Düşük Başlangıç · 20–40 mg/gün',
        detail:
          'Asit olmayan kompanse hastada standart diüretik prensipler geçerlidir; erken sirozda elektrolit (K⁺, Na⁺) ve kreatinin yakından izlenmelidir.',
        tone: 'emerald',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: '20–40 mg + Spironolakton (40:100)',
        detail:
          'EASL Sirotik Asit Rehberi: Furosemid tek başına değil, Spironolakton ile 40 mg : 100 mg oranında kombine başlanır (maks 160 mg/gün furosemid + 400 mg/gün spironolakton). Günlük kilo kaybı periferik ödem yoksa ≤ 0,5 kg, ödem varsa ≤ 1,0 kg ile sınırlandırılmalıdır.',
        tone: 'amber',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'Çok Dikkatli · HRS / Komada KESİN!',
        detail:
          'Agresif diürez intravasküler volüm deplesyonu ile Hepatorenal Sendromu (HRS), hipokalemi + metabolik alkaloz yoluyla da Hepatik Ensefalopatiyi hızla tetikler! Hiponatremi (<125 mEq/L), akut kreatinin artışı veya ensefalopati/pre-komada derhal kesilmelidir.',
        tone: 'rose',
      },
    ],
    dualOrganNote:
      'Furosemidin tübüler OAT1/3 taşıyıcılarına ulaşması plazma albüminine bağlanmasına bağlıdır: ağır siroz/nefrotik sendromda hipoalbüminemi (<2,5 g/dL) Vd’yi genişleterek tübüler sekresyonu ve diüretik yanıtı düşürür (seçilmiş refrakter olgularda IV albümin desteği düşünülebilir); kombine HRS’de ise diüretik kesilip Albümin + vazokonstriktör protokolüne geçilmelidir.',
  },

  'glyceryl-trinitrate': {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 · KB / İskemi Titrasyon',
        note: 'Hepatik ve vasküler/eritrositer ALDH2 ile glutatyon-organik nitrat redüktaz tarafından hızla yıkılır (t½ 1–4 dk). 5–200 mcg/dk aralığında kan basıncı veya angina/pulmoner ödem hedefine göre titre edilir.',
        tone: 'emerald',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 · Hemodinamik Titrasyon',
        note: 'Ana molekül GTN için doz ayarı gerekmez; akut pulmoner ödemde (SCAPE) yüksek doz nitrat stratejisi güvenle uygulanır.',
        tone: 'emerald',
      },
      {
        stage: 'Ağır KBY (eGFR < 30 / < 15 mL/dk)',
        doseBadge: '%100 · Propilen Glikol & MetHb İzle',
        note: 'Başlangıç dozu değişmez; ancak zayıf vazodilatör 1,2-/1,3-dinitrat metabolitleri birikerek etkiyi hafif uzatabilir. Uzamış yüksek dozda (>7 mcg/kg/dk) methemoglobinemi (MetHb) ve saf Perlinganit® çözücüsü propilen glikol birikimi (ozmolar açık/laktik asidoz) izlenmelidir.',
        tone: 'amber',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '%100 · İntradiyalitik Hipotansiyon!',
        note: 'Diyalizle anlamlı uzaklaştırılmaz; post-HD ek doz gerekmez. KRİTİK UYARI: Güçlü venodilatasyonla önyükü düşürdüğünden IHD ultrafiltrasyonu sırasında önyük-bağımlı ani derin intradiyalitik hipotansiyon tetikleyebilir — yavaş titre edin.',
        tone: 'amber',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '%100 · Hemodinamik Titrasyon',
        note: 'Periton diyalizi klirensi ihmal edilebilir; agresif volüm çekilen hastalarda hipotansiyon açısından yakın TA takibi yapılır.',
        tone: 'sky',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '%100 · Önyük & MetHb İzlemi',
        note: 'Sürekli titrasyon CRRT klirensini klinik olarak önemsiz kılar. Net negatif UF ile eş zamanlı uygulamada önyük-bağımlı hipotansiyon ve >7 mcg/kg/dk uzamış infüzyonda MetHb/propilen glikol izlenmelidir.',
        tone: 'amber',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 · Standart Titrasyon',
        detail:
          'Ekstrahepatik vasküler ve eritrositer redüktaz aktivitesi klirensi korur; standart 5–10 mcg/dk başlangıç hızıyla titre edilir.',
        tone: 'emerald',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: '%100 · 5 mcg/dk Başla',
        detail:
          'Portal hipertansiyon ve artmış splanknik kapasitans nedeniyle standart dozlarda beklenenden fazla hipotansiyon gelişebilir; düşük hızla (5 mcg/dk) başlayın.',
        tone: 'amber',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: '5 mcg/dk Başla · Abartılı Hipotansiyon!',
        detail:
          'Hepatik ALDH2/glutatyon redüktaz aktivitesi azalır ve sirotik hiperdinamik/düşük SVR dolaşımda abartılı derin hipotansiyon gelişir! Mutlaka 5 mcg/dk ile başlayın, invaziv/yakın KB takibiyle yavaş artırın ve >7 mcg/kg/dk uzamış infüzyonlardan (MetHb riski) kaçının.',
        tone: 'rose',
      },
    ],
    dualOrganNote:
      'Kombine siroz + KBY/IHD hastasında bazal düşük SVR ile önyük bağımlılığı üst üste biner: küçük GTN artışları dahi kollapsa yol açabilir. Ayrıca böbrek yetmezliğinde uzamış yüksek doz infüzyonlarda hem MetHb (ko-oksimetri) hem de çözücü propilen glikole bağlı ozmolar/anyon açıklı laktik asidoz taranmalıdır.',
  },

  hydrocortisone: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: 'Standart (%100)',
        note: 'Hepatik 11β-HSD ve A-halkası redüksiyonu + glukuronidasyon ile inaktive edilir (<%1 değişmeden renal). Septik şokta 200 mg/gün (50 mg IV q6h veya sürekli infüzyon), adrenal krizde 100 mg IV bolus + 200 mg/gün uygulanır.',
        tone: 'emerald',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: 'Standart (%100) · Na⁺/K⁺ İzle',
        note: 'Aktif kortizol birikimi olmaz ve doz azaltılmaz. Güçlü 1:1 mineralokortikoid aktivitesi nedeniyle sıvı/sodyum retansiyonu, hipertansiyon ve hipokalemi yakından izlenmelidir.',
        tone: 'sky',
      },
      {
        stage: 'Ağır KBY (eGFR < 30 / < 15 mL/dk)',
        doseBadge: '%100 · Sıvı/Na⁺ Yükü UYARISI',
        note: 'Doz revizyonu gerekmez; ancak oligürik ABH veya ileri KBY’de 1:1 mineralokortikoid aktivite hızla ödem, pulmoner konjesyon, hipernatremi ve hipokalemi tetikler. Mineralokortikoid gereksinimi yoksa (örn. antiinflamatuvar endikasyon) Deksametazon/Metilprednizolon tercih edilebilir.',
        tone: 'amber',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '%100 · Post-HD Ek Doz YOK',
        note: 'Yüksek CBG (transkortin) ve albümin bağlanması nedeniyle IHD ile anlamlı uzaklaştırılmaz; diyaliz sonrası ek replasman dozu gerekmez. İnterdiyalitik kilo artışı, KB ve serum K⁺ izlenmelidir.',
        tone: 'sky',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'Standart (%100)',
        note: 'Periton diyalizinde ek doz gerekmez. Volüm yükü ve glukoz bazlı diyalizatlarla sinerjik hiperglisemi açısından yakın takip gerekir.',
        tone: 'sky',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'Standart (%100 · 200 mg/gün)',
        note: 'CRRT klirensi klinik olarak düşüktür; refrakter septik şokta standart 200 mg/gün (sürekli infüzyon veya 50 mg IV q6h) tam verilir ve sıvı/Na⁺ yükü UF ile kolayca dengelenir.',
        tone: 'emerald',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: 'Standart (%100)',
        detail:
          'Hepatik steroid klirensi ve CBG sentezi korunur. Septik şok (200 mg/gün) ve perioperatif stres dozları tam uygulanır.',
        tone: 'emerald',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'Standart (%100)',
        detail:
          'Septik şok (200 mg/gün) ve stres dozlarında indirim yapılmaz. Sirotik hastalarda kritik hastalık ilişkili kortikosteroid yetmezliği (CIRCI) sıktır; hiperglisemi ve K⁺ izlenmelidir.',
        tone: 'emerald',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'Adrenal Krizde Tam 100 mg IV · Kısa Süre',
        detail:
          'A-halkası redüksiyonu yavaşladığından t½ uzar; eşlik eden CBG ve albümin düşüklüğü SERBEST AKTİF KORTİZOL fraksiyonunu yükseltir! Akut adrenal krizde tam 100 mg IV bolus veya refrakter septik şokta 200 mg/gün başlangıç dozu ASLA azaltılmaz; ancak hiperglisemi, varis/GİS kanaması, SBP/fungal enfeksiyon ve asitte Na⁺/su retansiyonu nedeniyle tedavi mümkün olan en kısa sürede kesilmelidir.',
        tone: 'amber',
      },
    ],
    dualOrganNote:
      'Child-Pugh C siroz + hipoalbüminemi/düşük CBG varlığında total serum kortizol yalancı düşük ölçülebilir (yalancı adrenal yetmezlik tanısı!), oysa serbest aktif kortizol normal veya yüksektir; kombine siroz + ABH’de adrenal kriz/şok başlangıç dozu tam verilirken 1:1 mineralokortikoid sıvı yükü, GİS kanaması ve SBP riski nedeniyle tedavi süresi sıkı sınırlandırılmalıdır.',
  },
};
