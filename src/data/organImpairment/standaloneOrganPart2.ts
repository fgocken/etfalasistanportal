import type { OrganImpairmentMatrixPayload } from '../../components/treatments/shared/DrugMonographBlocks';

export type StandaloneOrganPart2Id =
  | 'aspirin'
  | 'clopidogrel'
  | 'enoxaparin'
  | 'fondaparinux'
  | 'heparin'
  | 'ibuprofen'
  | 'ketamine'
  | 'lidocaine'
  | 'metamizole'
  | 'methylprednisolone'
  | 'naloxone'
  | 'nicardipine'
  | 'norepinephrine'
  | 'pantoprazole'
  | 'paracetamol'
  | 'pheniramine'
  | 'prasugrel'
  | 'sevoflurane'
  | 'sodium-bicarbonate'
  | 'sodium-nitroprusside'
  | 'sugammadex'
  | 'tenoxicam'
  | 'thiopental'
  | 'ticagrelor'
  | 'tranexamic-acid'
  | 'warfarin';

export const STANDALONE_ORGAN_PART2: Record<StandaloneOrganPart2Id, OrganImpairmentMatrixPayload> = {
  ketamine: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 Standart',
        tone: 'emerald',
        note: 'Ana ilaç hepatik CYP2B6/3A4 ile norketamine (%20–30 potens) çevrilir; <%4 değişmeden idrarla atılır. İndüksiyon, analjezi ve infüzyonda tam standart doz.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 Standart',
        tone: 'emerald',
        note: 'Tek bolus ve kısa süreli (<24 sa) infüzyonlarda doz değişikliği gerekmez; >48 saatlik sürekli infüzyonlarda norketamin/dehidronorketamin birikimi açısından sedasyon derinliği izlenmelidir.',
      },
      {
        stage: 'Ağır KBY / ESRD (eGFR < 30 mL/dk)',
        doseBadge: 'Bolus %100 · Uzun İnf. −%25–50',
        tone: 'amber',
        note: 'Tek indüksiyon veya sub-dissosiyatif analjezi bolusu %100 güvenle verilir. Ancak aktif norketamin ve glukuronid metabolitleri (~%90 renal) biriktiğinden uzamış (>24 sa) YBÜ infüzyonunu %25–50 azaltın.',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'Bolus %100 · Post-HD Ek Doz Yok',
        tone: 'sky',
        note: 'Yüksek lipofilisite ve geniş dağılım hacmi (Vd 2–4 L/kg) nedeniyle ketamin ve norketamin hemodiyalizle zayıf temizlenir (<%10); post-HD ek doz gerekmez. Sürekli infüzyon hızını %25–50 azaltın.',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'Bolus %100 · Uzun İnf. −%25–50',
        tone: 'sky',
        note: 'Periton diyalizi ile anlamlı klirens sağlanmaz. Tek indüksiyon/prosedürel bolus %100; uzamış infüzyon veya sık tekrarlayan dozlarda aktif metabolit birikimi nedeniyle %25–50 azaltın.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'Bolus %100 · İnf. −%25–50 (Titre)',
        tone: 'indigo',
        note: 'Geniş Vd nedeniyle ana ilaç ve norketamin CRRT ile minimal uzaklaştırılır. Tek bolus tam doz; uzamış YBÜ analgosedasyon infüzyonunda RASS/CPOT hedefli %25–50 düşük hızda titre edin.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 Standart',
        tone: 'emerald',
        detail:
          'Tek doz indüksiyon ve kısa süreli sub-dissosiyatif analjezide doz ayarlaması gerekmez; standart klinik titrasyonla güvenle uygulanır.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'İnfüzyon %25–50 Azalt',
        tone: 'amber',
        detail:
          'Yüksek hepatik ekstraksiyonlu (CYP2B6/3A4) ilaçtır; hepatik kan akımı ve metabolik klirens düştüğünden sürekli infüzyonu %25–50 azaltın ve tekrarlayan bolus aralıklarını uzatın.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'İnfüzyon %50 Azalt · Uzamış Derlenme',
        tone: 'rose',
        detail:
          'Hepatik klirens belirgin çöker; yarı ömür uzar, uyanma gecikir ve emergens deliryumu/halüsinasyon riski yükselir. İdame infüzyonu ≥%50 azaltın veya kısa etkili alternatifleri değerlendirin.',
      },
    ],
    dualOrganNote:
      'Kombine hepatorenal yetmezlikte hem ketaminin hepatik klirensi hem de norketamin/glukuronid konjugatlarının renal eliminasyonu eşzamanlı bozulur; uzamış infüzyonlarda RASS hedefli en düşük hız ve günlük sedasyon kesintisi şarttır.',
  },

  lidocaine: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 Standart',
        tone: 'emerald',
        note: 'Yüksek hepatik ekstraksiyon (CYP1A2/3A4) ile aktif MEGX ve GX metabolitlerine dönüşür (<%10 değişmeden renal). Bolus ve IV infüzyonda tam standart doz.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 (Kısa) · >24 sa İzle',
        tone: 'emerald',
        note: 'Yükleme bolusu ve kısa süreli (<24 sa) perioperatif/antiaritmik infüzyon %100 uygulanır; >24 sa infüzyonda GX birikimi açısından nörolojik toksisite izlenmelidir.',
      },
      {
        stage: 'Ağır KBY / ESRD (eGFR < 30 mL/dk)',
        doseBadge: 'Bolus %100 · >24 sa İnf. −%25–50',
        tone: 'amber',
        note: 'Tek yükleme/indüksiyon bolusu %100; ancak aktif glisinoksilidid (GX) metabolitinin ~%50’si böbrekten atıldığı için >24 saatlik IV infüzyonu %25–50 azaltın (GX nörotoksisitesi, konfüzyon ve nöbet riski!).',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'Bolus %100 · Post-HD Ek Doz Yok',
        tone: 'sky',
        note: 'Ana lidokain HD ile zayıf temizlenir (<%10); GX kısmen diyalize olur. Post-HD ek doz gerekmez; >24 saatlik sürekli infüzyonda %25–50 doz azaltımı ve sürekli EKG/SSS izlemi uygulayın.',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'Bolus %100 · >24 sa İnf. −%25–50',
        tone: 'sky',
        note: 'Periton klirensi klinik olarak ihmal edilebilir. Akut bolus tam doz verilebilir ancak >24 saatlik IV infüzyonda GX birikimine bağlı LAST/nöbet riski nedeniyle idameyi %25–50 azaltın.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'Bolus %100 · >24 sa İnf. −%25–50',
        tone: 'indigo',
        note: 'Ana lidokain CRRT ile minimal, GX kısmen temizlenir. 24 saati aşan sürekli IV infüzyonlarda idame hızını %25–50 azaltın; mümkünse serum düzeyi (hedef 1,5–5 mcg/mL) ve nörolojik bulguları izleyin.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 Standart',
        tone: 'emerald',
        detail:
          'Hafif karaciğer yetmezliğinde standart bolus ve kısa süreli (<24 sa) IV infüzyon güvenle uygulanır; eşlik eden kalp yetmezliği (düşük hepatik kan akımı) varsa hız %25–50 düşürülmelidir.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'İnfüzyon %50 Azalt (≤0,5–1 mg/kg/sa)',
        tone: 'amber',
        detail:
          'Yüksek hepatik ekstraksiyon nedeniyle sirozda klirens dramatik düşer. İdame infüzyonunu mutlaka %50 azaltın (≤0,5–1 mg/kg/sa veya 1–2 mg/dk) ve perioral uyuşma/tinnitus/konfüzyonu yakın izleyin.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'İnf. %50–75 Azalt / Uzun İnf. Kaçın',
        tone: 'rose',
        detail:
          'Ağır sirozda eliminasyon t½ 3–5 kat uzar, lidokain + MEGX birikimi ile çok yüksek LAST (nöbet, bradiaritmi, kardiyak arrest) riski doğar! Uzun IV infüzyondan kaçının; zorunluysa %50–75 azaltın ve %20 lipid emülsiyonu hazır bulundurun.',
      },
    ],
    dualOrganNote:
      'Siroz + KBY veya düşük kardiyak debili hastalarda hem ana ilaç/MEGX’in hepatik klirensi hem de GX’in renal klirensi çöker; α1-asit glikoprotein (AAG) azalması serbest fraksiyonu artırarak klasik prodrom olmadan ani nöbet/LAST tetikleyebilir.',
  },

  methylprednisolone: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 Standart',
        tone: 'emerald',
        note: 'Büyük ölçüde hepatik metabolizma (<%10 değişmeden renal); tüm endikasyonlarda (antiinflamatuar, astım, pulse tedavi) tam standart doz.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 Standart',
        tone: 'emerald',
        note: 'Farmakokinetik doz ayarlaması gerekmez; sodyum-su retansiyonu, hipertansiyon, hiperglisemi ve katabolik etki açısından klinik izlem önerilir.',
      },
      {
        stage: 'Ağır KBY / ESRD (eGFR < 30 mL/dk)',
        doseBadge: '%100 Standart',
        tone: 'emerald',
        note: 'Böbrek yetmezliğinde doz azaltımı gerekmez. Üremik trombosit disfonksiyonu ile birleşen GİS kanama riskine karşı PPI profilaksisi ve sık glisemi/volüm takibi yapılmalıdır.',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '%100 · Diyaliz Günü Post-HD Ver',
        tone: 'sky',
        note: 'High-flux HD ile metilprednizolonun ~%10–20’si temizlenir. Genellikle ekstra takviye dozu gerekmez; ancak günlük veya pulse dozun diyaliz günlerinde HD sonrasında (post-HD) verilmesi önerilir.',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '%100 Standart',
        tone: 'emerald',
        note: 'Periton diyalizi ile anlamlı klirens kaybı yoktur; tam doz uygulanır. Dekstroz içeren periton diyalizatlarıyla sinerjik hiperglisemi gelişebileceğinden insülin gereksinimi yakın izlenmelidir.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '%100 Standart',
        tone: 'indigo',
        note: 'Yüksek protein bağlanması (~%77) ve hepatik klirens nedeniyle CRRT kaybı klinik olarak anlamsızdır; standart YBÜ/pulse dozları %100 uygulanır.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 Standart',
        tone: 'emerald',
        detail:
          'Doz ayarlaması gerekmez. Prednizonun aksine aktif molekül olduğundan karaciğerde ön-ilaç aktivasyonuna gereksinim duymaz.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: '%100 Akut Doz · Yakın İzlem',
        tone: 'amber',
        detail:
          'Akut ve pulse dozlar %100 uygulanır. Prednizon→prednizolon hepatik dönüşümü sirozda bozulabileceğinden orta-ağır karaciğer hastalığında metilprednizolon (veya prednizolon) doğrudan aktif olduğu için tercih edilir.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: '%100 Akut · Uzamış Klirens',
        tone: 'amber',
        detail:
          'Akut endikasyonlarda %100 doz verilir; ancak ağır sirozda hepatik klirens uzar ve hipoalbüminemi serbest steroidi artırır. GİS/varis kanaması, spontan bakteriyel peritonit (SBP), hiperglisemi ve sıvı yüklenmesi yakından izlenmelidir.',
      },
    ],
    dualOrganNote:
      'Prednizonun etkili olabilmesi için karaciğerde 11β-HSD1 ile prednizolona çevrilmesi gerekirken metilprednizolon doğrudan aktif moleküldür; dekompanse sirozda ve hepatorenal sendrom eşliğinde sistemik kortikosteroid gerektiğinde öncelikli seçenektir.',
  },

  naloxone: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 (Solunuma Titre)',
        tone: 'emerald',
        note: 'Yüksek hepatik UGT2B7 glukuronidasyonu (t½ 30–90 dk) ile elimine olur. Solunum hızı (≥12/dk) ve bilinç yanıtına göre 0,04–0,4 mg IV artımlarla titre edilir.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 (Solunuma Titre)',
        tone: 'emerald',
        note: 'Nalokson dozu değişmez. Morfin/kodein kaynaklı solunum depresyonunda aktif M6G metaboliti birikmeye başladığından re-narkotizasyon açısından uzamış gözlem gerekir.',
      },
      {
        stage: 'Ağır KBY / ESRD (eGFR < 30 mL/dk)',
        doseBadge: '%100 · Uzamış İnfüzyon / İzlem',
        tone: 'amber',
        note: 'Nalokson %100 solunum yanıtına titre edilir. KRİTİK: KBY/ESRD’de morfinin aktif M6G metaboliti günlerce kalırken nalokson etkisi 30–60 dk’da biter → tekrarlayan bolus veya sürekli infüzyon (uyanma dozunun 2/3’ü/sa) ve ≥24–48 sa monitörizasyon şarttır!',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '%100 · Post-HD Ek Doz Yok',
        tone: 'sky',
        note: 'Nalokson klinik yanıta göre titre edilir; HD ile anlamlı doz revizyonu gerekmez. Morfin (M6G) entoksikasyonunda HD, biriken M6G’yi uzaklaştırarak kalıcı düzelmeyi hızlandırır.',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '%100 · Uzun Re-narkotizasyon İzlemi',
        tone: 'sky',
        note: 'Doz ayarlaması gerekmez; ancak CAPD aktif opioid metabolitlerini yavaş temizlediğinden sürekli nalokson infüzyonu ve kesintisiz pulse oksimetri/kapnografi izlemi gerekir.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '%100 (Solunuma Titre)',
        tone: 'indigo',
        note: 'Hızlı hepatik klirensi nedeniyle CRRT nalokson ihtiyacını belirgin değiştirmez; sürekli infüzyon solunum hızı ve hava yolu reflekslerine göre titre edilir.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 (Solunuma Titre)',
        tone: 'emerald',
        detail:
          'Doz ayarlaması gerekmez; akut opioid geri çeviriminde çekilme/akciğer ödemini önlemek için küçük IV artımlarla (0,04–0,1 mg) titre edin.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: '%100 (Klinik Yanıta Titre)',
        tone: 'emerald',
        detail:
          'Hepatik glukuronidasyon kısmen yavaşlasa da parenteral nalokson daima yatak başı solunum yanıtına göre titre edilir.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: '%100 Titre · Re-narkotizasyon İzle',
        tone: 'amber',
        detail:
          'Ağır sirozda nalokson klirensi azalır; ancak geri çevrilen ana opioidlerin (morfin, metadon, fentanil, oksikodon) hepatik klirensi çok daha fazla yavaşladığından ağır ve geç re-narkotizasyon riski yüksektir — sürekli infüzyon ve yakın YBÜ izlemi gerekir.',
      },
    ],
    dualOrganNote:
      'KBY/ESRD ve sirozda asıl ölümcül tuzak naloksonun yarı ömrünün (30–90 dk) biriken opioid/M6G yarı ömründen (saatler-günler) katbekat kısa olmasıdır; tek bolusla uyanan hasta izlemsiz bırakılırsa saatler içinde fatal solunum arresti gelişebilir.',
  },

  nicardipine: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 (5 mg/sa Başla)',
        tone: 'emerald',
        note: '>%95 hepatik CYP3A4 metabolizması (<%1 değişmeden renal). Standart 5 mg/sa başlangıç, 5–15 dk’da bir 2,5 mg/sa artış (maks 15 mg/sa).',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 · Dikkatli Titrasyon',
        tone: 'emerald',
        note: 'Standart 5 mg/sa başlangıç uygulanabilir; ancak KBY’de sistemik AUC hafif yükselebildiğinden hedef kan basıncına ulaşıldığında hızla 3 mg/sa idameye düşülmelidir.',
      },
      {
        stage: 'Ağır KBY / ESRD (eGFR < 30 mL/dk)',
        doseBadge: 'Düşük Başla (2,5–5 mg/sa)',
        tone: 'amber',
        note: 'İleri KBY’de plazma AUC’si ve hipotansiyon duyarlılığı artar; 2,5–5 mg/sa düşük hızla başlayıp 15 dk aralıklarla yavaşça titre edin.',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '2,5–5 mg/sa · Post-HD Ek Doz Yok',
        tone: 'sky',
        note: '>%95 plazma protein bağlanması nedeniyle hemodiyalizle temizlenmez; post-HD ek doz gerekmez. Diyaliz sırasında/sonrasında intradiyalitik hipotansiyonu önlemek için 2,5 mg/sa başlangıç tercih edin.',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '2,5–5 mg/sa (Yavaş Titre)',
        tone: 'sky',
        note: 'Periton diyalizi ile uzaklaştırılmaz; düşük başlangıç hızı (2,5 mg/sa) ve sık arteriyel basınç izlemi ile titre edin.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '2,5–5 mg/sa (Hedef TA’ya Titre)',
        tone: 'indigo',
        note: 'Yüksek protein bağlanması (>%95) nedeniyle CRRT ile anlamlı klirens oluşmaz; invaziv arteriyel basınç monitörizasyonu altında düşük hızdan hedef TA’ya titre edin.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 Standart (5 mg/sa)',
        tone: 'emerald',
        detail:
          'Hafif karaciğer yetmezliğinde standart başlangıç ve titrasyon uygulanır; kan basıncı yanıtı yakından izlenir.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: '%50 Daha Yavaş Titrasyon (t½ 2–4×↑)',
        tone: 'amber',
        detail:
          'CYP3A4 klirensi belirgin düşer ve eliminasyon yarı ömrü 2–4 kat uzar! 2,5 mg/sa ile başlayın, doz artışlarını %50 daha yavaş (15–30 dk aralıklarla) yapın; aşırı hipotansiyon geliştiğinde etki uzun sürer.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'Başlangıç 2,5 mg/sa · Alternatif Tercih',
        tone: 'rose',
        detail:
          'Hepatik klirens >%50–70 düşer; infüzyon kesilse bile hipotansif etki (>2–4 sa) uzar! Mümkünse organ-bağımsız esterazla yıkılan Esmolol veya Klevidipin tercih edin; zorunluysa 2,5 mg/sa ile çok yavaş titre edin.',
      },
    ],
    dualOrganNote:
      'Dekompanse siroz + KBY hastasında hem CYP3A4 yıkımı çöker hem hipoalbüminemi serbest nikardipin fraksiyonunu artırır; infüzyon durdurulduktan saatler sonra bile sürebilen inatçı vazoplejiden kaçınmak için klevidipin/esmolol önceliklendirilmelidir.',
  },

  norepinephrine: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 (MAP ≥ 65 mmHg Titre)',
        tone: 'emerald',
        note: 'MAO/COMT ve nöronal geri alımla ultra-hızlı (t½ 1–2 dk) inaktive olur; renal eliminasyona bağımlı değildir, MAP ≥65 mmHg hedefine titre edilir.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 (MAP ≥ 65 mmHg Titre)',
        tone: 'emerald',
        note: 'Doz ayarlaması gerekmez; septik ABH’de böbrek otoregülasyon eşiği için MAP 65–75 mmHg (kronik hipertansiflerde 70–80 mmHg) hedeflenebilir.',
      },
      {
        stage: 'Ağır KBY / ESRD (eGFR < 30 mL/dk)',
        doseBadge: '%100 · Septik ABH/HRS’de 1. Basamak',
        tone: 'emerald',
        note: 'Septik akut böbrek hasarı ve hepatorenal sendromda renal perfüzyon basıncını optimize eden 1. basamak vazopressördür; böbrek yetmezliğinde doz azaltımı gerekmez.',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '%100 · Diyalizle Anlamlı Kayıp Yok',
        tone: 'sky',
        note: 'Endojen klirensi (>2000 mL/dk) diyaliz klirensinden katbekat yüksek olduğundan HD ile anlamlı ilaç kaybı olmaz; intradiyalitik hipotansiyonda MAP hedefine göre anlık titre edilir.',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '%100 (MAP Hedefli Titrasyon)',
        tone: 'emerald',
        note: 'Periton diyalizi ile uzaklaştırılmaz; standart santral venöz infüzyonla hemodinamik hedefe titre edilir.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '%100 · CRRT Kaybı İhmal Edilebilir',
        tone: 'indigo',
        note: 'CRRT ile uzaklaştırılan miktar toplam vücut klirensinin <%1’idir; devre bağlantısında oluşan geçici hipotansiyonda MAP ≥65 mmHg için anlık hız ayarı yapılabilir.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 (MAP Hedefli)',
        tone: 'emerald',
        detail:
          'Yaygın ekstrahepatik/nöronal MAO-COMT yıkımı sayesinde klirens tamamen korunur; standart hemodinamik titrasyon uygulanır.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: '%100 (MAP Hedefli)',
        tone: 'emerald',
        detail:
          'Doz ayarlaması gerekmez; portal hipertansiyona bağlı splanknik vazodilatasyonda perfüzyon basıncını güvenle korur.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: '%100 · Sirotik Şok & HRS-AKI 1. Basamak',
        tone: 'emerald',
        detail:
          'Sirotik septik şokta ve Hepatorenal Sendrom (HRS-AKI) tedavisinde Terlipresin + %20 Albümin ile birlikte 1. basamak vazopressördür (HRS’de bazal MAP’ta 10–15 mmHg artış hedeflenir); vazopleji nedeniyle daha yüksek doz gerekebilir.',
      },
    ],
    dualOrganNote:
      'Hepatorenal sendromda (HRS-AKI) Noradrenalin + Albümin rejimi splanknik vazokonstriksiyon ve renal perfüzyon artışı ile GFR’yi doğrudan iyileştirir; yüksek dozlarda (>0,5 mcg/kg/dk) vazopressin eklenmesi ve dijital/mezenterik iskemi izlemi önerilir.',
  },

  pantoprazole: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 (40 mg/gün · UGIB Tam)',
        tone: 'emerald',
        note: 'Hepatik CYP2C19 O-demetilasyonu ve sülfasyonla inaktif metabolitlere dönüşür. Standart 40 mg/gün veya akut üst GİS kanama (UGIB) 72 sa rejim tam doz.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 Standart',
        tone: 'emerald',
        note: 'Doz ayarlaması gerekmez; uzun süreli kullanımda akut interstisyel nefrit (AIN) ve hipomagnezemi açısından periyodik kontrol önerilir.',
      },
      {
        stage: 'Ağır KBY / ESRD (eGFR < 30 mL/dk)',
        doseBadge: '%100 Standart',
        tone: 'emerald',
        note: 'Aktif pantoprazol birikimi olmaz; tüm oral/IV standart rejimler ve akut UGIB protokolü %100 uygulanır.',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '%100 · Diyalize Olmaz (Ek Doz Yok)',
        tone: 'sky',
        note: '%98 plazma protein bağlanması nedeniyle hemodiyalizle temizlenmez; post-HD ek doz gerekmez ve diyaliz saatinden bağımsız uygulanabilir.',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '%100 Standart',
        tone: 'emerald',
        note: 'Periton diyalizi ile anlamlı klirens yoktur; tam standart doz uygulanır.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '%100 Standart',
        tone: 'indigo',
        note: 'Yüksek protein bağlanması (%98) nedeniyle CRRT membranlarından geçmez; YBÜ stres ülseri profilaksisi (40 mg IV q24sa) veya UGIB rejimi %100 devam edilir.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 (40 mg/gün)',
        tone: 'emerald',
        detail:
          'Doz ayarlaması gerekmez; standart 40 mg/gün oral veya IV tedavi güvenle uygulanır.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: '%100 (40 mg/gün)',
        tone: 'emerald',
        detail:
          'Standart 40 mg/gün doz iyi tolere edilir; kronik idame tedavisinde günlük 40 mg üstüne çıkılmamalıdır.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'İdame 20–40 mg q24–48sa (Maks 40 mg/gün)',
        tone: 'amber',
        detail:
          'Ağır sirozda hepatik klirens 5–7 kat düşer (t½ 7–9 saate, AUC 5–8 kata çıkar)! Kronik idamede 20–40 mg q24–48sa (maks 40 mg/gün) önerilir. Akut UGIB’de 72 saatlik tam IV rejim yakın izlemle uygulanabilir.',
      },
    ],
    dualOrganNote:
      'Dekompanse sirozda (Child-Pugh C) gereksiz uzun süreli PPI kullanımı spontan bakteriyel peritonit (SBP), C. difficile enfeksiyonu, hepatik ensefalopati ve hipomagnezemi riskini artırır; kanıtlı endikasyon bittiğinde kesilmelidir.',
  },

  pheniramine: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 50 mL/dk (Normal / Hafif)',
        doseBadge: '%100 (45,5 mg IV/IM)',
        tone: 'emerald',
        note: 'Hepatik N-demetilasyon + belirgin renal atılım (IV t½ 8–17 sa!). Akut alerjik reaksiyonlarda standart 45,5 mg yavaş IV/IM (maks 2–3×/gün).',
      },
      {
        stage: 'Orta KBY (eGFR 10–50 mL/dk)',
        doseBadge: 'Aralığı Uzat (Maks 1 Ampul / 24 sa)',
        tone: 'amber',
        note: 'Uzun yarı ömür ve renal atılım nedeniyle birikim gelişir; en fazla 45,5 mg/24 sa ile sınırlayın. Artmış sedasyon, konfüzyon ve antikolinerjik yük (üriner retansiyon) izlenmelidir.',
      },
      {
        stage: 'Ağır KBY / ESRD (eGFR < 10 mL/dk)',
        doseBadge: 'Tekrarlayan Dozdan Kaçın (Tek 22,75–45,5 mg)',
        tone: 'rose',
        note: 'Ağır birikim ve yüksek santral antikolinerjik toksisite/deliryum riski! Yalnızca akut reaksiyonda zorunluysa tek doz 22,75–45,5 mg; tekrarlayan dozlardan kaçının.',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'Zayıf Diyaliz · Tekrarlayan Dozdan Kaçın',
        tone: 'rose',
        note: 'Geniş dağılım hacmi nedeniyle hemodiyalizle zayıf temizlenir (post-HD ek doz yok). Yalnızca zorunlu akut durumda tek 22,75–45,5 mg; idame için 2. kuşak non-sedatif H1 blokör seçin.',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'Tekrarlayan Dozdan Kaçın (Tek 22,75–45,5 mg)',
        tone: 'rose',
        note: 'Periton klirensi yetersizdir; tekrarlayan uygulamalarda uzamış sedasyon, deliryum ve üriner retansiyon (rezidüel diürez varsa) gelişir.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'Tek Doz / Kaçın (Deliryum Riski)',
        tone: 'amber',
        note: 'CRRT ile öngörülebilir klirens sağlamaz; YBÜ’de tekrarlayan 1. kuşak antihistaminik kullanımı deliryumu ve ventilatör süresini artırır, zorunluysa tek dozla sınırlayın.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 (Kısa Süreli)',
        tone: 'emerald',
        detail:
          'Hafif karaciğer yetmezliğinde akut tek doz standart (45,5 mg) uygulanabilir; tekrarlayan sedatif dozlardan kaçınılmalıdır.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: '%50 Azalt / Aralığı Uzat',
        tone: 'amber',
        detail:
          'Hepatik N-demetilasyon yavaşlar ve santral sedasyon belirginleşir; dozu %50 azaltın (22,75 mg) veya uygulama aralığını ≥24 saate uzatın.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'KAÇIN (Hepatik Ensefalopati Tetikler!)',
        tone: 'rose',
        detail:
          'Santral geçişli 1. kuşak H1 antihistaminikler dekompanse sirozda hepatik ensefalopatiyi doğrudan tetikler ve derinleştirir! Kullanımdan kaçının; anafilakside hayat kurtarıcı tedavi adrenalin ve kortikosteroiddir.',
      },
    ],
    dualOrganNote:
      'Feniraminin bazal IV yarı ömrü 8–17 saattir ve hepatorenal disfonksiyonda >24–36 saate uzar; yaşlı, KBY’li veya sirozlu hastada deliryum/ensefalopati tetiklememek için tekrarlayan dozlardan kesinlikle kaçınılmalıdır.',
  },

  sevoflurane: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 (MAC Titre · FGF ≥ 1–2 L/dk)',
        tone: 'emerald',
        note: '>%95 pulmoner eliminasyon; ~%3–5 hepatik CYP2E1 metabolizması (inorganik F⁻ + HFIP). Güçlü bazlı (KOH/NaOH) soda lime kullanılıyorsa Bileşik A’yı sınırlamak için taze gaz akışını (FGF) ≥1–2 L/dk tutun.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 (MAC Titre · FGF ≥ 1–2 L/dk)',
        tone: 'emerald',
        note: 'Güncel klinik çalışmalar orta KBY’de sevofluranın böbrek fonksiyonlarını kötüleştirmediğini göstermiştir; güçlü bazlı soda lime ile FGF ≥1–2 L/dk koruyun.',
      },
      {
        stage: 'Ağır KBY / ESRD (eGFR < 30 mL/dk)',
        doseBadge: '%100 MAC Titre · FGF ≥ 2 L/dk',
        tone: 'sky',
        note: 'Modern randomize çalışmalar ağır KBY’de klinik olarak anlamlı nefrotoksisite göstermemiştir. Yine de önlem olarak FGF ≥2 L/dk tutun veya KOH/NaOH içermeyen (kalsiyum hidroksit lime/Amsorb) CO₂ absorbanı kullanın.',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '%100 MAC Titre (Pulmoner Atılım)',
        tone: 'sky',
        note: 'Eliminasyon >%95 akciğerlerden gerçekleşir; HD klirensinden bağımsızdır. Üremik anemi ve sıvı kaymaları nedeniyle BIS/entropi rehberliğinde aşırı vazodilatasyondan kaçınarak titre edin.',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '%100 MAC Titre (FGF ≥ 2 L/dk)',
        tone: 'sky',
        note: 'Pulmoner eliminasyon tamdır; rezidüel renal fonksiyonu korumak için FGF ≥2 L/dk veya güçlü bazsız CO₂ absorbanı tercih edin.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '%100 MAC Titre (Ameliyat / YBÜ)',
        tone: 'indigo',
        note: 'Ekstrakorporeal klirensi yoktur; tam pulmoner eliminasyon sağlar. Uzamış (>24–48 sa) YBÜ inhalasyon sedasyonunda (AnaConDa) inorganik florür düzeyi izlenebilir ancak klinik nefrotoksisite nadirdir.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 MAC Titre',
        tone: 'emerald',
        detail:
          'Hepatik arteriyel tampon yanıtını (HABR) ve total karaciğer kan akımını mükemmel korur; standart MAC titrasyonu güvenlidir.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: '%100 MAC Titre (HABR Korunur)',
        tone: 'emerald',
        detail:
          'Halotan/izoflurandan farklı olarak trifluoroasetil (TFA) hapteni oluşturmaz (immün hepatit riski neredeyse sıfırdır); karaciğer cerrahisinde güvenle kullanılır.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: '%100 · Ensefalopatide MAC Düşür',
        tone: 'amber',
        detail:
          'Pulmoner eliminasyon sirozdan etkilenmez ve hepatik perfüzyon iyi korunur. Ancak hepatik ensefalopati ve portal vazoplejide MAC gereksinimi %20–30 azalır; BIS/EEG ile derinlik titre edilmelidir.',
      },
    ],
    dualOrganNote:
      'Sevofluran hem ileri KBY’de (FGF ≥2 L/dk veya güçlü bazsız CO₂ absorbanı ile) hem de Child-Pugh C sirozda (HABR korunumu + TFA oluşturmaması) en güvenli volatil anesteziklerden biridir; kombine yetmezlikte BIS güdümlü titrasyonla hipotansiyondan kaçının.',
  },

  'sodium-nitroprusside': {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 50 mL/dk (Normal / Hafif)',
        doseBadge: '0,3–2 mcg/kg/dk (Kısa Süreli)',
        tone: 'emerald',
        note: 'Hepatik rodanez siyanürü (CN⁻) tiyosiyanata (SCN⁻) çevirir; böbrek SCN⁻’yi atar (normal t½ ~3 gün). Dozu <2 mcg/kg/dk ve süreyi mümkün olan en kısa düzeyde tutun.',
      },
      {
        stage: 'Orta KBY (eGFR 10–49 mL/dk)',
        doseBadge: '<2 mcg/kg/dk · Süre <24–48 sa',
        tone: 'amber',
        note: 'Tiyosiyanat renal atılımı belirgin yavaşlar. İnfüzyonu <24–48 saat ve <2 mcg/kg/dk ile sınırlandırın; serum tiyosiyanat (<10 mg/dL) ve arteriyel laktat düzeylerini izleyin.',
      },
      {
        stage: 'Ağır KBY / ESRD (eGFR < 10 mL/dk)',
        doseBadge: 'Uzun Kullanımdan KAÇIN (SCN⁻ t½ 7–9 gün)',
        tone: 'rose',
        note: 'Tiyosiyanat yarı ömrü 7–9 güne uzar! Ağır tiyosiyanat toksisitesi (deliryum, psikoz, tinnitus, nöbet, hipotiroidizm) riski çok yüksektir — mümkünse nikardipin/esmolol/klevidipin tercih edin.',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'SCN⁻ HD ile Etkin Temizlenir!',
        tone: 'sky',
        note: 'KRİTİK: Tiyosiyanat hemodiyalizle yüksek oranda temizlenir ve HD, ağır tiyosiyanat toksisitesinin kesin tedavisidir! Yine de rutin kullanımda süreyi <24 sa tutun ve laktat/SCN⁻ izleyin.',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'KAÇIN (Yavaş SCN⁻ Klirensi)',
        tone: 'rose',
        note: 'Periton diyalizinde tiyosiyanat klirensi hemodiyalize göre çok yavaştır; birikim ve nörotoksisite riski yüksek olduğundan uzun süreli infüzyondan kaçının.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'Kısa Süreli (<24–48 sa) · Laktat + SCN⁻ İzle',
        tone: 'indigo',
        note: 'Tiyosiyanat CRRT ile etkin biçimde temizlenir; zorunlu kullanımda dozu <2 mcg/kg/dk tutun, düzenli arteriyel laktat, venöz O₂ satürasyonu ve serum tiyosiyanat (<10 mg/dL) takibi yapın.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: 'Dikkatli (<2 mcg/kg/dk)',
        tone: 'amber',
        detail:
          'Hepatik rodanez rezervi sınırlanmaya başlar; <2 mcg/kg/dk ve kısa süreyle sınırlandırın, artan doz gereksinimini (taşiflaksi) erken siyanür toksisitesi işareti sayın.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'Yüksek Siyanür Riski · Süre/Dozu Kısıtla',
        tone: 'rose',
        detail:
          'Azalmış hepatik rodanez ve tiyosülfat deposu hızla siyanür (CN⁻) birikimine ve laktik asidoza yol açar! Mümkünse alternatif vazodilatör seçin; zorunluysa çok kısa süre ve <1–2 mcg/kg/dk.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'KAÇIN / KONTRENDİKE (Ölümcül CN⁻!)',
        tone: 'rose',
        detail:
          'Ağır sirozda rodanez yetersizliği hızla ölümcül siyanür laktik asidozuna (venöz hiperoksi, metabolik asidoz, kardiyak arrest) neden olur! Kullanımdan kaçının; acil antidot (hidroksokobalamin / sodyum tiyosülfat) her zaman hazır olmalıdır.',
      },
    ],
    dualOrganNote:
      'Klasik çift-organ toksisite tuzağı: Karaciğer (rodanez) siyanürü (CN⁻) tiyosiyanata (SCN⁻) dönüştürür, böbrek ise tiyosiyanatı atar. Karaciğer yetmezliğinde hızlı ölümcül siyanür laktik asidozu, böbrek yetmezliğinde nörotoksik tiyosiyanat birikimi (t½ 7–9 gün) gelişir — her iki yetmezlikte de öncelikle alternatif ajan seçilmelidir.',
  },

  sugammadex: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 (2 / 4 / 16 mg/kg)',
        tone: 'emerald',
        note: '>%95 değişmeden böbrekten (GFR) serbest veya 1:1 sugammadeks-roküronyum kompleksi olarak atılır. Standart 2 / 4 / 16 mg/kg dozlar.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 (2 / 4 / 16 mg/kg)',
        tone: 'emerald',
        note: 'Kompleksin eliminasyon yarı ömrü hafif uzar ancak reversal hızı ve klinik güvenlik normal böbrek fonksiyonuyla eşdeğerdir; tam doz uygulanır.',
      },
      {
        stage: 'Ağır KBY / ESRD (eGFR < 30 mL/dk)',
        doseBadge: '2–4 mg/kg Etkin · Uzamış TOF İzlemi',
        tone: 'amber',
        note: 'Eski FDA etiketi önermese de EMA güncellemesi, modern RCT’ler ve ASA 2023 kılavuzu 2–4 mg/kg ile hızlı ve etkin reversal sağlandığını doğrulamıştır. Kompleks t½ 48 sa–günlere uzar; nadir teorik rekürarizasyon için kantitatif TOF ≥0,9 doğrulaması ve uzamış PACU izlemi gerekir.',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '2–4 mg/kg · High-Flux HD ~%70 Temizler',
        tone: 'sky',
        note: 'High-flux (yüksek akımlı) HD tek seansta sugammadeks-roküronyum kompleksinin ~%70’ini etkin biçimde uzaklaştırır (low-flux HD çok az temizler!). Postoperatif high-flux HD planlanması kompleks yükünü hızla düşürür.',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '2–4 mg/kg · Minimal Klirens (Uzun İzlem)',
        tone: 'amber',
        note: 'Büyük siklodekstrin kompleksi (>2000 Da) periton membranından minimal temizlenir; reversal tamdır ancak kompleks günlerce dolaşımda kaldığından postoperatif TOF ve solunum izlemi uzatılmalıdır.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '2–4 mg/kg · High-Flux CRRT Kısmi Klirens',
        tone: 'indigo',
        note: 'High-flux CRRT filtreleri kompleksi kısmen ve sürekli olarak uzaklaştırır; standart 2–4 mg/kg (acil CICO 16 mg/kg) tam doz etkilidir, kantitatif TOF ile tam derlenme teyit edilmelidir.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 Standart',
        tone: 'emerald',
        detail:
          'Karaciğerde hiç metabolize olmaz (%0); standart 2 / 4 / 16 mg/kg dozlar güvenle uygulanır.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: '%100 Standart',
        tone: 'emerald',
        detail:
          'Hepatik metabolizma sıfır olduğundan doz ayarlaması gerekmez; roküronyum klirensinin uzaması nedeniyle kantitatif TOF ile derinlik doğrulanarak uygun doz seçilmelidir.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: '%100 Standart · Derlenme & Koagülasyon İzle',
        tone: 'amber',
        detail:
          'Doz %100’dür; ancak ağır sirozda asit/ödeme bağlı artmış dağılım hacmi (Vd↑) ve hipoalbüminemi nedeniyle derlenme hafif gecikebilir. Ayrıca yüksek doz (16 mg/kg) geçici aPTT/PT uzaması altta yatan sirotik koagülopatiyle birleşebilir — kantitatif TOF ≥0,9 teyidi zorunludur.',
      },
    ],
    dualOrganNote:
      'Hepatorenal sendromlu/sirotik + KBY hastada roküronyumun hepatik klirensi ve sugammadeks kompleksinin renal atılımı eşzamanlı uzar; kantitatif TOF ≥0,9 doğrulaması, 24–48 saat uzamış solunum izlemi ve mümkünse postoperatif high-flux HD en güvenli stratejidir.',
  },

  thiopental: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 (3–5 mg/kg İndüksiyon)',
        tone: 'emerald',
        note: 'Hepatik oksidasyon/desülfürasyonla metabolize olur (uzun infüzyonda sıfır-derece doygunluk kinetiği); %85 albümine bağlıdır. Normal böbrek fonksiyonunda standart doz.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 · Hipoalbüminemide Yavaş Titre',
        tone: 'emerald',
        note: 'Albümin normal ise standart indüksiyon dozu uygulanabilir; nefrotik sendrom veya hipoalbüminemide serbest fraksiyon arttığından yavaş titre edin.',
      },
      {
        stage: 'Ağır KBY / Üremi (eGFR < 30 mL/dk)',
        doseBadge: 'İndüksiyon −%25–50 (Serbest Fraksiyon 2×↑)',
        tone: 'amber',
        note: 'Üremik toksinler + hipoalbüminemi protein bağlanmasını azaltarak serbest aktif fraksiyonu %15’ten ~%30’a (2 katına!) çıkarır! İndüksiyon bolusunu %25–50 azaltarak (Pental KÜB: CrCl <10’da %75 doz) yavaş titre edin.',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'İndüksiyon −%25–50 · Post-HD Ek Doz Yok',
        tone: 'sky',
        note: '%85 protein bağlanması ve yüksek Vd nedeniyle hemodiyalizle zayıf temizlenir; post-HD ek doz gerekmez. ESRD’de artmış serbest fraksiyon ve hipovolemi nedeniyle düşük doz ve yavaş titrasyon zorunludur.',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'İndüksiyon −%25–50 (Yavaş Titre)',
        tone: 'sky',
        note: 'Periton diyalizi ile anlamlı klirens yoktur; diyalizat protein kaybına bağlı hipoalbüminemi serbest ilaç düzeyini yükselttiğinden indüksiyonu %25–50 azaltın.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'İndüksiyon −%25–50 · EEG ile Titre',
        tone: 'indigo',
        note: 'Yüksek protein bağlanması ve geniş Vd nedeniyle CRRT klirensi minimaldir; refrakter İKB/status epileptikus barbitürat komasında sürekli EEG (burst-suppression) ve vazopressör desteğiyle titre edin.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 Standart (Yavaş Titre)',
        tone: 'emerald',
        detail:
          'Tek indüksiyon bolusu sonrası uyanma redistribüsyonla olduğundan hafif karaciğer hastalığında standart doz yavaş titrasyonla uygulanabilir.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'İndüksiyon −%25–30 · İnf. −%50',
        tone: 'amber',
        detail:
          'Hipoalbüminemi serbest fraksiyonu yükseltir ve hepatik oksidasyon yavaşlar; indüksiyon bolusunu %25–30, sürekli infüzyon hızını %50 azaltın.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'İndüksiyon −%30–50 · Uzun İnf. Kaçın',
        tone: 'rose',
        detail:
          'Ağır hepatik klirens çöküşü + hipoalbüminemi + sıfır-derece kinetik (aktif pentobarbital birikimi) nedeniyle derin/uzamış koma ve refrakter hipotansiyon gelişir! İndüksiyonu %30–50 azaltın; mümkünse barbitürat komasından kaçının.',
      },
    ],
    dualOrganNote:
      'Hem üremi hem sirotik hipoalbüminemi serbest aktif tiyopental fraksiyonunu dramatik artırır (≥%30); hipovolemik, düşük EF’li veya septik hepatorenal hastalarda standart indüksiyon dozu ani kardiyovasküler kollaps yaratır — etomidat veya ketamin tercihini değerlendirin.',
  },

  'tranexamic-acid': {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 50 mL/dk (Cr ≤ 1,36 mg/dL)',
        doseBadge: '%100 (1 g Yükle → 1 g q8sa / 10–15 mg/kg q8sa)',
        tone: 'emerald',
        note: '>%95 değişmeden glomerüler filtrasyonla atılır. Normal/hafif azalmış böbrek fonksiyonunda tam standart rejim (travma/PPH: 1 g IV 10 dk + 1 g 8 sa infüzyon).',
      },
      {
        stage: 'Orta KBY (eGFR 20–49 · Cr 1,36–2,83)',
        doseBadge: '10 mg/kg q12sa (İdame İnf. −%50)',
        tone: 'amber',
        note: 'Renal birikim başlar; aralıklı rejimde 10 mg/kg q12sa, sürekli/kardiyak infüzyon idamesinde infüzyon hızını %50 azaltın.',
      },
      {
        stage: 'Ağır KBY (eGFR 10–19 · Cr 2,83–5,66)',
        doseBadge: '10 mg/kg q24sa (İnf. −%75 / Tek Bolus)',
        tone: 'rose',
        note: 'Yüksek plazma/BOS birikimi doza bağımlı GABA_A ve glisin reseptör antagonizması ile nöbet riskini dramatik artırır! 10 mg/kg q24sa uygulayın veya infüzyonu %75 azaltın (tercihen tek yükleme bolusu).',
      },
      {
        stage: 'ESRD / Anüri (eGFR < 10 · Cr > 5,66)',
        doseBadge: '5 mg/kg q24sa veya 10 mg/kg q48sa (İnf. YOK!)',
        tone: 'rose',
        note: 'KRİTİK GABA_A NÖBET RİSKİ! Sürekli infüzyon KULLANMAYIN! Akut hayat kurtarıcı kanamada tek bolus (10 mg/kg veya 1 g) sonrası idameyi 5 mg/kg q24sa ya da 10 mg/kg q48sa ile kısıtlayın.',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '5–10 mg/kg Post-HD (Kısmen Diyaliz ~%30–50)',
        tone: 'sky',
        note: 'Hemodiyaliz ile kısmen (~%30–50) temizlenir. Akut kanamada tek yükleme bolusu güvenlidir; ek doz gerekiyorsa HD sonrası 5–10 mg/kg verin ve çok günlük birikime bağlı miyoklonus/nöbetten kaçının!',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '5 mg/kg q24sa veya 10 mg/kg q48sa',
        tone: 'rose',
        note: 'Periton klirensi yetersizdir; eGFR <10 mL/dk rejimi uygulanır ve sürekli infüzyondan kesinlikle kaçınılır.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '10 mg/kg Yükle → 5–10 mg/kg q12–24sa',
        tone: 'indigo',
        note: 'Küçük ve çok düşük protein bağlı (%3) molekül olduğundan CRRT ile belirgin temizlenir. 10 mg/kg yükleme sonrası 5–10 mg/kg q12–24sa (veya düşük doz 1–2 mg/kg/sa); yüksek doz KPB (>50 mg/kg) rejimlerinden kesinlikle kaçının!',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 (Renal Fonksiyona Göre)',
        tone: 'emerald',
        detail:
          'Karaciğerde metabolize olmaz (<%5); böbrek fonksiyonuna göre tam doz uygulanır.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: '%100 Renal Bazlı · GİS Kanamada Kaçın',
        tone: 'amber',
        detail:
          'Farmakokinetik hepatik doz azaltımı gerekmez; karaciğer rezeksiyonu/naklinde ROTEM/TEG hiperfibrinoliz rehberliğinde renal fonksiyona göre dozlanır.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: '%100 Renal Bazlı · GİS/Varis Kanamada KAÇIN!',
        tone: 'rose',
        detail:
          'Hepatik metabolizma sıfırdır (renal bazlı dozlanır). ANCAK HALT-IT (Lancet 2020) çalışması akut GİS/varis kanamasında TXA’nın mortaliteyi azaltmadığını ve özellikle sirozlu hastalarda VTE (DVT/PE) ile nöbet riskini anlamlı artırdığını göstermiştir — GİS/varis kanamasında KULLANMAYIN!',
      },
    ],
    dualOrganNote:
      'Sirozlu hastalarda sarkopeni nedeniyle serum kreatinin gerçek GFR’yi maskeler; hepatorenal sendromda normal görünen kreatininle tam doz TXA verilmesi hızla BOS birikimi ve refrakter GABA_A antagonizmasına bağlı nöbetlere yol açar (üst üriner sistem hematürisinde üreter pıhtı obstrüksiyonu nedeniyle ayrıca kontrendikedir).',
  },

  'sodium-bicarbonate': {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 Endikasyona Göre',
        tone: 'emerald',
        note: 'Böbrekler fazla HCO₃⁻ ve Na⁺ yükünü hızla idrarla atar. İdrar alkalinizasyonu (salisilat, MTX, fenobarbital) bu grupta tam etkilidir; ancak K⁺ replasmanı ihmal edilirse paradoksal asidüri gelişir ve idrar alkalileşmez.',
      },
      {
        stage: 'Orta KBY / ABH Evre 1 (eGFR 30–59 mL/dk)',
        doseBadge: '%100 Akut Doz · Na⁺/Volüm İzlemi',
        tone: 'emerald',
        note: 'Akut ağır asidozda (pH ≤7,20) veya toksikoloji endikasyonlarında standart doz uygulanır. Her 100 mEq NaHCO₃ 100 mEq (2,3 g) Na⁺ yükü getirdiğinden kan basıncı, akciğer konjesyonu ve K⁺/iCa²⁺ yakından izlenmelidir.',
      },
      {
        stage: 'Ağır KBY / AKIN 2–3 ABH / Oligo-Anüri (eGFR < 30 mL/dk)',
        doseBadge: 'BICAR-ICU ABH’de Faydalı · Anüride Volüm/Diyaliz Uyarısı!',
        tone: 'amber',
        note: 'BICAR-ICU (Lancet 2018) verilerine göre pH ≤7,20 + AKIN 2–3 ABH alt grubunda hedef pH ≥7,30 için IV bikarbonat 28 günlük mortaliteyi ve RRT ihtiyacını azaltmıştır. ANCAK oligürik/anürik hastada 100–150 mEq Na⁺ yükü hızla akut pulmoner ödem ve hipernatremi yapar → yavaş titre edin, RRT/diyaliz hazırlığı yapın! Anürik hastada salisilat/MTX idrar alkalinizasyonu İŞE YARAMAZ — acil hemodiyaliz şarttır!',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'HD Köprüsü · Post-HD Ek Doz YOK!',
        tone: 'sky',
        note: 'Standart hemodiyaliz diyalizatı zaten 32–38 mEq/L bikarbonat içerir ve asidozu doğrudan düzeltir. Akut hiperkalemi, ağır asidemi veya toksisitede diyalize köprü olarak verilebilir; ancak seans sırasında/sonrasında gereksiz IV NaHCO₃ eklenmesi post-HD metabolik alkaloz, hipokalemi, tetani (↓iCa²⁺) ve interdiyalitik volüm yüküne yol açar.',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'Volüm Kısıtlı · Yavaş Titrasyon',
        tone: 'sky',
        note: 'PD sıvıları laktat/bikarbonat tamponludur. Akut ağır metabolik asidoz veya toksisitede standart endikasyona göre IV verilebilir; ancak rezidüel idrar çıkışı düşükse hipernatremi ve volüm yüklenmesi riski yüksektir (%8,4 konsantre küçük hacimli bolus veya ultrafiltrasyon artırımı gerekir).',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'Önce CRRT Tamponunu Optimize Et · Sitrat Alkalozu!',
        tone: 'indigo',
        note: 'CRRT replasman/diyalizat sıvıları 22–35 mEq/L HCO₃⁻ içerir; ayrıca bölgesel sitrat antikoagülasyonunda karaciğer her 1 mmol sitratı 3 mmol HCO₃⁻’ye çevirir! Bu nedenle CRRT’de dirençli asidoz varsa önce kan akımı/effluent/bikarbonat ayarı kontrol edilmeli; ilave IV NaHCO₃ yalnızca ağır refrakter asidemi (pH <7,15–7,20) veya toksisitede 2–4 saatlik AKG + iCa²⁺ + Na⁺ takibiyle verilmelidir.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 Standart (Na⁺ İzlemi)',
        tone: 'emerald',
        detail:
          'Sodyum bikarbonat karaciğerde metabolize olmaz; kompanse sirozda akut endikasyonlarda standart doz güvenle uygulanır.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'Dikkat · Asit / Ödem & Alkaloz Riski',
        tone: 'amber',
        detail:
          'Farmakokinetik hepatik birikim yoktur; ancak her 10 mL %8,4 ampul 230 mg (10 mEq) Na⁺ içerir (150 mEq izotonik torba = 3,45 g Na⁺!). Portal hipertansiyonlu hastada asit ve ödemi belirgin artırabilir; aşırı alkalinizasyondan kaçının.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'Yüksek Risk · Ensefalopati & Volüm Yükü!',
        tone: 'rose',
        detail:
          'İki kritik tehlike: (1) Ağır sodyum yükü refrakter asit, plevral efüzyon ve pulmoner ödemi hızla alevlendirir; (2) Metabolik alkaloz ve eşlik eden hipokalemi, NH₄⁺ → serbest NH₃ (amonyak) dönüşümünü ve amonyağın kan-beyin bariyerinden geçişini artırarak HEPATİK ENSEFALOPATİYİ tetikler! Ayrıca ağır karaciğer yetmezliğinde sitratlı CRRT yapılıyorsa sitrat metabolize olamayacağından bikarbonat üretilmez (sitrat birikimi: Total Ca / iCa >2,5 + artan anyon açıklı asidoz).',
      },
    ],
    dualOrganNote:
      'Hepatorenal sendromda (Child-Pugh C + oligo-anürik ABH) yüksek sodyum yükü ile metabolik alkalozun birleşimi hem akut akciğer ödemini hem de hiperamonyemik ensefalopatiyi hızla derinleştirir; bu hastalarda ağır refrakter asidozda (pH <7,15–7,20) bikarbonat tamponlu CRRT en kontrollü çözümdür.',
  },

  paracetamol: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 Standart (Maks 4 g/gün)',
        tone: 'emerald',
        note: '≥50 kg sağlıklı erişkinde 1000 mg IV/PO q6sa (maks 4 g/gün); <50 kg erişkinde 15 mg/kg q6sa (maks 60 mg/kg/gün). NSAİİ’lerden farklı olarak renal prostaglandinleri bozmaz — böbrek güvenliği yüksektir.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 Standart · KBY’de 1. Tercih Analjezik!',
        tone: 'emerald',
        note: 'KBY’de NSAİİ’lerin aksine akut böbrek hasarı ve hiperkalemi yapmadığından 1. basamak analjezik/antipiretiktir. Standart 1000 mg q6sa (uzun süreli kronik kullanımda maks 3 g/gün) güvenle kullanılır.',
      },
      {
        stage: 'Ağır KBY / ESRD (eGFR < 30 mL/dk)',
        doseBadge: 'Aralığı Uzat: q8sa (Maks 2–3 g/gün)',
        tone: 'amber',
        note: 'Ana ilaç karaciğerde glukuronid/sülfat konjugatlarına çevrilir; ancak bu suda çözünür konjugatlar böbrekle atıldığından eGFR <30 mL/dk’da (özellikle <10 mL/dk) belirgin birikir. Doz aralığını en az 6–8 saate (eGFR <30’da q8sa; maks 2–3 g/gün) uzatın ve malnütrisyonda 5-oksoprolin asidozunu izleyin.',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'q8sa · Orta Diyalizlenebilir (~%40–50)',
        tone: 'sky',
        note: 'Düşük molekül ağırlığı (151 Da) ve düşük protein bağlanması (~%10–25) nedeniyle parasetamol ve metabolitleri hemodiyalizle orta-yüksek oranda (~%40–50) temizlenir. Analjezi için q8sa (maks 2–3 g/gün; gerekirse bir dozu HD sonrasına denk getirin). Masif toksisitede (EXTRIP 2014: >900–1000 mg/L + laktik asidoz/koma) acil IHD hayat kurtarıcıdır!',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'q8sa (Maks 2–3 g/gün)',
        tone: 'sky',
        note: 'Periton diyalizi ile parasetamol klirensi düşüktür; ağır KBY rejimi (en az 8 saat ara, maks 2–3 g/gün) uygulanır ve ek doz gerekmez.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '1000 mg q6–8sa (Maks 3–4 g/gün · KC’ye Göre)',
        tone: 'indigo',
        note: 'CRRT konjugat metabolitlerini ve ana ilacı orta düzeyde temizler. Karaciğer fonksiyonu normalse 1000 mg q6–8sa (maks 3–4 g/gün); sepsis + malnütrisyon veya eşlik eden karaciğer hasarında tavanı ≤2 g/gün ile sınırlayın ve IV infüzyona bağlı hipotansiyona (MAP düşüşü!) dikkat edin.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: 'Maks 2–3 g/gün (Kronikte ≤2 g/gün)',
        tone: 'emerald',
        detail:
          'Kompanse sirozda kısa süreli analjezi için NSAİİ’lerden çok daha güvenlidir (GİS kanama ve HRS riski yok!). Kısa süreli maks 2–3 g/gün, kronik kullanımda ≤2 g/gün ve alkolden kesin kaçınma önerilir.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'Maks ≤2 g/gün (500–650 mg q6–8sa / 1 g q12sa)',
        tone: 'amber',
        detail:
          'Glukuronidasyon kapasitesi azalır ve plazma t½ 2–4 saatten 4–6 saate uzar. Günlük toplam dozu KESİNLİKLE ≤2 g/gün ile sınırlayın; aktif alkol alımı veya malnütrisyon varsa kaçının ve ALT/AST/INR izleyin.',
      },
      {
        childPugh: 'Child-Pugh C / Akut KC Yetmezliği (10–15)',
        badge: 'IV KONTRENDİKE! (Ağır/Aktif KC Hastalığı)',
        tone: 'rose',
        detail:
          'Şiddetli hepatoselüler yetmezlikte, aktif ilerleyici karaciğer hastalığında veya ağır hepatik ensefalopatide IV Parasetamol KONTRENDİKEDİR (FDA/EMA & TR KÜB)! Glutatyon (GSH) depoları tükenmiş olduğundan terapötik dozlarda dahi toksik NAPQI metaboliti birikerek fulminan hepatik nekrozu tetikleyebilir.',
      },
    ],
    dualOrganNote:
      'Eş zamanlı malnütrisyon + böbrek yetmezliği (eGFR <30) + kronik parasetamol (± Flukloksasilin / sepsis) varlığında hepatik glutatyon tükenmesiyle nadir ama ölümcül 5-Oksoprolin (Piroglutamik Asit) Yüksek Anyon Açıklı Metabolik Asidozu (HAGMA) gelişebilir — açıklanamayan HAGMA’da parasetamolu derhal kesin ve NAC düşünün!',
  },

  ibuprofen: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 Standart (Övolemi Şart!)',
        tone: 'emerald',
        note: 'Normovolemik ve renal perfüzyonu sağlıklı hastada tam doz (erişkin 400–600 mg q6–8sa; maks 2400–3200 mg/gün). Ancak akut hipovolemi, sepsis veya "Triple Whammy" (ACEİ/ARB + diüretik + NSAİİ) varlığında normal kreatininde dahi ani prerenal ABH gelişebilir!',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: 'MÜMKÜNSE KAÇIN · Zorunluysa Kısa Süre En Düşük Doz',
        tone: 'amber',
        note: 'KDIGO 2024: Afferent arteriyol vazodilatatör prostaglandinlerini (PGE₂/PGI₂) bloke ederek GFR’yi hızla düşürür, sıvı-Na⁺ retansiyonu ve hiperkalemi (hiporeninemik hipoaldosteronizm) yapar! Önce Parasetamol seçin; zorunluysa en düşük doz (400 mg q8sa), ≤3–5 gün ve 48–72 sa Cr/K⁺ kontrolü!',
      },
      {
        stage: 'Ağır KBY / ABH / Oligo-Anüri (eGFR < 30 mL/dk)',
        doseBadge: 'KONTRENDİKE / KAÇININ!',
        tone: 'rose',
        note: 'Ağır KBY’de (eGFR <30 mL/dk) ve tüm Akut Böbrek Hasarı (ABH) evrelerinde KULLANILMAMALIDIR! Kalan nefronlarda vazokonstriksiyonla kalıcı böbrek kaybı, ağır hiperkalemi, ödem/HT ve üremik trombosit disfonksiyonu üzerine GİS kanaması tetikler.',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'DİYALİZLENMEZ (%99 Albumin) · Rezidüel İdrar Varsa KAÇIN!',
        tone: 'rose',
        note: 'Plazma proteinlerine ~%99 bağlandığı için hemodiyalizle TEMİZLENMEZ! Rezidüel böbrek fonksiyonu (idrar çıkışı) olan HD hastasında NSAİİ rezidüel fonksiyonu kalıcı olarak bitirir — KAÇININ! Tam anürik hastada dahi üremik gastropati/kanama ve CV risk nedeniyle Parasetamol 1. tercihtir.',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'KAÇININ! (Rezidüel Böbrek Fonksiyonunu Yok Eder)',
        tone: 'rose',
        note: 'PD hastalarında rezidüel renal fonksiyon sağkalımın en güçlü belirleyicisidir; İbuprofen bunu hızla bozar ve diyalizle temizlenmez — kullanmayın!',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'KONTRENDİKE / KAÇININ! (Diyalizlenmez)',
        tone: 'rose',
        note: 'CRRT’deki kritik ABH/şok hastasında renal iyileşmeyi engeller, stres ülseri/GİS kanaması ve hiperkalemi riskini ciddi artırır; ~%99 protein bağlanması nedeniyle CRRT ile uzaklaştırılamaz.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: 'Dikkat · Kısa Süre En Düşük Doz (Parasetamol Tercih)',
        tone: 'amber',
        detail:
          'Hepatik CYP2C9 metabolizması ve glukuronidasyon kısmen yavaşlar; ancak kompanse sirozda asıl risk portal gastropati kanaması ve böbrek perfüzyonunun PG bağımlı olmasıdır — mümkünse Parasetamol (≤2–3 g/gün) seçin.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'KAÇININ! (HRS & GİS Kanama Riski)',
        tone: 'rose',
        detail:
          'Sirotik hastada böbrek perfüzyonu kompansatuvar renal prostaglandinlere doğrudan bağımlıdır. İbuprofen verilmesi hızla Akut Böbrek Hasarı / Hepatorenal Sendrom, diüretik direnci (asit artışı) ve özofagus varis/peptik ülser kanaması tetikler!',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'MUTLAK KAÇIN / KONTRENDİKE!',
        tone: 'rose',
        detail:
          'Ağır siroz ve asitte (EASL / AASLD) tüm NSAİİ’ler kesinlikle KAÇINILMALIDIR! Tek bir doz bile hepatorenal sendromu (HRS-AKI), masif varis/GİS kanamasını ve koagülopatiyi alevlendirebilir; ayrıca serbest fraksiyon artışı (hipoalbuminemi!) toksisiteyi katlar.',
      },
    ],
    dualOrganNote:
      'Siroz + böbrek yetmezliği (Hepatorenal Sendrom) veya hipoalbuminemi (<2,5 g/dL) varlığında İbuprofen’in serbest aktif fraksiyonu hızla yükselir, renal PG blokajıyla GFR çöker ve GİS/varis kanaması ölümcül seyreder — tüm NSAİİ’ler kesinlikle yasaktır!',
  },

  metamizole: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 Standart (≤4 g/gün)',
        tone: 'emerald',
        note: 'Aktif 4-MAA ve 4-AA ile inaktif metabolitlerinin ~%90’ı idrarla atılır. Klasik NSAİİ’lere göre renal prostaglandin blokajı çok daha hafif olduğundan perioperatif analjezide avantajlıdır; ancak yine de hidrasyonu koruyun ve IV’yi yavaş infüze edin.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: 'Kısa Süreli Tek Doz %100 · Tekrarlı ≤2 g/gün',
        tone: 'amber',
        note: 'Kısa süreli (tek veya birkaç doz) perioperatif uygulamada genellikle doz azaltımı gerekmez; ancak 4-MAA/4-AA ve konjugatların eliminasyonu yavaşladığından tekrarlayan yüksek dozlardan (>2–3 g/gün) kaçının ve aralığı q8–12sa uzatın.',
      },
      {
        stage: 'Ağır KBY / ABH (eGFR < 30 mL/dk)',
        doseBadge: 'Tekrarlı Yüksek Dozdan KAÇIN (≤1–2 g/gün)',
        tone: 'rose',
        note: 'Metabolit eliminasyonu belirgin yavaşlar (t½ 2–3 kat uzar) ve yüksek dozlarda renal PG inhibisyonu/ABH derinleşmesi ile hipotansiyon riski artar. Sadece kısa süreli tek/düşük doz (500–1000 mg q12sa) veya Parasetamol tercih edin.',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'Diyalizlenebilir · Post-HD Tek Doz (500–1000 mg)',
        tone: 'sky',
        note: '4-MAA (%58) ve 4-AA (%48) orta düzeyde proteine bağlandığı ve düşük molekül ağırlıklı olduğu için hemodiyalizle anlamlı ölçüde temizlenir. Kısa süreli/tek doz (500–1000 mg) diyaliz sonrası verilebilir; uzun süreli tekrarlayan yüksek dozlardan ve intradiyalitik hipotansiyon tetiklemesinden kaçının.',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'Tekrarlı Yüksek Dozdan KAÇIN (≤1–2 g/gün)',
        tone: 'sky',
        note: 'Periton diyalizi ile metabolit klirensi sınırlıdır. Kısa süreli düşük doz (500 mg q8–12sa) tercih edilebilir; rezidüel renal fonksiyonu korumak için kronik/yüksek doz uygulamadan kaçının.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'Kısmen Temizlenir · ≤2 g/gün · KB İzle!',
        tone: 'indigo',
        note: 'Aktif 4-MAA ve 4-AA metabolitleri CRRT membranından kısmen geçer; ancak septik/vazopresör bağımlı CRRT hastasında IV metamizol belirgin vazodilatatör hipotansiyon tetikleyebilir! Zorunluysa 500–1000 mg q8–12sa, ≥30 dk yavaş infüzyon ve yakın MAP izlemiyle verin.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: 'Kısa Süre %100 · Tekrarlı ≤2–3 g/gün',
        tone: 'amber',
        detail:
          '4-MAA’nın hepatik demetilasyon (CYP2B6/2C19/3A4) ve NAT2 asetilasyon klirensi hafif azalır. Kısa süreli perioperatif analjezide tek 1 g doz güvenle kullanılabilir; uzun süreli yüksek doz uygulamadan kaçının ve DILI belirtilerini izleyin.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'Tekrarlı Yüksek Dozdan KAÇIN (≤1–2 g/gün)',
        tone: 'rose',
        detail:
          'Sirozda aktif 4-MAA yarı ömrü ~3 kat (≥10 saate) uzar! Metabolit birikimi, vazodilatatör hipotansiyon ve EMA 2020 uyarılı ilaca bağlı karaciğer hasarı (DILI) riski nedeniyle tekrarlayan yüksek dozlardan kaçının; gerekirse tek doz 500 mg ile sınırlayın.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'KAÇININ! (DILI & Ağır Metabolit Birikimi)',
        tone: 'rose',
        detail:
          'Ağır hepatoselüler yetmezlikte 4-MAA eliminasyonu ciddi biçimde çöker, splanik vazodilatasyon hipotansiyonu derinleştirir ve olası bir DILI atağı akut-kronik karaciğer yetmezliğini (ACLF) ölümcül tetikleyebilir. Rutin kullanımdan kaçının.',
      },
    ],
    dualOrganNote:
      'Kombine hepatorenal yetmezlikte hem 4-MAA’nın hepatik klirensi hem de tüm aktif/inaktif metabolitlerin (%90 renal) atılımı eşzamanlı durur; ayrıca sirotik/septik hipotansiyon riski yüksektir. Tekrarlayan dozlardan kesinlikle kaçının ve olası DILI/agranülositoz tablosunu yakından izleyin.',
  },

  tenoxicam: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal · Övolemik)',
        doseBadge: '%100 Standart (20 mg q24sa)',
        tone: 'emerald',
        note: 'Tamamen hepatik CYP2C9 ile inaktif 5’-hidroksitenoksikama metabolize olur (~2/3 idrar, ~1/3 safra/feçes; <%1 değişmeden). Övolemik, Triple Whammy olmayan hastada 20 mg günde 1 kez güvenle uygulanır.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: 'KAÇININ! (~72 sa t½ → Uzamış ABH Riski)',
        tone: 'amber',
        note: 'Kısa yarı ömürlü NSAİİ’lerden farklı olarak ~72 saatlik yarı ömrü nedeniyle afferent arteriyol PG blokajı günlerce sürer! Önce Parasetamol tercih edin; zorunluysa tek 20 mg perioperatif dozdan fazlasını vermeyin ve 48–72 sa içinde Cr/K⁺ izleyin.',
      },
      {
        stage: 'Ağır KBY / ABH (eGFR < 30 mL/dk)',
        doseBadge: 'MUTLAK KONTRENDİKE / KAÇININ!',
        tone: 'rose',
        note: 'Renal prostaglandin bağımlı glomerüler filtrasyonu günlerce bloke ederek geri dönüşsüz ABH, ağır hiperkalemi, sıvı retansiyonu ve üremik GİS kanamasını şiddetle tetikler!',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'KONTRENDİKE / KAÇININ! (Diyalizlenmez)',
        tone: 'rose',
        note: '>%99 albumin bağlı olduğu için hemodiyalizle ASLA temizlenmez! Rezidüel renal fonksiyonu yok eder ve üremik trombosit disfonksiyonu üzerine eklenerek ağır GİS/vasküler erişim kanaması yapar.',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'KONTRENDİKE / KAÇININ! (Diyalizlenmez)',
        tone: 'rose',
        note: 'Periton diyaliziyle temizlenmez; rezidüel idrar çıkışını (PD başarısının ana belirleyicisi!) günlerce süren PG blokajıyla kalıcı olarak kaybetme riski nedeniyle kullanılmamalıdır.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'KONTRENDİKE / KAÇININ! (Diyalizlenmez)',
        tone: 'rose',
        note: '>%99 protein bağlanması nedeniyle CRRT ile uzaklaştırılamaz; kritik/septik hastada renal iyileşmeyi durdurur, stres ülseri kanaması ve hiperkalemi riskini ağırlaştırır.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: 'KAÇININ / En Kısa Süre (Parasetamol Tercih)',
        tone: 'amber',
        detail:
          'CYP2C9 hepatik klirensi yavaşlar ve hipoalbuminemiye bağlı serbest fraksiyon artar; ~72 saatlik yarı ömrü nedeniyle sirotik böbrek perfüzyonu ve portal gastropati açısından kısa etkili Parasetamol (≤2–3 g/gün) çok daha güvenlidir.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'KAÇININ! (HRS & Masif Varis Kanaması)',
        tone: 'rose',
        detail:
          'Sirozda böbrek perfüzyonu kompansatuvar renal PG’lere bağımlıdır. Tenoksikamın ~72 saat süren COX blokajı Hepatorenal Sendrom (HRS-AKI), refrakter asit ve özofagus varis kanamasını günlerce tetikler!',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'MUTLAK KONTRENDİKE!',
        tone: 'rose',
        detail:
          'EASL / AASLD: Ağır siroz ve asitte tüm NSAİİ’ler — özellikle ultra-uzun yarı ömürlü oksikamlar (>%99 albumin bağlı, t½ ~72 sa!) — kesinlikle kontrendikedir. Tek bir doz bile ölümcül HRS ve varis kanaması tetikleyebilir.',
      },
    ],
    dualOrganNote:
      'Tenoksikamın >%99 albumin bağlanması ve ~72 saatlik yarı ömrü nedeniyle hepatorenal yetmezlikte veya hipoalbuminemide (<2,5 g/dL) serbest ilaç hızla yükselir, diyalizle temizlenemez ve renal/GİS toksisitesi 10–15 gün boyunca devam eder — KESİNLİKLE YASAKTIR!',
  },

  aspirin: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 Standart (Düşük & Yüksek Doz)',
        tone: 'emerald',
        note: 'ASA dakikalar içinde salisilik aside hidrolize olur (t½ ~15–20 dk; salisilat t½ terapötik dozda 2–3 sa, yüksek dozda sıfırıncı derece kinetikle 15–30 sa!). İdrar pH’sı arttıkça (alkali idrar) salisilat atılımı hızla artar.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '81–100 mg DEVAM · Yüksek Dozdan KAÇIN',
        tone: 'amber',
        note: 'Kardiyoprotektif düşük doz (81–100 mg/gün) böbrek fonksiyonunu anlamlı bozmaz ve sekonder CV korumada güvenle sürdürülür. Ancak analjezik/antiinflamatuar yüksek dozlardan (≥1–3 g/gün) salisilat birikimi ve ABH riskiyle kaçının!',
      },
      {
        stage: 'Ağır KBY / ABH (eGFR < 30 mL/dk)',
        doseBadge: '81–100 mg Seçilmiş KAH · Yüksek Doz YASAK!',
        tone: 'rose',
        note: 'Yüksek doz (analjezik/perikardit) salisilat birikimi, üremik kanama ve renal PG blokajı nedeniyle KONTRENDİKEDİR! Sekonder CV koruma (stent/AKS) için 81–100 mg/gün fayda/zarar dengesiyle verilebilir (+ PPI); primer korumada kullanmayın.',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'Diyalizlenebilir! · 81–100 mg Post-HD / Günlük',
        tone: 'sky',
        note: 'Klasik NSAİİ’lerden farklı olarak salisilat küçük molekül ağırlığı ve doz bağımlı düşük-orta protein bağlanmasıyla HEMODİYALİZLE ETKİN TEMİZLENİR (salisilat zehirlenmesinde hayat kurtarıcı EXTRIP tedavisi!). KAH/stent hastasında 81–100 mg/gün genelde sürdürülür (kanama/fistül hematomu + PPI izlemiyle).',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '81–100 mg Sekonder KAH · Yüksek Doz YASAK',
        tone: 'sky',
        note: 'Periton diyalizi salisilat temizliğinde HD kadar etkin değildir. Sekonder CV koruma için 81–100 mg/gün kullanılabilir; yüksek analjezik/antiinflamatuar dozlardan kesinlikle kaçının.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '81–100 mg (Stent/AKS) · Yüksek Doz YASAK',
        tone: 'indigo',
        note: 'Salisilat CRRT ile kısmen temizlenir (ancak ağır salisilat toksisitesinde CRRT yerine yüksek akımlı İntermittan HD 1. tercihtir!). YBÜ’de taze koroner stent/AKS varsa 81–100 mg/gün + IV PPI sürdürülür; analjezik amaçlı kullanılmaz.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '81–100 mg KAH Dikkatle · Yüksek Dozdan KAÇIN',
        tone: 'amber',
        detail:
          'Salisilatın hepatik glisin/glukuronid konjugasyonu yavaşlayabilir. Kompanse sirozda sekonder KAH/stent endikasyonu varsa düşük doz (81–100 mg/gün + PPI) sürdürülebilir; yüksek analjezik/antiinflamatuar dozlardan kaçının.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'Yüksek Doz YASAK · Düşük Doz Sadece Kesin KAH',
        tone: 'rose',
        detail:
          'Portal hipertansiyon, trombositopeni ve koagülopati nedeniyle GİS/varis kanaması riski çok yüksektir; ayrıca hipoalbuminemi serbest salisilat düzeyini artırır. Sadece zorunlu koroner stent/AKS’de kardiyoloji-hepatoloji ortak kararıyla 81–100 mg + PPI.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'Yüksek Doz KONTRENDİKE · Düşük Doz Çok Yüksek Kanama Riski',
        tone: 'rose',
        detail:
          'Ağır sirozda yüksek doz ASA kesinlikle kontrendikedir (HRS-AKI, masif varis kanaması, salisilat hepatotoksisitesi). Düşük doz antiplatelet kullanımı dahi yüksek varis kanaması ve ağır trombositopeni nedeniyle ancak çok seçilmiş akut koroner olaylarda yakın izlemle değerlendirilir.',
      },
    ],
    dualOrganNote:
      'Ağır hepatorenal yetmezlikte veya hipoalbuminemide salisilatın hem hepatik konjugasyonu hem de renal atılımı bozulur; yüksek doz salisilat toksisitesi, metabolik asidoz ve varis/GİS kanaması ölümcül seyreder — yüksek doz ASA kesinlikle yasaktır!',
  },

  clopidogrel: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 Standart (75 mg/gün)',
        tone: 'emerald',
        note: 'Karaciğerde %85 CES1 ile inaktif karboksilik aside, %15 CYP2C19 (iki basamaklı) ile aktif tiyol metabolite dönüşür; metabolitler ~%50 idrar ve ~%46 feçesle atılır. Standart doz uygulanır.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 Standart (75 mg/gün · Doz Azaltılmaz)',
        tone: 'emerald',
        note: 'Doz ayarlaması gerekmez; ancak orta KBY’de hem kanama riski hem de trombosit direnci (HTPR) hafif artabileceğinden DAPT’ta mutlaka Pantoprazol 40 mg/gün ekleyin.',
      },
      {
        stage: 'Ağır KBY / ABH (eGFR < 30 mL/dk)',
        doseBadge: '75 mg/gün (Doz Ayarı Yok · Yüksek Kanama/Direnç İzle)',
        tone: 'amber',
        note: 'SmPC’de doz azaltımı yoktur; ancak ileri KBY’de üremik trombosit disfonksiyonu nedeniyle majör kanama riski artarken paradoksal olarak klopidogrel yanıtı da bir miktar azalabilir. GİS kanama izlemi + Pantoprazol şarttır.',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: '75 mg/gün · Diyalizlenmez (Ek Doz Yok)',
        tone: 'sky',
        note: 'Ana ilaç (%98) ve inaktif karboksilik asit metaboliti (%94) yüksek protein bağlıdır; aktif tiyol metaboliti ise trombosit P2Y₁₂’ye kovalent bağlandığından hemodiyalizle temizlenmez — post-HD ek doz gerekmez. AV fistül kanama süresini ve GİS kanamasını yakından izleyin!',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '75 mg/gün (Doz Ayarı Yok · Kanama İzle)',
        tone: 'sky',
        note: 'Periton diyalizinde standart 75 mg/gün uygulanır; aktif kanama ve peritonit/kateter çıkış yeri kanaması açısından takip edilir.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: '75 mg/gün · CRRT İle Temizlenmez',
        tone: 'indigo',
        note: 'Kovalent trombosit bağlanması ve yüksek protein bağlanması nedeniyle CRRT ile uzaklaştırılmaz. Taze koroner stent/AKS varsa 75 mg/gün (NG/PO) + IV Pantoprazol ile sürdürülür; aktif YBÜ kanamasında dikkatle değerlendirilir.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 Standart (75 mg/gün)',
        tone: 'emerald',
        detail:
          'Hafif karaciğer bozukluğunda CYP2C19 aracılı aktif metabolit üretimi ve trombosit inhibisyonu klinik olarak korunur; standart 75 mg/gün (+ Pantoprazol) güvenle verilir.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'Dikkatle 75 mg/gün · Varis Kanama Riski!',
        tone: 'amber',
        detail:
          'Orta sirozda bioaktivasyon görece korunmakla birlikte portal hipertansiyon, trombositopeni ve özofagus varis kanaması riski belirgin artar; endoskopik varis değerlendirmesi ve Pantoprazol önerilir.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'KONTRENDİKE (EMA / TR SmPC!)',
        tone: 'rose',
        detail:
          'Ağır karaciğer yetmezliğinde hem CYP2C19 biyoaktivasyonu ciddi biçimde bozulur hem de koagülopati/varis kanaması ölümcül risk taşır — EMA ve TR kısa ürün bilgisine göre ağır karaciğer yetmezliğinde KONTRENDİKEDİR!',
      },
    ],
    dualOrganNote:
      'Kombine ağır karaciğer yetmezliği (Child-Pugh C) + böbrek yetmezliğinde (HRS/üremi) hem pıhtılaşma faktör eksikliği hem üremik trombosit disfonksiyonu birleşerek masif kanama yaratır — Klopidogrel kontrendikedir!',
  },

  prasugrel: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 Standart (10 mg · <60 kg: 5 mg)',
        tone: 'emerald',
        note: 'İntestinal/plazma esterazı (hCE2) ardından tek basamakta CYP3A4/CYP2B6 ile aktif R-138727’ye dönüşür; inaktif metabolitlerin ~%68’i idrar, ~%27’si feçesle atılır. Standart doz uygulanır.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 Standart (Doz Azaltılmaz · Kanama İzle)',
        tone: 'emerald',
        note: 'Aktif metabolit maruziyeti anlamlı değişmez, doz ayarı gerekmez; ancak orta KBY’de majör kanama riski arttığından mutlaka Pantoprazol 40 mg/gün ekleyin ve <60 kg / ≥75 yaş kurallarına dikkat edin.',
      },
      {
        stage: 'Ağır KBY / ABH (eGFR < 30 mL/dk)',
        doseBadge: 'Sınırlı Deneyim · Çok Yüksek Kanama Riski (Klopidogrel Düşün)',
        tone: 'amber',
        note: 'ESRD / ağır KBY’de aktif metabolit maruziyeti ~%40 azalmakla birlikte üremik trombosit disfonksiyonu ve güçlü P2Y₁₂ blokajı ağır kanamaya yol açar; deneyim kısıtlıdır, çoğu merkezde Klopidogrel tercih edilir.',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'Diyalizlenmez · Sınırlı Deneyim / Dikkat!',
        tone: 'rose',
        note: 'Aktif metabolit R-138727 ~%98 albumin bağlı ve trombositlere kovalent bağlı olduğundan HEMODİYALİZLE TEMİZLENMEZ! Diyaliz hastalarında klinik veri kısıtlı ve kanama riski yüksek olduğundan dikkatle kaçının (Klopidogrel daha deneyimlidir).',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'Sınırlı Deneyim · Yüksek Kanama Riski',
        tone: 'amber',
        note: 'Periton diyalizinde veri kısıtlıdır; yüksek kanama riski nedeniyle dikkatli bireysel değerlendirme gerekir (Klopidogrel alternatifi değerlendirilir).',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'CRRT İle Temizlenmez · Kanama Riski Çok Yüksek',
        tone: 'indigo',
        note: 'Kovalent trombosit bağlanması ve ~%98 protein bağlanması nedeniyle CRRT ile uzaklaştırılamaz; kritik septik/ABH hastasında majör YBÜ kanaması açısından yakın takip ve IV PPI zorunludur.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 Standart (10 mg · <60 kg: 5 mg)',
        tone: 'emerald',
        detail:
          'Hafif karaciğer bozukluğunda aktif metabolit (R-138727) farmakokinetiği ve trombosit inhibisyonu değişmez; standart doz (+ PPI) güvenle uygulanır.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'Dikkatle Kullanım (Kanama & Varis Riski!)',
        tone: 'amber',
        detail:
          'Orta sirozda PK büyük ölçüde korunur ancak portal hipertansiyon, trombositopeni ve özofagus varis kanaması nedeniyle güçlü P2Y₁₂ blokajı yüksek kanama riski taşır — endoskopik kontrol + PPI şarttır.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'MUTLAK KONTRENDİKE (EMA / TR SmPC!)',
        tone: 'rose',
        detail:
          'Ağır karaciğer yetmezliğinde ağır koagülopati ve hayatı tehdit eden varis/GİS kanaması riski nedeniyle EMA ve TR kısa ürün bilgisine göre KESİNLİKLE KONTRENDİKEDİR!',
      },
    ],
    dualOrganNote:
      'Kombine ağır karaciğer yetmezliği (Child-Pugh C) + ileri böbrek yetmezliğinde (üremi) Prasugrelin güçlü ve 7–10 gün süren geri dönüşsüz trombosit blokajı ölümcül hemoraji yaratır — KESİNLİKLE KONTRENDİKEDİR!',
  },

  ticagrelor: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 Standart (90 mg / 60 mg q12sa)',
        tone: 'emerald',
        note: 'Esas olarak hepatik CYP3A4 ile aktif AR-C124910XX’e metabolize olup safra/feçesle atılır (<%1 değişmeden renal). Standart doz uygulanır; tedavi sırasında adenozin ilişkili hafif geçici kreatinin artışı görülebilir.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 Standart (Doz Ayarı Yok · PLATO KBY Avantajı)',
        tone: 'emerald',
        note: 'PLATO KBY alt analizinde Tikagrelor, Klopidogrele göre mortaliteyi anlamlı azaltmıştır ve doz ayarı gerektirmez; DAPT’ta mutlaka Pantoprazol 40 mg/gün ekleyin.',
      },
      {
        stage: 'Ağır KBY / ABH (eGFR < 30 mL/dk)',
        doseBadge: '%100 Doz (PK Korunur · Üremik Kanama Riski Yüksek!)',
        tone: 'amber',
        note: 'Renal eliminasyon ihmal edilebilir düzeyde olduğundan PK açısından doz azaltımı gerekmez; ancak üremik trombosit disfonksiyonu üzerine güçlü P2Y₁₂ blokajı eklendiğinden majör kanama riski yüksektir (yakın izlem + PPI!).',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'DİYALİZLENMEZ (>%99,7 Protein) · Sınırlı Deneyim / Dikkat',
        tone: 'amber',
        note: 'Hem ana ilaç hem aktif metabolit >%99,7 proteine bağlı olduğu için HEMODİYALİZLE TEMİZLENMEZ (post-HD ek doz gerekmez). Diyaliz hastalarında klinik veri kısıtlı ve AV fistül/GİS kanaması riski yüksek olduğundan dikkatli kullanın!',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'Diyalizlenmez · Sınırlı Deneyim (Kanama İzle)',
        tone: 'amber',
        note: 'Doz ayarı gerekmez ancak ESRD’de kanama verileri kısıtlı olduğundan yakın hemogram/kanama izlemi şarttır.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'CRRT İle Temizlenmez · Acil Kanamada Plt Etkisiz!',
        tone: 'indigo',
        note: '>%99,7 protein bağlanması nedeniyle CRRT ile uzaklaştırılamaz (ancak KPB’de CytoSorb® hemoadsorpsiyon etkindir!). Acil YBÜ kanamasında trombosit transfüzyonu etkisiz kaldığından kritik hastada kanama izlemi hayati önem taşır.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 Standart (90 mg / 60 mg q12sa)',
        tone: 'emerald',
        detail:
          'Hafif karaciğer bozukluğunda Tikagrelor maruziyeti hafif (~%23) artsa da doz ayarlaması gerekmez; standart doz (+ Pantoprazol) güvenle uygulanır.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'KAÇININ / Çok Dikkatli Kullanım (EMA SmPC!)',
        tone: 'amber',
        detail:
          'Orta karaciğer yetmezliğinde CYP3A4 klirensi düşerek sistemik Tikagrelor düzeyi belirgin yükselir ve portal hipertansiyon/varis kanaması riski artar — EMA SmPC’ye göre orta bozuklukta dikkatle / mümkünse kaçınılarak kullanılır.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'MUTLAK KONTRENDİKE (FDA / EMA / TR SmPC!)',
        tone: 'rose',
        detail:
          'Ağır karaciğer yetmezliğinde hepatik CYP3A4 eliminasyonu çöker, plazma Tikagrelor düzeyleri aşırı yükselir ve ağır koagülopati/varis kanaması ölümcül risk yaratır — KESİNLİKLE KONTRENDİKEDİR!',
      },
    ],
    dualOrganNote:
      'Ağır karaciğer yetmezliğinde (Child-Pugh C) CYP3A4 klirensi durur; üstüne böbrek yetmezliği (üremi) eklenirse diyalizle de temizlenemeyen ve trombosit transfüzyonuyla geri çevrilemeyen ölümcül kanama gelişir — KESİNLİKLE YASAKTIR!',
  },

  heparin: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 Standart (aPTT / Anti-Xa / ACT Titre)',
        tone: 'emerald',
        note: 'Terapötik dozlarda ağırlıklı olarak endotel ve retiküloendotelyal makrofajlarca hızlı/doyurulabilir yolla temizlenir (t½ ~60 dk); yüksek dozlarda renal atılım devreye girer. Standart nomogram uygulanır.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 Standart (Doz Ayarı Yok)',
        tone: 'emerald',
        note: 'Doz ayarlaması gerekmez; aPTT (1,5–2,5×) veya anti-Xa (0,3–0,7 IU/mL) ile standart titre edilir.',
      },
      {
        stage: 'Ağır KBY / ABH (eGFR < 30 mL/dk)',
        doseBadge: '1. TERCİH ANTİKOAGÜLAN! (%100 Standart · Titre)',
        tone: 'emerald',
        note: 'DMAH (Enoksaparin) ve DOAC’lardan farklı olarak ağır KBY ve ABH’de birikmez, kısa yarı ömürlüdür ve Protaminle %100 geri çevrilebilir! Profilaksi: 5.000 IU SC q8–12sa; tedavi: standart IV nomogram (yüksek üremik kanama riskini izle!).',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'Diyaliz Devre 1. Tercih · Diyalizlenmez (Protaminle Geri Döner)',
        tone: 'sky',
        note: 'Büyük molekül ağırlığı (3.000–30.000 Da) nedeniyle hemodiyalizle uzaklaştırılmaz — post-HD ek doz gerekmez. Diyaliz devresi antikoagülasyonu ve ESRD VTE tedavisinde 1. tercihtir (tipik HD devresi: 25–50 IU/kg bolus → 500–1.500 IU/sa).',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: '%100 Standart (1. Tercih Parenteral Antikoagülan)',
        tone: 'sky',
        note: 'Periton diyalizinde standart SC/IV protokollerle güvenle kullanılır (peritonit fibrin tıkaçlarında intraperitoneal 500–1.000 IU/L eklenebilir).',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'Standart Sistemik / Devre İçi (aPTT / Anti-Xa İzle)',
        tone: 'indigo',
        note: 'Bölgesel sitrat antikoagülasyonu yoksa CRRT devre antikoagülasyonunda 5–10 IU/kg/sa pre-filtre infüzyonla kullanılır; sistemik tedavide CRRT ile temizlenmez, kanama ve HIT açısından günlük trombosit izlenir!',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 Standart (aPTT / Anti-Xa İzle)',
        tone: 'emerald',
        detail:
          'Kompanse sirozda standart IV/SC dozlar uygulanabilir; ancak bazal aPTT uzunsa izlemde aPTT yerine Anti-Xa (0,3–0,7 IU/mL) tercih edin.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'Dikkatle Titre · Anti-Xa İzle · AT-III Eksikliği!',
        tone: 'amber',
        detail:
          'Sirozda iki zıt tuzak vardır: (1) Bazal aPTT/INR uzunluğu nedeniyle aPTT heparini olduğundan fazla gösterir; (2) Hepatik Antitrombin-III sentezi düştüğünden paradoksal "heparin direnci" görülebilir! Ayrıca özofagus varis kanaması riski yüksektir.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'Yüksek Kanama Riski · Çok Yakın Anti-Xa & Varis İzlemi',
        tone: 'rose',
        detail:
          'Aktif varis kanaması yoksa ve kesin tromboz (örn. akut portal ven trombozu/PE) mevcutsa UFH kısa ömürlü ve Protaminle geri çevrilebilir olduğu için dikkatle titre edilerek (başlangıç bolusu atlanarak veya düşük infüzyonla, Anti-Xa hedefli) kullanılabilir; aktif kanamada kontrendikedir!',
      },
    ],
    dualOrganNote:
      'Kombine hepatorenal yetmezlikte UFH birikmeyen ve Protaminle anında nötralize edilebilen tek parenteral antikoagülandır; ancak bazal aPTT bozukluğu + AT-III eksikliği + üremik trombosit disfonksiyonu nedeniyle mümkünse Anti-Xa düzeyiyle ve bolussuz/düşük başlangıç hızıyla titre edilmelidir.',
  },

  enoxaparin: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 Standart (Profilaksi 40 mg q24sa · Tedavi 1 mg/kg q12sa)',
        tone: 'emerald',
        note: 'Büyük ölçüde böbreklerden elimine edilir (t½ tek doz ~4,5 sa, tekrarlı doz ~7 sa). Normal böbrek fonksiyonunda öngörülebilir etki nedeniyle rutin laboratuvar izlemi gerekmez.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: '%100 Standart · 30–49’da Kanama & 4.sa Anti-Xa İzle!',
        tone: 'amber',
        note: 'Resmi doz azaltımı <30 mL/dk’da başlasa da eGFR 30–49 mL/dk ve ileri yaşta çok günlük terapötik kullanımda birikim görülebilir; >3–5 gün terapötik kullanımda 4. saat pik Anti-Xa (0,6–1,0 IU/mL) kontrolü önerilir!',
      },
      {
        stage: 'Ağır KBY (CrCl 15–29 mL/dk)',
        doseBadge: 'ZORUNLU AZALTIM: Prof. 20 mg q24sa · Tedavi 1 mg/kg q24sa (veya UFH!)',
        tone: 'rose',
        note: 'Renal klirens %65’e kadar düşer — 1 mg/kg q12sa verilmesi FATAL retroperitoneal/GİS kanamaya yol açar! Profilaksi: 20 mg (0,2 mL · FDA: 30 mg) q24sa; Tedavi: 1 mg/kg q24sa (günde TEK doz + Anti-Xa kontrolü!). Dalgalı/akut ABH’de doğrudan Standart Heparin (UFH) seçin!',
      },
      {
        stage: 'ESRD / CrCl <15 mL/dk & İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'KAÇININ / KONTRENDİKE! → STANDART HEPARİN (UFH) SEÇ! (Diyalizlenmez)',
        tone: 'rose',
        note: 'Sistemik antikoagülasyonda ağır birikim ve ölümcül kanama riski nedeniyle KAÇINILMALIDIR! Hemodiyaliz Enoksaparini TEMİZLEMEZ ve Protamin yalnızca ~%60 nötralize eder → IHD hastasında sistemik tedavi/profilaksi için UFH kullanın! (Yalnızca diyaliz devresi pıhtılaşma önlemi için ayrı özel devre protokolü hariç).',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'KAÇININ! → Standart Heparin (UFH) Tercih Edin',
        tone: 'rose',
        note: 'Periton diyaliziyle elimine edilmez ve ciddi birikim/kanama riski taşır; sistemik antikoagülasyonda UFH seçin.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'KAÇININ! → UFH veya Bölgesel Sitrat Tercih Edin',
        tone: 'rose',
        note: 'CRRT ile öngörülebilir temizlenme sağlanmaz, Protamin yalnızca ~%60 geri çevirir ve kritik YBÜ hastasında kanama kontrolü zordur — UFH tercih edilir!',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 Standart (Kanama & Trombosit İzle)',
        tone: 'emerald',
        detail:
          'Kompanse sirozda (ör. akut portal ven trombozu) böbrek fonksiyonu normalse standart dozda güvenle kullanılabilir; özofagus varis taraması önerilir.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'Dikkatle Kullanım · AT-III & Varis Kanaması Riski!',
        tone: 'amber',
        detail:
          'Sirozda bazal INR/aPTT uzunluğu trombozdan korumaz ancak portal hipertansiyon/varis kanaması riski yüksektir ve AT-III düşüklüğü Anti-Xa yanıtını değiştirebilir (yüksek kanama riskinde kısa ömürlü UFH daha kontrollüdür!).',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'Yüksek Kanama Riski · Aktif Kanamada KONTRENDİKE (UFH Düşün)',
        tone: 'rose',
        detail:
          'Ağır koagülopati, trombositopeni ve varis kanaması riskinde Enoksaparin uzun ömürlü ve yalnızca ~%60 geri çevrilebilir olduğundan tehlikelidir; kesin trombozda yakın izlemle kısa etkili UFH tercih edilir.',
      },
    ],
    dualOrganNote:
      'Kombine karaciğer + böbrek yetmezliğinde (HRS / CrCl <30) Enoksaparin hızla birikir, diyalizle temizlenemez ve Protaminle tam geri çevrilemez — KESİNLİKLE Standart Heparin (UFH) tercih edilmelidir!',
  },

  fondaparinux: {
    renalMatrix: [
      {
        stage: 'CrCl ≥ 50 mL/dk (Normal / Hafif Azalmış)',
        doseBadge: '%100 Standart (Prof. 2,5 mg · Tedavi 5 / 7,5 / 10 mg q24sa)',
        tone: 'emerald',
        note: 'İlaç karaciğerde metabolize olmaz, %100’e yakını (~%77–100) değişmeden böbreklerden elimine edilir (t½ 17–21 saat). CrCl ≥50 mL/dk ve ağırlık ≥50 kg (profilaksi için) ise standart günde tek doz güvenle verilir.',
      },
      {
        stage: 'Orta KBY (CrCl 30–49 mL/dk)',
        doseBadge: 'ÇOK DİKKAT! (Klirens −%40 · Kanama Riski Yüksek)',
        tone: 'amber',
        note: 'Renal klirens ~%40 azalır ve birikim/majör kanama riski belirgin yükselir! EMA KÜB profilakside 1,5 mg SC q24sa seçeneği tanır (TR’de 1,5 mg enjektör çoğu merkezde bulunmadığından 2,5 mg verilecekse çok yakın Cr/Hb izlemi yapın); terapötik antikoagülasyonda veya dalgalı ABH’de UFH/Enoksaparin tercih edin!',
      },
      {
        stage: 'Ağır KBY / ABH (CrCl < 30 mL/dk)',
        doseBadge: 'MUTLAK KONTRENDİKE! (FDA / EMA) → UFH SEÇ!',
        tone: 'rose',
        note: 'CrCl <30 mL/dk’da klirens ~%55–75 çöker, yarı ömür >30–40 saate uzar ve FATAL kanamaya yol açar! Üstelik Protamin Sülfat Fondaparinuksu %0 nötralize eder (spesifik antidot YOK!). Kesinlikle vermeyin — Standart Heparin (UFH) kullanın!',
      },
      {
        stage: 'İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'MUTLAK KONTRENDİKE! (HD yalnızca ~%20 temizler)',
        tone: 'rose',
        note: 'Hemodiyaliz Fondaparinuks klirensini yalnızca ~%20 artırır — etkili diyaliz temizlenmesi YOKTUR! Ağır birikim ve kontrolsüz kanama riski nedeniyle IHD hastasında kesinlikle kullanmayın (UFH seçin).',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'MUTLAK KONTRENDİKE! → UFH Kullanın',
        tone: 'rose',
        note: 'Periton diyalizi ile elimine edilmez; ciddi birikim ve geri çevrilemez kanama riski nedeniyle kesinlikle kontrendikedir.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'MUTLAK KONTRENDİKE! → UFH / Bölgesel Sitrat',
        tone: 'rose',
        note: 'CRRT’de klirens öngörülemez, 17–21+ saatlik uzun yarı ömür ve spesifik antidot yokluğu nedeniyle kritik YBÜ hastasında güvenli değildir — UFH veya bölgesel sitrat tercih edin!',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: '%100 Standart (Renal Atılım Baskın)',
        tone: 'emerald',
        detail:
          'Fondaparinuks hepatik CYP enzimleriyle metabolize olmaz; böbrek fonksiyonu (CrCl ≥50 mL/dk) normalse doz ayarı gerekmez. Ancak bazal koagülasyon ve özofagus varis riski değerlendirilmelidir.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'Dikkatle Kullanım · Kanama & AT-III İzlemi',
        tone: 'amber',
        detail:
          'PK değişimi sınırlıdır (serbest fraksiyon hafif artabilir); ancak sirotik koagülopati, trombositopeni, düşük AT-III ve portal hipertansiyon nedeniyle kanama riski yüksektir — kısa ömürlü ve Protaminle nötralize edilebilen UFH daha güvenlidir.',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'KAÇININ / ÖNERİLMEZ! (Ağır Kanama · Antidot Yok)',
        tone: 'rose',
        detail:
          'Ağır hepatik yetmezlikte (Child-Pugh C) koagülasyon faktör eksikliği + trombositopeni + 17–21 saatlik geri çevrilemez etki ölümcül varis/intrakraniyal kanamaya yol açabilir (EMA KÜB: ağır karaciğer yetmezliğinde kullanmayın!).',
      },
    ],
    dualOrganNote:
      'Kombine hepatorenal yetmezlikte (HRS / CrCl <30 / Child-Pugh C) Fondaparinuks hem böbrekten atılamaz, hem diyalizle etkili temizlenemez, hem de Protamin ile %0 geri çevrilir — kesinlikle KONTRENDİKEDİR, Standart Heparin (UFH) seçilmelidir!',
  },

  warfarin: {
    renalMatrix: [
      {
        stage: 'eGFR ≥ 60 mL/dk (Normal)',
        doseBadge: '%100 Standart (INR ile Titre · Başlangıç 5 mg)',
        tone: 'emerald',
        note: 'Tamamen hepatik CYP2C9 (S-varfarin) ve CYP1A2/3A4 (R-varfarin) ile inaktif metabolitlere çevrilir (<%1 değişmeden idrarda). Hedef INR’ye (2,0–3,0 veya 2,5–3,5) göre titre edilir.',
      },
      {
        stage: 'Orta KBY (eGFR 30–59 mL/dk)',
        doseBadge: 'Resmi Doz Ayarı Yok · Daha Düşük İdame Gerekebilir',
        tone: 'sky',
        note: 'İleri KBY’de üremik toksinler CYP2C9 aktivitesini kısmen baskılayabileceğinden ortalama haftalık Varfarin ihtiyacı %10–20 düşebilir; sık INR takibi önerilir.',
      },
      {
        stage: 'Ağır KBY (eGFR 15–29 mL/dk)',
        doseBadge: 'Düşük Başla (2,5 mg/gün) · Sık INR & Kanama İzlemi',
        tone: 'amber',
        note: 'Resmi kontrendikasyon yoktur (DOAC’ların çoğunun kısıtlandığı evrede kullanılabilir); ancak üremik trombosit disfonksiyonu ve INR labilitesi nedeniyle majör kanama riski 2 kat artar — 2,5 mg/gün ile başlayıp yakından titre edin.',
      },
      {
        stage: 'ESRD / İntermittan Hemodiyaliz (IHD)',
        doseBadge: 'Diyalizlenmez (%99 Albümin) · Mekanik Kapakta Tek Oral · Kalsifilaksi Uyarısı!',
        tone: 'amber',
        note: '>%99 albümine bağlı olduğu için hemodiyalizle TEMİZLENMEZ (post-HD ek doz gerekmez). Mekanik kapaklı ESRD hastasında tek oral antikoagülandır; ancak non-valvüler AF’de yüksek kanama + nadir fakat fatal KALSİFİLAKSİ (MGP inhibisyonu!) riski nedeniyle fayda/zarar dikkatle tartılmalıdır!',
      },
      {
        stage: 'Periton Diyalizi (CAPD / APD)',
        doseBadge: 'Diyalizlenmez · Düşük Başla (2,5 mg) & Yakın INR',
        tone: 'amber',
        note: 'Periton diyaliziyle temizlenmez; hipoalbüminemi serbest Varfarin fraksiyonunu artırabileceğinden 2,5 mg/gün ile başlayıp sık INR ve kalsifilaksi/kanama bulguları izlenmelidir.',
      },
      {
        stage: 'CRRT (CVVH / CVVHD / CVVHDF)',
        doseBadge: 'YBÜ’de Tercih Edilmez (Uzun Etki · Diyalizlenmez → UFH Seç)',
        tone: 'rose',
        note: 'CRRT ile uzaklaştırılamaz ve 2–5 günlük yavaş açılma/kapanma kinetiği kritik YBÜ/ABH hastasında acil girişim ve kanama yönetimini zorlaştırır — akut YBÜ’de kısa etkili IV UFH seçin.',
      },
    ],
    hepaticMatrix: [
      {
        childPugh: 'Child-Pugh A (Hafif · 5–6)',
        badge: 'Düşük Başla (2,5 mg/gün) · Çok Sık INR!',
        tone: 'amber',
        detail:
          'Hem CYP2C9 metabolizması yavaşlar hem de K vitamini bağımlı faktör rezervi azalmıştır; başlangıçta 2,5 mg/gün kullanın, 2–3 günde bir INR kontrol edin ve varis kanaması açısından tarayın.',
      },
      {
        childPugh: 'Child-Pugh B (Orta · 7–9)',
        badge: 'YÜKSEK RİSK! (Bazal INR Bozuk · Aşırı Duyarlılık)',
        tone: 'rose',
        detail:
          'Sirozda bazal INR zaten yüksek (1,4–2,0) olduğundan Varfarin dozunun gerçek antikoagülan düzeyini INR ile izlemek son derece güvenilmezdir; küçük dozlarda bile masif özofagus varis veya intrakraniyal kanama gelişebilir!',
      },
      {
        childPugh: 'Child-Pugh C (Şiddetli · 10–15)',
        badge: 'KONTRENDİKE / KAÇININ! (Fatal Kanama Riski)',
        tone: 'rose',
        detail:
          'Ağır hepatoselüler yetmezlikte faktör II/VII/IX/X sentezi ve CYP2C9 klirensi çökmüştür, trombositopeni ve portal hipertansiyon eşlik eder — Varfarin kesinlikle kaçınılmalıdır (zorunlu trombozda hematoloji/hepatoloji eşliğinde kısa etkili UFH/DMAH değerlendirilir).',
      },
    ],
    dualOrganNote:
      'Kombine hepatorenal yetmezlik ve hipoalbüminemide (<2,5 g/dL) Varfarin’in hem serbest fraksiyonu artar hem de CYP2C9 klirensi ile faktör sentezi eşzamanlı çöker — kontrolsüz INR yükselmesi ve ölümcül kanama riski nedeniyle kullanılmamalıdır!',
  },
};




