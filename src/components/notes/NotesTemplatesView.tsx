import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles, 
  HelpCircle,
  Stethoscope,
  Send
} from 'lucide-react';

export const NotesTemplatesView: React.FC = () => {
  const [templateType, setTemplateType] = useState<'soap' | 'sbar'>('soap');
  const [copied, setCopied] = useState(false);

  // SOAP State
  const [patientRoom, setPatientRoom] = useState('Oda 204');
  const [soapSubjective, setSoapSubjective] = useState('Hasta genel olarak rahat, geceyi ağrısız geçirdi. Bulantı ve kusması yok. Gaz ve gaita çıkışı mevcut.');
  const [soapVitalBp, setSoapVitalBp] = useState('125/80');
  const [soapVitalHr, setSoapVitalHr] = useState('76');
  const [soapVitalTemp, setSoapVitalTemp] = useState('36.7');
  const [soapVitalSpo2, setSoapVitalSpo2] = useState('98');
  const [soapObjectiveExam, setSoapObjectiveExam] = useState('Bilinç açık, koopere, oryante. Solunum sesleri bilateral doğal, ral/ronküs yok. Kalp ritmik, ek ses yok. Batın rahat, defans/rebound yok. Pretibial ödem -/-.');
  const [soapObjectiveLabs, setSoapObjectiveLabs] = useState('Hb: 13.2 g/dL, WBC: 7.8 x10³/µL, Plt: 220 x10³/µL, Kreatinin: 0.9 mg/dL, CRP: 4.2 mg/L.');
  const [soapAssessment, setSoapAssessment] = useState('Akut gastroenterit kliniği gerilemekte, oral alımı tolere ediyor, hemodinamik açıdan stabil.');
  const [soapPlan, setSoapPlan] = useState('1. Oral diyet ve hidrasyona devam.\n2. IV sıvı azaltılarak kesilecek.\n3. Sabah kontrol biyokimyası stabil ise taburculuk planlanacak.');

  // SBAR State
  const [sbarSituation, setSbarSituation] = useState('Oda 312, 68 yaşında erkek hasta, Toplum Kaynaklı Pnömoni tanısıyla serviste yatmakta.');
  const [sbarBackground, setSbarBackground] = useState('Bilinen KOAH ve HT mevcut. Penisilin alerjisi var. Servise yatışının 2. günü, Seftriakson 1x2g IV ve Levofloksasin almakta.');
  const [sbarAssessment, setSbarAssessment] = useState('Son vitalleri: TA: 130/85, Nabız: 84, Ateş: 37.8°C, SpO2: %94 (oda havasında). Sağ akciğer bazalinde krepitan raller devam ediyor.');
  const [sbarRecommendation, setSbarRecommendation] = useState('1. Gece ateş > 38.0°C olursa periferden 2 set kan kültürü alınıp Parasetamol 1g IV puşe yapılacak.\n2. SpO2 < %92 düşerse 2 L/dk nazal kanül O2 açılacak.\n3. Gece 02:00 kontrol vital bulguları alınacak.');

  const generateSoapText = () => {
    return `[VİZİT / POLİKLİNİK SOAP NOTU - ${patientRoom}]\n` +
      `Tarih: ${new Date().toLocaleDateString('tr-TR')}\n\n` +
      `S (SUBJEKTİF):\n${soapSubjective}\n\n` +
      `O (OBJEKTİF):\n` +
      `• Vitaller: TA: ${soapVitalBp} mmHg | Nabız: ${soapVitalHr}/dk | Ateş: ${soapVitalTemp}°C | SpO2: %${soapVitalSpo2}\n` +
      `• Fizik Muayene: ${soapObjectiveExam}\n` +
      `• Tetkikler: ${soapObjectiveLabs}\n\n` +
      `A (DEĞERLENDİRME):\n${soapAssessment}\n\n` +
      `P (PLAN):\n${soapPlan}\n`;
  };

  const generateSbarText = () => {
    return `[SBAR NÖBET DEVİR NOTU]\n` +
      `Tarih/Saat: ${new Date().toLocaleDateString('tr-TR')} - Nöbetçi Devri\n\n` +
      `S (SITUATION / DURUM):\n${sbarSituation}\n\n` +
      `B (BACKGROUND / ÖZGEÇMİŞ VE YATIŞ):\n${sbarBackground}\n\n` +
      `A (ASSESSMENT / MEVCUT BULGULAR):\n${sbarAssessment}\n\n` +
      `R (RECOMMENDATION / NÖBETTE YAPILACAKLAR & ÖNERİ):\n${sbarRecommendation}\n`;
  };

  const handleCopy = () => {
    const textToCopy = templateType === 'soap' ? generateSoapText() : generateSbarText();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">SOAP & SBAR Klinik Not Oluşturucu</h2>
          <p className="text-xs text-slate-500 mt-1">
            Uluslararası vizit notu (SOAP) ve nöbet devir protokolü (SBAR) formatında hazır klinik metin üretici
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors shadow-xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Panoya Kopyalandı' : 'Klinik Notu Kopyala'}</span>
          </button>
        </div>
      </div>

      {/* Segmented template selector */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTemplateType('soap')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
            templateType === 'soap'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>SOAP Vizit / Poliklinik Notu</span>
        </button>

        <button
          onClick={() => setTemplateType('sbar')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
            templateType === 'sbar'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>SBAR Nöbet Devir Formatı</span>
        </button>
      </div>

      {/* SOAP Editor */}
      {templateType === 'soap' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">SOAP Alanlarını Düzenleyin</h3>
              <input
                type="text"
                value={patientRoom}
                onChange={(e) => setPatientRoom(e.target.value)}
                placeholder="Oda / Hasta No"
                className="px-2.5 py-1 text-xs border border-slate-300 rounded font-medium text-slate-700 w-36 text-right focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            {/* S */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                S — Subjektif (Hastanın İfadeleri ve Anamnez)
              </label>
              <textarea
                rows={2}
                value={soapSubjective}
                onChange={(e) => setSoapSubjective(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
              />
            </div>

            {/* O: Vitals */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                O — Objektif (Vital Bulgular)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500">TA (mmHg)</span>
                  <input
                    type="text"
                    value={soapVitalBp}
                    onChange={(e) => setSoapVitalBp(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono tabular-nums"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">Nabız (/dk)</span>
                  <input
                    type="text"
                    value={soapVitalHr}
                    onChange={(e) => setSoapVitalHr(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono tabular-nums"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">Ateş (°C)</span>
                  <input
                    type="text"
                    value={soapVitalTemp}
                    onChange={(e) => setSoapVitalTemp(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono tabular-nums"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">SpO2 (%)</span>
                  <input
                    type="text"
                    value={soapVitalSpo2}
                    onChange={(e) => setSoapVitalSpo2(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono tabular-nums"
                  />
                </div>
              </div>
            </div>

            {/* O: Physical Exam */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                O — Fizik Muayene Bulguları
              </label>
              <textarea
                rows={2}
                value={soapObjectiveExam}
                onChange={(e) => setSoapObjectiveExam(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
              />
            </div>

            {/* O: Labs */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                O — Tetkikler ve Laboratuvar Sonuçları
              </label>
              <textarea
                rows={2}
                value={soapObjectiveLabs}
                onChange={(e) => setSoapObjectiveLabs(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 font-mono"
              />
            </div>

            {/* A */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                A — Değerlendirme & Klinik Gidişat (Assessment)
              </label>
              <textarea
                rows={2}
                value={soapAssessment}
                onChange={(e) => setSoapAssessment(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
              />
            </div>

            {/* P */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                P — Tedavi ve Takip Planı (Plan)
              </label>
              <textarea
                rows={3}
                value={soapPlan}
                onChange={(e) => setSoapPlan(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
              />
            </div>
          </div>

          {/* Real-time Preview */}
          <div className="lg:col-span-5 bg-slate-900 text-slate-100 rounded-xl p-5 shadow-xs font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400 text-[11px]">Canlı Metin Önizleme</span>
              <button
                onClick={handleCopy}
                className="text-teal-400 hover:text-teal-300 text-[11px] flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed font-mono text-[11px] text-slate-200">
              {generateSoapText()}
            </pre>
          </div>
        </div>
      )}

      {/* SBAR Editor */}
      {templateType === 'sbar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">SBAR Nöbet Devir Alanları</h3>
              <p className="text-[11px] text-slate-500">Nöbetçi hekime kritik bilgileri eksiksiz ve yapılandırılmış devredin.</p>
            </div>

            {/* S */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                S — Situation (Hastanın Tanıtımı & Yatış Sebebi)
              </label>
              <textarea
                rows={2}
                value={sbarSituation}
                onChange={(e) => setSbarSituation(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
              />
            </div>

            {/* B */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                B — Background (Özgeçmiş, İlaçlar, Alerjiler & Yatış Süresi)
              </label>
              <textarea
                rows={2}
                value={sbarBackground}
                onChange={(e) => setSbarBackground(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
              />
            </div>

            {/* A */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                A — Assessment (Son Durum, Vitaller & Dikkat Çeken Bulgular)
              </label>
              <textarea
                rows={2}
                value={sbarAssessment}
                onChange={(e) => setSbarAssessment(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
              />
            </div>

            {/* R */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                R — Recommendation (Nöbet Boyunca Yapılacaklar & Kritik Uyarılar)
              </label>
              <textarea
                rows={3}
                value={sbarRecommendation}
                onChange={(e) => setSbarRecommendation(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
              />
            </div>
          </div>

          {/* SBAR Preview */}
          <div className="lg:col-span-5 bg-slate-900 text-slate-100 rounded-xl p-5 shadow-xs font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400 text-[11px]">SBAR Devir Metni</span>
              <button
                onClick={handleCopy}
                className="text-teal-400 hover:text-teal-300 text-[11px] flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed font-mono text-[11px] text-slate-200">
              {generateSbarText()}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
