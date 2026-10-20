import React from 'react';
import { ArrowLeft, ShieldAlert, AlertTriangle, Stethoscope, Scale } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface DisclaimerViewProps {
  onBack: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const DisclaimerView: React.FC<DisclaimerViewProps> = ({ onBack, isDark, onToggleTheme }) => {
  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 bg-transparent ${
      isDark ? 'text-slate-100' : 'text-slate-900'
    }`}>
      {/* Top Bar */}
      <header className={`border-b sticky top-0 z-30 transition-colors ${
        isDark ? 'border-slate-800 bg-slate-900/90 backdrop-blur' : 'border-slate-200 bg-white/95 backdrop-blur'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              isDark 
                ? 'text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800' 
                : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-teal-500" />
            <span>Geri Dön</span>
          </button>

          {/* Top-Right: Notification label & ThemeToggle */}
          <div className="flex items-center gap-3">
            <span className={`text-xs font-mono hidden sm:inline ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Hukuki & Tıbbi Bildirim
            </span>
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Header Title */}
        <div className={`space-y-3 border-b pb-6 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
            isDark 
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' 
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            <Scale className="w-3.5 h-3.5" />
            <span>Tıbbi ve Hukuki Sorumluluk Reddi Beyanı</span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Tıbbi Sorumluluk Reddi (Medical Disclaimer)
          </h1>
          <p className={`text-xs sm:text-sm font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Son Güncelleme: 20 Ekim 2026 · Şişli Hamidiye Etfal EAH Anestezi ve Reanimasyon Asistan Portalı
          </p>
        </div>

        {/* Highlight Alert Box */}
        <div className={`p-5 rounded-xl border text-xs sm:text-sm leading-relaxed flex items-start gap-3 transition-colors ${
          isDark 
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' 
            : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}>
          <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
          <div className="space-y-2">
            <div>
              <strong>Önemli Klinik Uyarı:</strong> Bu web portalında sunulan tüm içerikler, hesaplayıcılar, formüller, ilaç dozajları ve akış şemaları;
            </div>
            <div>
              Hiçbir koşulda doğrudan bir asistan hekimin veya uzman hekimin klinik muhakemesinin, hasta başı fizik muayenesinin ve resmi hastane kılavuzlarının yerine geçemez.
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className={`space-y-6 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          {/* Section 1 */}
          <section className={`p-6 rounded-xl border space-y-2.5 transition-colors ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <h2 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Stethoscope className="w-4 h-4 text-teal-500" />
              1. Hekim Bağımsızlığı ve Nihai Klinik Karar
            </h2>
            <p>
              Tıp dinamik ve hızla değişen bir bilim dalıdır. Her hasta; genetik yapısı, komorbiditeleri, organ fonksiyonları, alerji geçmişi ve hemodinamik durumu bakımından kendine özgüdür. Bu portalda yer alan hesaplama sonuçları ve kılavuz bilgileri standart yetişkin ve genel popülasyon parametrelerine dayanmaktadır.
            </p>
            <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
              Uygulamayı kullanan asistan, stajyer veya uzman hekim; hastaya uygulayacağı herhangi bir medikal indüksiyon, invaziv girişim, mekanik ventilatör modu veya ilaç uygulamasında nihai klinik kararı kendi mesleki bilgi, tecrübe ve sorumlu uzman hekim onayı ile vermekle yükümlüdür.
            </p>
          </section>

          {/* Section 2 */}
          <section className={`p-6 rounded-xl border space-y-2.5 transition-colors ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <h2 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <ShieldAlert className="w-4 h-4 text-teal-500" />
              2. Kurumsal Protokollerin Önceliği
            </h2>
            <p>
              Bu portal, T.C. Sağlık Bakanlığı, Şişli Hamidiye Etfal EAH Başhekimliği veya Anesteziyoloji ve Reanimasyon Kliniği İdari Birimi’nin resmi bir yasal mevzuatı veya mecburi klinik algoritması değildir. Kurumun resmi klinik protokolleri, acil eylem planları (Mavi Kod, Beyaz Kod vb.) ve anabilim dalı yazılı yönergeleri her zaman önceliklidir ve bağlayıcıdır.
            </p>
          </section>

          {/* Section 3 */}
          <section className={`p-6 rounded-xl border space-y-2.5 transition-colors ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <h2 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Scale className="w-4 h-4 text-teal-500" />
              3. Sorumluluk Sınırlaması (Limitation of Liability)
            </h2>
            <p>
              Geliştiriciler ve katkıda bulunanlar; sistemdeki herhangi bir bilginin güncelliğini kaybetmesi, olası tipografik yazım hataları, formül hesaplama uyuşmazlıkları veya yazılımın kesintiye uğramasından dolayı meydana gelebilecek doğrudan, dolaylı veya netice kabilinden doğan hiçbir maddi/manevi zarardan veya tıbbi komplikasyondan hukuki veya cezai olarak sorumlu tutulamaz.
            </p>
          </section>
        </div>

        {/* Back Button Action */}
        <div className={`pt-6 border-t flex justify-center ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <button
            onClick={onBack}
            className={`px-8 py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-lg ${
              isDark
                ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/10'
                : 'bg-teal-700 hover:bg-teal-800 text-white shadow-teal-700/15'
            }`}
          >
            Okudum, Anladım ve Kabul Ediyorum
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t py-6 text-center text-xs transition-colors ${
        isDark ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-500'
      }`}>
        Şişli Hamidiye Etfal EAH · Anestezi ve Reanimasyon Asistan Portalı
      </footer>
    </div>
  );
};
