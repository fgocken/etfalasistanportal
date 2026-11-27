import type { OrganImpairmentMatrixPayload } from '../../components/treatments/shared/DrugMonographBlocks';

export type StandaloneOrganPart2Id =
  | 'ketamine'
  | 'lidocaine'
  | 'methylprednisolone'
  | 'naloxone'
  | 'nicardipine'
  | 'norepinephrine'
  | 'pantoprazole'
  | 'paracetamol'
  | 'pheniramine'
  | 'sevoflurane'
  | 'sodium-bicarbonate'
  | 'sodium-nitroprusside'
  | 'sugammadex'
  | 'thiopental'
  | 'tranexamic-acid';

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
};


