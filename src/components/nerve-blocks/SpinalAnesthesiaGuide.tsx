import React, { useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Droplets,
  Layers,
  ShieldAlert,
  Syringe,
  UserCheck
} from 'lucide-react';
import {
  BromageStickVisual,
  SpinalAnatomyProcedureVisuals,
  SpinalDermatomeVisual,
  SpinalNeedleBevelVisual,
  SpinalParamedianApproachCard,
  SpinalSpecialPopulationsDosingCard
} from './SpinalAnesthesiaVisuals';
import { ShareLinkButton } from '../common/ShareLinkButton';

interface SpinalAnesthesiaGuideProps {
  isDark?: boolean;
}

type SurgeryDoseId = 'saddle' | 'lower-extremity' | 't10-pelvic' | 'cesarean';

interface AnticoagulantRule {
  id: string;
  drugGroup: string;
  waitBefore: string;
  waitAfter: string;
  severity: 'safe' | 'caution' | 'critical';
  note: string;
}

interface DosePreset {
  id: SurgeryDoseId;
  surgery: string;
  dermatome: string;
  doseMg: string;
  volumeMl: string;
  pregnantMg: string;
  pregnantMl: string;
  clinicalTip: string;
}

const ANTICOAGULANT_RULES: AnticoagulantRule[] = [
  {
    id: 'nsaid',
    drugGroup: 'NSAİİ (İbuprofen vb.) / Aspirin',
    waitBefore: 'Beklemeye gerek yok (Güvenli)',
    waitAfter: 'Hemen devam edilebilir',
    severity: 'safe',
    note: 'Tek başına aspirin veya NSAİİ kullanımı nöraksiyel hematom riskini anlamlı artırmaz; kombine antikoagülan varsa değerlendirin.'
  },
  {
    id: 'clopidogrel',
    drugGroup: 'Klopidogrel (Plavix) / Tikagrelor',
    waitBefore: '5 – 7 Gün',
    waitAfter: '24 saat (yükleme yoksa hemen)',
    severity: 'critical',
    note: 'ASRA kılavuzu: Klopidogrel ve Tikagrelor için işlem öncesi en az 5–7 gün kesilmesi şarttır.'
  },
  {
    id: 'prasugrel',
    drugGroup: 'Prasugrel (Effient)',
    waitBefore: '7 – 10 Gün',
    waitAfter: '24 saat',
    severity: 'critical',
    note: 'Güçlü ve irreversibl P2Y12 blokajı nedeniyle bekleme penceresi diğerlerinden uzundur.'
  },
  {
    id: 'lmwh-proph',
    drugGroup: 'LMWH (Enoksaparin) — Profilaktik (ör. 1×40 mg)',
    waitBefore: '12 Saat',
    waitAfter: '≥ 12 saat (tek doz ponksiyon sonrası ≥ 4–12 sa)',
    severity: 'caution',
    note: 'Preoperatif son profilaktik dozdan en az 12 saat geçmiş olmalıdır.'
  },
  {
    id: 'lmwh-thera',
    drugGroup: 'LMWH (Enoksaparin) — Terapötik (ör. 1 mg/kg 2×1)',
    waitBefore: '24 Saat',
    waitAfter: '≥ 24 saat (travmatik ponksiyonda ertele)',
    severity: 'critical',
    note: 'Yüksek doz tedavi rejimlerinde güvenli pencere minimum 24 saattir.'
  },
  {
    id: 'ufh',
    drugGroup: 'Standart Heparin (UFH — IV İnfüzyon)',
    waitBefore: '4 – 6 Saat + Normal aPTT',
    waitAfter: '≥ 1 saat (kanlı ponksiyonda dikkat)',
    severity: 'caution',
    note: 'IV infüzyon kesildikten 4–6 saat sonra mutlaka normal aPTT teyit edilmelidir (SC 2×5000 Ü profilakside de 4–6 sa).'
  },
  {
    id: 'warfarin',
    drugGroup: 'Warfarin (Coumadin)',
    waitBefore: '5 Gün (İşlem sabahı INR ≤ 1.2)',
    waitAfter: 'Hemostaz sağlandığında başlanır',
    severity: 'critical',
    note: 'İşlem günü sabah mutlaka güncel INR değeri kontrol edilmeli ve ≤ 1.2 olmalıdır.'
  },
  {
    id: 'doac',
    drugGroup: 'DOAC (Apiksaban, Rivaroksaban, Dabigatran)',
    waitBefore: '72 Saat (Böbrek yetmezliğinde 120 saate uzar)',
    waitAfter: '24 saat',
    severity: 'critical',
    note: 'Kreatinin klirensi < 50 mL/dk ise (özellikle renal atılımlı Dabigatran) bekleme süresi 120 saate kadar uzatılır.'
  }
];

const MARCAINE_HEAVY_DOSES: DosePreset[] = [
  {
    id: 'saddle',
    surgery: 'Perineal / Anal (Saddle Blok)',
    dermatome: 'S2 – S5',
    doseMg: '5 – 7.5 mg',
    volumeMl: '1.0 – 1.5 mL',
    pregnantMg: '4 – 5 mg',
    pregnantMl: '0.8 – 1.0 mL',
    clinicalTip: 'Enjeksiyon sonrası hasta 5–10 dk oturur pozisyonda bekletilirse hiperbarik ilaç sakral köklerde çöker (Eğer/Saddle blok).'
  },
  {
    id: 'lower-extremity',
    surgery: 'Alt Ekstremite / Ayak',
    dermatome: 'T12',
    doseMg: '7.5 – 10 mg',
    volumeMl: '1.5 – 2.0 mL',
    pregnantMg: '5.5 – 7.5 mg',
    pregnantMl: '1.1 – 1.5 mL',
    clinicalTip: 'Tek taraflı ayak/ayak bileği vakalarında lateral pozisyonda 10–15 dk bekletilerek unilateral ağırlıklı blok sağlanabilir.'
  },
  {
    id: 't10-pelvic',
    surgery: 'Kalça / Diz / TUR-P / İnguinal Herni',
    dermatome: 'T10 (Göbek hizası)',
    doseMg: '10 – 12.5 mg',
    volumeMl: '2.0 – 2.5 mL',
    pregnantMg: '7.5 – 9 mg',
    pregnantMl: '1.5 – 1.8 mL',
    clinicalTip: 'TUR-P hastalarında mesane distansiyonu (T10) ağrısını önlemek için duyusal seviye mutlaka T10’a ulaşmalıdır; hipotansiyonu önlemek için aşırı yükseğe çıkarılmaz.'
  },
  {
    id: 'cesarean',
    surgery: 'Sezaryen / Alt Batın',
    dermatome: 'T4 (Meme başı hizası)',
    doseMg: '12.5 – 15 mg',
    volumeMl: '2.5 – 3.0 mL',
    pregnantMg: '10 – 12 mg',
    pregnantMl: '2.0 – 2.4 mL',
    clinicalTip: 'Gebelerde engorje epidural venler subaraknoid BOS hacmini daralttığı için doz %25–30 azaltılır; blok kalitesi için 10–25 mcg Fentanil (0.2–0.5 mL) eklenebilir.'
  }
];

const TECHNIQUE_STEPS = [
  {
    step: 1,
    title: 'Pozisyon Verme ("Kedi Kamburu")',
    detail:
      'Hastaya oturur veya lateral dekübit pozisyonu verdirilir. Çene göğse, dizler karna çekilerek lomber lordoz düzleştirilir ve interspinöz aralıklar maksimize edilir.'
  },
  {
    step: 2,
    title: 'Landmark (Tuffier Çizgisi)',
    detail:
      'Her iki krista iliyakanın en üst noktasını birleştiren Tuffier çizgisi L4 spinöz çıkıntısına veya L4–L5 aralığına denk gelir. Medulla spinalis L1–L2’de bittiği için ponksiyon L3–L4 veya L4–L5’ten yapılmalıdır.'
  },
  {
    step: 3,
    title: 'Asepsi & Lokal İnfiltrasyon',
    detail:
      'Batikon veya alkollü klorheksidin ile geniş saha boyanır (solüsyonun kuruması beklenir — nörotoksisite riski!). Seçilen aralığa 2–3 mL %2 Lidokain (40–60 mg; maks. 5 mL) ile önce cilt içi kabarcık (wheal), ardından negatif aspirasyonla cilt altı ve derin hat infiltrasyonu yapılır (fazla hacim palpasyonu silikleştirir).'
  },
  {
    step: 4,
    title: 'İğnenin İlerletilmesi & Anatomik Katmanlar',
    detail:
      'Orta hattan hafif sefalik (10–15°) açıyla ilerlenir. Geçilen katmanlar sırasıyla: Cilt → Cilt altı → Supraspinöz ligaman → İnterspinöz ligaman → Ligamentum flavum → Epidural aralık → Dura & Araknoid.'
  },
  {
    step: 5,
    title: 'Direnç Kaybı ("Pop") & Subaraknoid Giriş',
    detail:
      'Kıkırdakvari sertlikteki Ligamentum flavum geçilip dura delindiğinde belirgin bir "pop" / "tık" hissi alınır. 25G ince iğnede his silik olabileceği için aralıklı mandren çekilerek kontrol edilmelidir.'
  },
  {
    step: 6,
    title: 'BOS Girdabı (Swirl) & Yavaş Enjeksiyon',
    detail:
      'Berrak, serbest BOS akışı görüldükten sonra iğne sabitlenir, enjektör takılır. Hafifçe aspire edilerek BOS-ilaç girdabı (swirl) teyit edilir ve ilaç ~0.2 mL/sn hızla yavaşça verilir.'
  }
];

const BROMAGE_SCALE = [
  {
    score: 0,
    label: 'Bromage 0 · Blok Yok (Tam Hareket)',
    desc: 'Hasta kalçasını fleksiyona getirip bacağını dizden bükmeden düz kaldırabiliyor; ayak ve diz hareketi tam.',
    pacuAction: 'Servise devir hedefi! Dikkat: Cerrahi ağrı artık hızla başlayacaktır → analjezi planını hemen devreye alın.'
  },
  {
    score: 1,
    label: 'Bromage 1 · Kısmi Blok',
    desc: 'Hasta düz bacağını yataktan kaldıramıyor, ancak dizini bükebiliyor ve ayak bileğini hareket ettirebiliyor.',
    pacuAction: 'PACU takibi devam eder; motor gerileme izlenir.'
  },
  {
    score: 2,
    label: 'Bromage 2 · Neredeyse Tam Blok',
    desc: 'Hasta dizini bükemiyor, yalnızca ayak bileğini veya ayak parmaklarını oynatabiliyor.',
    pacuAction: 'Aktif PACU izlemi; mobilizasyon kesinlikle yasaktır.'
  },
  {
    score: 3,
    label: 'Bromage 3 · Tam Motor Blok',
    desc: 'Alt ekstremitede kalça, diz, ayak bileği ve parmaklarda hiçbir hareket yok.',
    pacuAction: 'Tam motor blok: Duyusal dermatom seviyesi + NIBP (1–2 dk arayla) yakın izlenir.'
  }
];

export const SpinalAnesthesiaGuide: React.FC<SpinalAnesthesiaGuideProps> = ({ isDark = true }) => {
  const [selectedSurgeryId, setSelectedSurgeryId] = useState<SurgeryDoseId>('cesarean');
  const [isPregnant, setIsPregnant] = useState<boolean>(true);
  const [addFentanyl, setAddFentanyl] = useState<boolean>(true);
  const [anticoagSearch, setAnticoagSearch] = useState<string>('');
  const [selectedBromage, setSelectedBromage] = useState<number>(0);

  const selectedDose = MARCAINE_HEAVY_DOSES.find((d) => d.id === selectedSurgeryId) || MARCAINE_HEAVY_DOSES[3];
  const filteredAnticoag = ANTICOAGULANT_RULES.filter(
    (r) =>
      !anticoagSearch.trim() ||
      r.drugGroup.toLowerCase().includes(anticoagSearch.toLowerCase()) ||
      r.note.toLowerCase().includes(anticoagSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-100 animate-in fade-in duration-300">
      {/* Üst Başlık Bandı */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-mono font-bold text-teal-400">Nöraksiyel Anestezi Protokolü</span>
              <span aria-hidden="true">·</span>
              <span>ASRA / ESRA · Miller’s Anesthesia · Morgan &amp; Mikhail</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Spinal Anestezi Klinik Talimatı &amp; Doz / Güvenlik Rehberi
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              T10 ve altı cerrahilerde standart nöraksiyel blok protokolü: ASRA antikoagülan kesilme süreleri, Marcaine Heavy %0.5 dozlama, 23G/25G Quincke iğne ve bevel kuralı, diferansiyel blok, Bezold-Jarisch uyarısı, Modifiye Bromage skalası ve post-op kırmızı bayraklar.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono shrink-0">
            <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400">Ponksiyon Aralığı</div>
              <div className="font-bold text-teal-400">L3–L4 / L4–L5</div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400">Medulla Sonu</div>
              <div className="font-bold text-amber-400">L1 – L2</div>
            </div>
            <ShareLinkButton
              type="blok"
              id="spinal-anestezi"
              title="Spinal Anestezi Klinik Talimatı Bağlantısını Kopyala"
              isDark={isDark}
              className="font-sans"
            />
          </div>
        </div>
      </div>

      {/* 1. ENDİKASYONLAR, KONTRENDİKASYONLAR & ASRA ANTİKOAGÜLAN TABLOSU */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-lg">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
          <h3 className="text-base font-bold text-white">
            1. İşlem Endikasyonları, Kontrendikasyonlar &amp; Antikoagülan Bekleme Süreleri
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2.5">
            <div className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Endikasyonlar &amp; Özel Hasta Grupları</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <li>
                <strong className="text-white">Cerrahi Bölge:</strong> Umbilikus seviyesi (T10) ve altındaki batın, pelvik, perineal ve alt ekstremite cerrahileri (Sezaryen, TUR-P, inguinal herni, kalça/diz artroplastisi).
              </li>
              <li>
                <strong className="text-white">Özel Hasta Grupları:</strong> Spontan solunumun korunmasının hayati olduğu ileri KOAH/astım, zor havayolu öngörülen hastalar veya genel anestezinin sistemik stresinden kaçınılması gereken olgular.
              </li>
            </ul>
          </div>

          <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4" />
              <span>Mutlak Kontrendikasyonlar</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-200 leading-relaxed list-disc pl-4">
              <li>Hasta reddi (bilgilendirilmiş onam yokluğu)</li>
              <li>Ponksiyon bölgesinde aktif cilt/yumuşak doku enfeksiyonu</li>
              <li>Düzeltilmemiş ağır hipovolemi (ani derin hipotansiyon ve kollaps riski)</li>
              <li>Artmış intrakraniyal basınç — KİBAS (kitleye sekonder herniasyon riski)</li>
              <li>Ciddi sol ventrikül çıkış yolu obstrüksiyonu (Ağır Aort Darlığı, HOCM)</li>
            </ul>
          </div>
        </div>

        {/* ASRA Antikoagülan Tablosu */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                Kanama Diatezi ve Antikoagülan Kullanımı (Spinal Hematom Koruması — ASRA / Stanford)
              </h4>
              <p className="text-[11px] text-slate-400">
                İlaç veya etken maddeye göre güvenli işlem öncesi bekleme sürelerini doğrulayın:
              </p>
            </div>
            <input
              type="search"
              value={anticoagSearch}
              onChange={(e) => setAnticoagSearch(e.target.value)}
              placeholder="İlaç ara (Plavix, DOAC, Enoksaparin...)"
              className="w-full sm:w-64 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 pr-3 font-bold">İlaç Grubu / Etken Madde</th>
                  <th className="py-2 px-3 font-bold">İşlem Öncesi Bekleme</th>
                  <th className="py-2 px-3 font-bold">İşlem Sonrası Tekrar Başlama</th>
                  <th className="py-2 pl-3 font-bold">Klinik Not</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredAnticoag.map((rule) => (
                  <tr key={rule.id} className="hover:bg-slate-800/30">
                    <td className="py-2.5 pr-3 font-semibold text-white">{rule.drugGroup}</td>
                    <td
                      className={`py-2.5 px-3 font-mono font-bold tabular-nums whitespace-nowrap ${
                        rule.severity === 'safe'
                          ? 'text-emerald-400'
                          : rule.severity === 'caution'
                            ? 'text-amber-400'
                            : 'text-rose-400'
                      }`}
                    >
                      {rule.waitBefore}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-300">{rule.waitAfter}</td>
                    <td className="py-2.5 pl-3 text-[11px] text-slate-400 leading-snug">{rule.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2. HAZIRLIK, GÜVENLİK ÇEMBERİ & MARCAİNE HEAVY %0.5 DOZLAMA */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-lg">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Syringe className="w-5 h-5 text-cyan-400 shrink-0" />
          <h3 className="text-base font-bold text-white">
            2. İşlem Öncesi Güvenlik Çemberi &amp; Marcaine Heavy %0.5 Dozlaması
          </h3>
        </div>

        {/* Güvenlik Çemberi 3 Kart */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1.5">
            <div className="text-xs font-bold text-cyan-400">Güvenlik Çemberi (Genel Anestezi Şartı)</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Rejyonal anestezi yapılan her odada genel anestezi cihazı, laringoskop, endotrakeal tüpler ve entübasyon ilaçları her an kullanıma hazır olmalıdır.
            </p>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1.5">
            <div className="text-xs font-bold text-cyan-400">Damar Yolu &amp; ASA Monitörizasyonu</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              En az bir adet geniş lümenli IV (<strong>18G / 16G</strong>) açılmalı; pre-load / co-load kristaloid başlanmalı ve standart ASA monitörizasyonu (EKG, NIBP, SpO₂) bağlanmalıdır.
            </p>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1.5">
            <div className="text-xs font-bold text-rose-400">Masada Hazır Acil İlaçlar</div>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              Efedrin (5 mg/mL) · Fenilefrin (100 mcg/mL) · Atropin (0.5 mg/mL)
            </p>
            <p className="text-[11px] text-slate-400">Enjektöre çekilmiş ve etiketlenmiş olarak hazır bekletilir.</p>
          </div>
        </div>

        {/* İnteraktif Marcaine Heavy %0.5 Hesaplayıcı */}
        <div className="bg-slate-950/80 border border-cyan-500/30 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                İnteraktif Marcaine Heavy %0.5 Doz Seçici (5 mg/mL Bupivakain + %8 Dekstroz)
              </h4>
              <p className="text-[11px] text-slate-400">
                Cerrahi bölgeyi ve gebe durumunu seçerek önerilen doz aralığını görün:
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPregnant(!isPregnant)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                  isPregnant
                    ? 'bg-amber-600 border-amber-500 text-white'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                Gebe Hasta (%25–30 Doz Azalt): {isPregnant ? 'AÇIK' : 'KAPALI'}
              </button>
              <button
                type="button"
                onClick={() => setAddFentanyl(!addFentanyl)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                  addFentanyl
                    ? 'bg-teal-600 border-teal-500 text-white'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                + Fentanil 10–25 mcg (0.2–0.5 mL)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {MARCAINE_HEAVY_DOSES.map((item) => {
              const active = item.id === selectedSurgeryId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedSurgeryId(item.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-cyan-950/50 border-cyan-400 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] font-mono text-cyan-400 font-bold">{item.dermatome}</div>
                  <div className="text-xs font-bold mt-0.5">{item.surgery}</div>
                </button>
              );
            })}
          </div>

          {/* Seçili Doz Çıktı Kartı */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="space-y-1">
              <div className="text-[11px] text-slate-400">Hedef Dermatom &amp; Cerrahi</div>
              <div className="text-sm font-bold text-white">{selectedDose.surgery}</div>
              <div className="font-mono text-xs text-cyan-400 font-bold">{selectedDose.dermatome}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 font-mono tabular-nums">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Bupivakain Dozu</div>
                <div className="text-base font-bold text-teal-400">
                  {isPregnant ? selectedDose.pregnantMg : selectedDose.doseMg}
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Marcaine Heavy Hacmi</div>
                <div className="text-base font-bold text-cyan-300">
                  {isPregnant ? selectedDose.pregnantMl : selectedDose.volumeMl}
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              {addFentanyl && (
                <div className="text-teal-300 font-semibold mb-1">
                  Adjuvan: +10–25 mcg Fentanil (0.2–0.5 mL) visseral blokaj kalitesini artırır.
                </div>
              )}
              <div>{selectedDose.clinicalTip}</div>
            </div>
          </div>

          <SpinalDermatomeVisual selectedSurgeryId={selectedSurgeryId} />

          {/* Tam Referans Tablosu */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 pr-3 font-bold">Cerrahi Tipi / Bölge</th>
                  <th className="py-2 px-3 font-bold">Hedef Dermatom</th>
                  <th className="py-2 px-3 font-bold">Bupivakain Dozu (Erişkin)</th>
                  <th className="py-2 px-3 font-bold">Marcaine Heavy %0.5 Hacmi</th>
                  <th className="py-2 pl-3 font-bold">Gebede (%25–30 Azaltılmış)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono tabular-nums">
                {MARCAINE_HEAVY_DOSES.map((d) => (
                  <tr key={d.id} className={d.id === selectedSurgeryId ? 'bg-cyan-950/25' : ''}>
                    <td className="py-2 pr-3 font-sans font-semibold text-white">{d.surgery}</td>
                    <td className="py-2 px-3 text-cyan-400 font-bold">{d.dermatome}</td>
                    <td className="py-2 px-3 text-slate-200">{d.doseMg}</td>
                    <td className="py-2 px-3 text-teal-300 font-bold">{d.volumeMl}</td>
                    <td className="py-2 pl-3 text-amber-300">{d.pregnantMg} ({d.pregnantMl})</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ÖZEL HASTA GRUPLARI & BOY/KİLO DOZ MODİFİKASYONU */}
      <SpinalSpecialPopulationsDosingCard />

      {/* 3. İĞNE SEÇİMİ (23G vs 25G QUINCKE) & BEVEL ORYANTASYONU */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Activity className="w-5 h-5 text-amber-400 shrink-0" />
          <h3 className="text-base font-bold text-white">
            3. İğne Seçimi (23G Siyah vs. 25G Turuncu Quincke) &amp; Bevel Oryantasyonu
          </h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Klinikte yaygın bulunan <strong>Quincke (kesici uçlu)</strong> iğneler durayı aralamak yerine keserek geçer; bu nedenle atravmatik kalem uçlu (<em>Whitacre/Sprotte</em>) iğnelere kıyasla Post-Dural Ponksiyon Baş Ağrısı (<strong>PDPH</strong>) riski daha yüksektir.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">23G Siyah (Kalın Quincke)</span>
              <span className="text-[11px] font-mono text-rose-400 font-bold">Yüksek PDPH Riski</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Rijittir, bükülmez. Ligamentum flavum ve dura geçişindeki "pop" hissi çok nettir, BOS hemen gelir. Ancak PDPH riski çok yüksektir: <strong>yalnızca ≥ 65 yaş</strong> (PDPH riski minimal) ve kalsifiye/zor anatomisi olan hastalarda kullanılmalıdır.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-amber-500/35 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">25G Turuncu (İnce Quincke)</span>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">Genç &amp; Gebe Tercihi</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              İnce ve esnektir; dokudan geçerken bükülebilir (kılavuz/introducer iğne gerekebilir). "Pop" hissi siliktir ve BOS’un damlaması <strong>10–15 saniye</strong> alabilir (iğneyi fazla itmeyin!). Gençlerde ve gebelerde mutlaka 25G (veya varsa 25–27G kalem uçlu) seçilmelidir.
            </p>
          </div>

          <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 space-y-2">
            <div className="text-sm font-bold text-amber-300">Altın Kural: Bevel Oryantasyonu</div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Quincke iğne kullanırken uzunlamasına (kraniyokaudal) seyreden dural lifleri enlemesine kesmek yerine boylamasına ayırmak için, iğnenin kesik ucu (<strong>bevel</strong>) hastanın <strong>yan tarafına (sol veya sağ)</strong> bakacak şekilde ilerletilmelidir. Asla yukarı (sefalik) veya aşağı bakmamalıdır.
            </p>
          </div>
        </div>

        <SpinalNeedleBevelVisual />
      </div>

      {/* ORTA HAT vs PARAMEDYAN YAKLAŞIM GÖRSEL ŞEMASI */}
      <SpinalParamedianApproachCard />

      {/* 4. POZİSYON & ANATOMİK KESİT GÖRSELLERİ */}
      <SpinalAnatomyProcedureVisuals />

      {/* 4. ADIM ADIM YAPILIŞ TEKNİĞİ & 5. DİFERANSİYEL BLOK */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Adım Adım Teknik */}
        <div className="xl:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Layers className="w-5 h-5 text-indigo-400 shrink-0" />
            <h3 className="text-base font-bold text-white">4. Yapılış Tekniği (Adım Adım)</h3>
          </div>

          <div className="space-y-2.5">
            {TECHNIQUE_STEPS.map((st) => (
              <div
                key={st.step}
                className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono tabular-nums text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {st.step}
                </span>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">{st.title}</div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{st.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diferansiyel Blok & Bezold-Jarisch */}
        <div className="xl:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Droplets className="w-5 h-5 text-cyan-400 shrink-0" />
              <h3 className="text-base font-bold text-white">5. Diferansiyel Blok Seviyeleri</h3>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Blokaj Sırası:</strong> Sempatik tonus (ısı artışı/vazodilatasyon) → Isı ve Ağrı (pinprick) → Dokunma/Basınç → Motor fonksiyon → Propriyosepsiyon. <em>Geri dönüş tam tersi sırayladır.</em>
            </div>

            {/* 3 Seviyeli Blok Merdiveni (Örnek: T4 Sezaryen) */}
            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 rounded-xl bg-rose-950/25 border border-rose-500/35">
                <div className="flex items-center justify-between font-bold text-rose-300">
                  <span>Sempatik Blok (En Yukarıda!)</span>
                  <span>+2 ila +6 Dermatom (Örn. T2)</span>
                </div>
                <p className="font-sans text-[11px] text-slate-300 mt-1">
                  Duyusal bloğun 2–6 dermatom yukarısındadır; vazodilatasyon ve venöz göllenme yaratır.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/25 border border-cyan-500/35">
                <div className="flex items-center justify-between font-bold text-cyan-300">
                  <span>Duyusal Blok (Merkez / Pinprick)</span>
                  <span>Hedef Seviye (Örn. T4)</span>
                </div>
                <p className="font-sans text-[11px] text-slate-300 mt-1">
                  Hastanın soğuk/iğne acısını hissetmediği cerrahi anestezi sınırıdır.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <div className="flex items-center justify-between font-bold text-emerald-300">
                  <span>Motor Blok (En Aşağıda)</span>
                  <span>−2 Dermatom (Örn. T6)</span>
                </div>
                <p className="font-sans text-[11px] text-slate-300 mt-1">
                  Duyusal bloğun ~2 dermatom aşağısındadır (kollar felç olmaz, gövde/bacak motor bloğu).
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Klinik Tehlike: Kardiyoakseratör Lifler (T1–T4) &amp; Bezold-Jarisch Refleksi</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Kalbin sempatik akseleratör lifleri <strong>T1–T4</strong>’ten çıkar. Duyusal blok T4’te bırakılsa dahi sempatik blok T2’ye yükselirse kalbin sempatik uyarısı kesilir; venöz dönüş azalmasıyla birleşerek <strong>ani derin bradikardi (Bezold-Jarisch Refleksi)</strong> ve kardiyak arrest gelişebilir → derhal <strong>Atropin + Efedrin + Sıvı</strong> (yanıtsızsa Epinefrin) uygulanmalıdır.
            </p>
          </div>
        </div>
      </div>

      {/* 5B. MOTOR BLOK DEĞERLENDİRMESİ: MODİFİYE BROMAGE SKALASI */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">
              Motor Blok Değerlendirmesi · Modifiye Bromage Skalası (0–3)
            </h3>
            <p className="text-xs text-slate-400">
              Diferansiyel blokta en son motor ve propriyosepsiyon geri döner; PACU’dan servise devir hedefi <strong>Bromage 0</strong>’dır.
            </p>
          </div>
          <span className="font-mono text-xs font-bold text-emerald-400 shrink-0">
            Seçili: Skor {selectedBromage}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BROMAGE_SCALE.map((b) => (
                <button
                  key={b.score}
                  type="button"
                  onClick={() => setSelectedBromage(b.score)}
                  className={`py-2 px-2.5 rounded-lg border font-mono text-xs font-bold transition-colors cursor-pointer ${
                    selectedBromage === b.score
                      ? b.score === 0
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  Skor {b.score}
                </button>
              ))}
            </div>

            {(() => {
              const current = BROMAGE_SCALE[selectedBromage];
              return (
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1.5">
                  <div className="font-bold text-white">{current.label}</div>
                  <p className="text-slate-300 leading-relaxed">{current.desc}</p>
                  <div className={current.score === 0 ? 'text-emerald-400 font-semibold' : 'text-amber-300 font-semibold'}>
                    → {current.pacuAction}
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="lg:col-span-5">
            <BromageStickVisual score={selectedBromage} />
          </div>
        </div>
      </div>

      {/* 6. PACU TAKİBİ, SERVİSE DEVİR & POST-OP KIRMIZI BAYRAKLAR */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-lg">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <ClipboardCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <h3 className="text-base font-bold text-white">
            6. İşlem Sonrası Yönetim, Servise Devir &amp; Post-Op Kırmızı Bayraklar
          </h3>
        </div>

        {/* İntraop/PACU Başlangıç & Yüksek Spinal Uyarısı */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>Derlenme &amp; İlk 15 Dakika Monitörizasyonu (0–2 Saat)</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
            <li>
              • Supin pozisyon sonrası masanın eğimiyle hiperbarik ilacın yayılımı yönlendirilir; ilk <strong>15 dakika tansiyon (NIBP) 1–2 dakikada bir</strong> ölçülmelidir.
            </li>
            <li>
              • Sempatik bloğa bağlı düşüşlere Efedrin / Fenilefrin ile gecikmeden müdahale edilir.
            </li>
            <li className="text-rose-300 font-medium">
              • <strong>Yüksek / Total Spinal Uyarısı:</strong> Hastanın kollarında uyuşukluk, derin nefes alamama veya fısıltılı konuşma başlaması acil yükselme belirtisidir → derhal havayolu/solunum desteği ve vazopressör sağlanmalıdır.
            </li>
          </ul>
        </div>

        {/* Servis Ekibine Devir (Handover) */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <UserCheck className="w-4 h-4 text-teal-400" />
              <span>Servis Ekibine Devir (Handover) &amp; Hasta Talimatları</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-emerald-400">
              Devir Kriteri: Modifiye Bromage Skor 0 (Düz bacak kaldırabilme)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <strong className="text-teal-300 block mb-1">1. İlk Ayağa Kalkış</strong>
              Sempatik vazodilatasyon ve propriyosepsiyon kaybı geç çözülür; <strong>Bromage 0</strong> sağlansa dahi ilk mobilizasyon kesinlikle hemşire refakatinde yapılmalıdır.
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <strong className="text-teal-300 block mb-1">2. Mesane Takibi (S2–S4)</strong>
              Sakral blok en son çözülür. İşlemden sonraki 6–8 saat içinde idrar yapılamazsa mesane USG veya Nélaton kateterizasyon uygulanır.
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <strong className="text-teal-300 block mb-1">3. Erken Ağrı Yönetimi</strong>
              Bromage 0 olduğunda cerrahi ağrı hızla başlar. Hasta "bacaklarımı oynatıyorum" dediği an post-op analjezi planı başlatılmalıdır.
            </div>
          </div>
        </div>

        {/* Post-Op Kırmızı Bayraklar */}
        <div className="space-y-2.5">
          <div className="text-xs font-bold text-white">Haber Verilmesi Gereken Post-Op Kırmızı Bayraklar</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-rose-950/25 border border-rose-500/40 space-y-1.5">
              <div className="font-mono font-bold text-rose-400">ACİL · İlk 8–12 Saat</div>
              <div className="font-bold text-white">Spinal Hematom Şüphesi</div>
              <p className="text-slate-200 leading-relaxed">
                Çözülen bloğun geri gelmesi, bacaklarda artan güçsüzlük, sırtta şiddetli kemirici ağrı veya yeni idrar/gaita inkontinansı → <strong>ACİL Spinal MRG &amp; Beyin Cerrahisi konsültasyonu</strong> (kalıcı felci önlemek için ilk 8–12 saat dekompresyon kritiktir!).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/25 border border-amber-500/35 space-y-1.5">
              <div className="font-mono font-bold text-amber-400">UYARI · İlk 24–48 Saat</div>
              <div className="font-bold text-white">Post-Dural Ponksiyon Baş Ağrısı (PDPH)</div>
              <p className="text-slate-200 leading-relaxed">
                Ayağa kalkmakla şiddetlenen, sırtüstü yatmakla hafifleyen frontal/oksipital zonklayıcı baş ağrısı → hidrasyon, oral/IV kafein, multimodal analjezi; 24–48 saatte dirençliyse altın standart tedavi: <strong>Epidural Kan Yaması</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
              <div className="font-mono font-bold text-emerald-400">TAKİP · İlk 24 Saat</div>
              <div className="font-bold text-white">Geçici Nörolojik Semptomlar (TNS)</div>
              <p className="text-slate-200 leading-relaxed">
                Kalçadan arka bacağa vuran, motor kayıp veya sfinkter defisiti yapmayan yanıcı radiküler ağrılar → nörolojik muayene normaldir; NSAİİ ve sıcak uygulama ile 2–3 günde kendiliğinden geriler.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Kaynaklar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-slate-200">
          <BookOpen className="w-4 h-4 text-teal-400" />
          <span>Kaynaklar (Textbook &amp; Güncel Kılavuzlar)</span>
        </div>
        <ol className="list-decimal list-inside space-y-1 leading-relaxed">
          <li>
            Gropper MA, Eriksson LI, Fleisher LA, et al. (Eds.). <em>Miller’s Anesthesia</em>. 10th ed. Elsevier; 2024. (Spinal, Epidural, and Caudal Anesthesia).
          </li>
          <li>
            Butterworth JF, Mackey DC, Wasnick JD. <em>Morgan &amp; Mikhail’s Clinical Anesthesiology</em>. 7th ed. McGraw-Hill; 2022. (Chapter 45: Spinal, Epidural, &amp; Caudal Blocks).
          </li>
          <li>
            Horlocker TT, Vandermeuelen E, Kopp SL, et al. Regional Anesthesia in the Patient Receiving Antithrombotic or Thrombolytic Therapy: ASRA Evidence-Based Guidelines (4th ed.). <em>Reg Anesth Pain Med</em>. 2018;43(3):263–309. / Kietaibl S, et al. <em>ESAIC/ESRA</em> Guideline, <em>Eur J Anaesthesiol</em>. 2022;39(2):100–132.
          </li>
          <li>
            Chestnut DH, Wong CA, Tsen LC, et al. <em>Chestnut’s Obstetric Anesthesia: Principles and Practice</em>. 6th ed. Elsevier; 2020. (Neuraxial Blockade &amp; Pregnancy Dose Reduction).
          </li>
          <li>
            Hadzic A (Ed.). <em>NYSORA Textbook of Regional Anesthesia and Acute Pain Management</em>. 2nd ed. McGraw-Hill; 2017; &amp; Barash PG, et al. <em>Clinical Anesthesia</em>. 9th ed. Wolters Kluwer; 2023. (Paramedian Approach, Obesity, Elderly &amp; Spinal Deformities).
          </li>
        </ol>
      </div>
    </div>
  );
};
