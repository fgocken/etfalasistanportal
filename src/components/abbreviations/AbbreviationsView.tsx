import React, { useState } from 'react';
import { 
  BookMarked, 
  Search, 
  Stethoscope, 
  CheckCircle, 
  Heart, 
  Activity, 
  Brain, 
  Eye 
} from 'lucide-react';
import { MEDICAL_ABBREVIATIONS } from '../../data/clinicalData';

export const AbbreviationsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'abbr' | 'exam'>('abbr');

  const filteredAbbr = MEDICAL_ABBREVIATIONS.filter(a => 
    a.abbr.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const examSections = [
    {
      title: '1. Genel Durum & Hayati Bulgular',
      icon: Activity,
      items: [
        'Bilinç durumu: Açık, letarjik, stupor veya koma (GKS değerlendirmesi)',
        'Oryantasyon: Kişi, yer, zaman oryantasyonu tam mı?',
        'Kooperasyon: Muayene ve komutlara uyum',
        'Vitaller: Kan basıncı, nabız hızı ve ritmi, vücut sıcaklığı, solunum sayısı, SpO2'
      ]
    },
    {
      title: '2. Baş - Boyun Muayenesi',
      icon: Eye,
      items: [
        'Konjonktivalar: Solukluk (anemi bulgusu) veya sarılık/ikter (hiperbilirubinemi)',
        'Pupiller: İzokorik / Anizokorik, Direkt ve indirekt ışık refleksi (DİR/İİR)',
        'Ağız boşluğu: Mukozaların hidrasyon durumu, siyanoz, orofarenks hiperemisi',
        'Boyun venöz dolgunluğu (JVD): 45 derecelik açıda venöz pulsasyon ve basınç artışı',
        'Tiroid bezi palpasyonu ve lenf nodu muayenesi (submental, servikal, supraklaviküler)'
      ]
    },
    {
      title: '3. Solunum Sistemi Muayenesi',
      icon: Stethoscope,
      items: [
        'İnspeksiyon: Solunum paterni (takipne, Cheyne-Stokes, Kussmaul), yardımcı solunum kasları kullanımı',
        'Palpasyon: Göğüs kafesi ekspansiyonu simetrik mi? Vokal fremitus',
        'Perküsyon: Sonor ses (normal), matite (plevral efüzyon / konsolidasyon), hipersonorite (pnömotoraks)',
        'Oskültasyon: Veziküler solunum sesleri, ek sesler (krepitan ral, ronküs, sibilan wheezing, stridor)'
      ]
    },
    {
      title: '4. Kardiyovasküler Muayene',
      icon: Heart,
      items: [
        'Oskültasyon: S1 ve S2 sesleri net ve ritmik mi? Ek ses (S3 - volüm yükü / S4 - kompliyans azalması)',
        'Üfürüm (Murmur): Sistolik vs Diyastolik üfürüm, şiddeti (1/6 - 6/6), odakları (Aort, Pulmoner, Triküspit, Mitral) ve yayılımı',
        'Periferik nabızlar: Radyal, femoral, popliteal, dorsalis pedis ve tibialis posterior nabız dolgunluğu',
        'Periferik ödem: Pretibial gode bırakan ödem kontrolü (+1 ile +4 arası)'
      ]
    },
    {
      title: '5. Batın (Karın) Muayenesi',
      icon: Stethoscope,
      items: [
        'İnspeksiyon: Karın distansiyonu, cerrahi skar, caput medusae',
        'Oskültasyon (Palpasyondan ÖNCE yapılır!): Barsak sesleri (normoaktif, hipoaktif, hiperaktif, metalik ses)',
        'Palpasyon: Yüzeyel ve derin palpasyon; Hassasiyet, Defans (istemsiz kas sertliği) ve Rebound (akut batın/peritonit şüphesi)',
        'Organomegali: Hepatomegali (karaciğer kot altı cm), Splenomegali (Traube alanı)',
        'Özel testler: Murphy belirtisi (akut kolesistit), McBurney hassasiyeti ve Rovsing (akut apandisit)'
      ]
    },
    {
      title: '6. Nörolojik Muayene',
      icon: Brain,
      items: [
        'Kraniyal sinir muayenesi (I - XII özet taraması)',
        'Kas gücü: Üst ve alt ekstremite proksimal/distal kas gücü (0/5 ile 5/5)',
        'Derin tendon refleksleri (DTR): Patella, Aşil, Biseps refleksleri (hipoaktif/hiperaktif)',
        'Patolojik refleksler: Babinski yanıtı (fleksör vs ekstansör/pozitif)',
        'Meningeal irritasyon: Ense sertliği, Kernig ve Brudzinski belirtisi'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Klinik Kısaltmalar & Fizik Muayene Rehberi</h2>
          <p className="text-xs text-slate-500 mt-1">
            Hasta dosyalarında, vizitlerde ve reçetelerde sık karşılaşılan kısaltmalar ve sistematik fizik bakı listesi
          </p>
        </div>
      </div>

      {/* Segmented Selector */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('abbr')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'abbr'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <BookMarked className="w-3.5 h-3.5" />
          <span>Tıbbi Kısaltmalar Sözlüğü</span>
        </button>

        <button
          onClick={() => setActiveTab('exam')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'exam'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5" />
          <span>Sistematik Fizik Muayene Şablonu</span>
        </button>
      </div>

      {/* 1. Abbreviations */}
      {activeTab === 'abbr' && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Kısaltma veya açıklama ara (örn: GFR, DVT, SOAP)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredAbbr.map(a => (
              <div 
                key={a.abbr}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors shadow-xs"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-base font-bold text-teal-900">
                    {a.abbr}
                  </span>
                  <span className="text-xs font-semibold text-slate-800">
                    — {a.meaning}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {a.description}
                </p>
              </div>
            ))}

            {filteredAbbr.length === 0 && (
              <div className="col-span-full py-12 text-center text-xs text-slate-400">
                "{searchQuery}" ile eşleşen kısaltma bulunamadı.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Physical Examination Checklist */}
      {activeTab === 'exam' && (
        <div className="space-y-4">
          <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-200/70 text-xs text-teal-900">
            <strong>İntern Hekim Pratik Kuralı:</strong> Vizit öncesi fizik muayene yaparken hastanın baş ucundan ayak ucuna doğru ("Cephalo-caudal") sistematik ilerlemek hiçbir bulgunun atlanmamasını sağlar.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examSections.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div key={idx} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Icon className="w-4 h-4 text-teal-700" />
                    <h3 className="text-sm font-bold text-slate-900">{sec.title}</h3>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-700">
                    {sec.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
