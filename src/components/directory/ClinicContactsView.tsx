import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Lock, 
  Unlock, 
  KeyRound, 
  Copy, 
  Check, 
  Info, 
  Building2, 
  Search, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ShieldCheck,
  PhoneCall
} from 'lucide-react';

interface ClinicContactsViewProps {
  isDark: boolean;
}

interface ExtensionItem {
  ext: string;
  name: string;
  campus: 'Seyrantepe' | 'Çayırbaşı';
  department?: string;
}

// Cryptographic SHA-256 Hash of the authorized clinic password
const AUTH_PASSWORD_SHA256 = '71fed7a7df769f823c717e5df6fbdfc80fe32f0944b628285a9c345d84f4cc31';
const STORAGE_AUTH_KEY = 'etfal_contacts_unlocked_session_v2';

async function computeSha256(text: string): Promise<string> {
  const enc = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', enc);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const SEYRANTEPE_EXTENSIONS: ExtensionItem[] = [
  { ext: '5390', name: 'MR', campus: 'Seyrantepe', department: 'Radyoloji' },
  { ext: '5404', name: 'Biyokimya Onay', campus: 'Seyrantepe', department: 'Laboratuvar' },
  { ext: '5408', name: 'Acil Biyokimya', campus: 'Seyrantepe', department: 'Acil Laboratuvar' },
  { ext: '5457', name: 'BT Randevu', campus: 'Seyrantepe', department: 'Radyoloji' },
  { ext: '2821', name: 'Eczane', campus: 'Seyrantepe', department: 'Klinik Eczacılık' },
  { ext: '5212', name: 'Kan Merkezi', campus: 'Seyrantepe', department: 'Transfüzyon Ünitesi' },
  { ext: '5432', name: 'Kırmızı Alan Doktor', campus: 'Seyrantepe', department: 'Acil Servis' },
  { ext: '5037', name: 'Portable', campus: 'Seyrantepe', department: 'Radyoloji & Görüntüleme' },
  { ext: '5477', name: '1. Alan YBÜ', campus: 'Seyrantepe', department: 'Yoğun Bakım' },
  { ext: '5414', name: '2. Alan YBÜ', campus: 'Seyrantepe', department: 'Yoğun Bakım' },
  { ext: '1187', name: 'Güvenlik', campus: 'Seyrantepe', department: 'Hastane Güvenlik' },
  { ext: '5115', name: 'Post-op YBÜ (Genel YBÜ)', campus: 'Seyrantepe', department: 'Anestezi & Reanimasyon' },
];

const CAYIRBASI_EXTENSIONS: ExtensionItem[] = [
  { ext: '6471', name: 'Postop YBÜ -1', campus: 'Çayırbaşı', department: 'Yoğun Bakım' },
];

export const ClinicContactsView: React.FC<ClinicContactsViewProps> = ({ isDark }) => {
  // Session-based authentication check
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [passwordInput, setPasswordInput] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedExt, setCopiedExt] = useState<string | null>(null);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;
    setIsVerifying(true);
    try {
      const hashedInput = await computeSha256(passwordInput.trim());
      if (hashedInput === AUTH_PASSWORD_SHA256) {
        setIsUnlocked(true);
        setErrorMessage('');
        setPasswordInput('');
        try {
          sessionStorage.setItem(STORAGE_AUTH_KEY, 'true');
        } catch (err) {
          console.error(err);
        }
      } else {
        setErrorMessage('Hatalı şifre girdiniz. Lütfen tekrar deneyiniz.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Doğrulama esnasında bir hata oluştu.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setPasswordInput('');
    setErrorMessage('');
    try {
      sessionStorage.removeItem(STORAGE_AUTH_KEY);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopy = (ext: string) => {
    navigator.clipboard.writeText(ext);
    setCopiedExt(ext);
    setTimeout(() => setCopiedExt(null), 2000);
  };

  // Filtered lists
  const filterList = (list: ExtensionItem[]) => {
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(item => 
      item.ext.includes(q) || 
      item.name.toLowerCase().includes(q) || 
      (item.department && item.department.toLowerCase().includes(q))
    );
  };

  const filteredSeyrantepe = filterList(SEYRANTEPE_EXTENSIONS);
  const filteredCayirbasi = filterList(CAYIRBASI_EXTENSIONS);

  // 1. Password Protection Gate (When not unlocked)
  if (!isUnlocked) {
    return (
      <div className={`rounded-xl border p-6 sm:p-10 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="max-w-md mx-auto text-center space-y-5">
          {/* Padlock Icon */}
          <div className="mx-auto w-14 h-14 rounded-2xl bg-teal-500/15 text-teal-500 flex items-center justify-center ring-8 ring-teal-500/5">
            <Lock className="w-7 h-7 stroke-[2]" />
          </div>

          <div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Klinik &amp; Ameliyathane Dahili Numaraları
            </h3>
            <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Bu bölüm kurumsal güvenlik gereği koruma altındadır. Dahili hat listesine erişmek için lütfen şifreyi giriniz.
            </p>
          </div>

          {/* Password Form */}
          <form onSubmit={handleUnlock} className="space-y-3.5 pt-2 text-left">
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Giriş Şifresi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Şifreyi giriniz..."
                  className={`w-full pl-9 pr-10 py-2.5 text-xs font-mono rounded-xl border focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="flex items-center gap-1.5 text-xs text-rose-500 dark:text-rose-400 font-medium pt-0.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying || !passwordInput.trim()}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isVerifying || !passwordInput.trim()
                  ? 'bg-slate-400 dark:bg-slate-700 text-slate-200 cursor-not-allowed opacity-60'
                  : 'bg-teal-600 hover:bg-teal-500 text-white'
              }`}
            >
              <Unlock className="w-4 h-4" />
              <span>{isVerifying ? 'Doğrulanıyor...' : 'Giriş Yap ve Numaraları Görüntüle'}</span>
            </button>
          </form>

          <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5 pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
            <span>Şişli Hamidiye Etfal EAH Dahili Ağ Protokolü</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Unlocked Contacts View
  return (
    <div className={`rounded-xl border p-6 space-y-6 transition-colors ${
      isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
    }`}>
      {/* Header */}
      <div className={`border-b pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
        isDark ? 'border-slate-800' : 'border-slate-100'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${
            isDark ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
          }`}>
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Klinik &amp; Ameliyathane Dahili Numaraları
              </h3>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                isDark ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                Oturum Açık
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Şişli Etfal EAH Seyrantepe ve Çayırbaşı yerleşkeleri kritik dahili telefon hatları
            </p>
          </div>
        </div>

        {/* Lock button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleLock}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' 
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
            }`}
            title="Bölümü Kilitle"
          >
            <Lock className="w-3.5 h-3.5 text-rose-500" />
            <span>Bölümü Kilitle</span>
          </button>
        </div>
      </div>

      {/* Genel Açıklamalar Bölümü (User Requested Exactly) */}
      <div className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 ${
        isDark 
          ? 'bg-gradient-to-r from-slate-900 via-slate-800/50 to-slate-900 border-indigo-500/30' 
          : 'bg-gradient-to-r from-indigo-50/70 via-white to-indigo-50/40 border-indigo-200 shadow-xs'
      }`}>
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
          <Info className="w-4 h-4 text-indigo-500 shrink-0" />
          <span>Genel Açıklamalar &amp; Çevirme Kuralları</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
            isDark ? 'bg-slate-800/60 border-slate-700 text-slate-200' : 'bg-white border-indigo-100 text-slate-800 shadow-xs'
          }`}>
            <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
            <p className="leading-relaxed">
              <strong>Çayırbaşından Seyrantepe iç hattan aranırken</strong> ilgili dahili numaranın <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">50</span> ekliyoruz.
            </p>
          </div>

          <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
            isDark ? 'bg-slate-800/60 border-slate-700 text-slate-200' : 'bg-white border-indigo-100 text-slate-800 shadow-xs'
          }`}>
            <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
            <p className="leading-relaxed">
              <strong>Çayırbaşından dış hat aranırken</strong> ilgili numara başına <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">90</span> ekliyoruz.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Dahili hat veya birim ara... (örn: YBÜ, MR, Biyokimya, Kan, 5390, 6471)"
          className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
            isDark ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
          }`}
        />
      </div>

      {/* 2 MAIN BLOCKS: Seyrantepe Dahili Hatlar & Çayırbaşı Dahili Hatlar */}
      <div className="space-y-8">
        
        {/* BLOK 1: SEYRANTEPE DAHİLİ HATLAR */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-2 dark:border-slate-800 border-slate-200">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-500" />
              <h4 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Seyrantepe Dahili Hatlar
              </h4>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                isDark ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-50 text-teal-800 border border-teal-200'
              }`}>
                Seyrantepe Yerleşkesi ({filteredSeyrantepe.length})
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
              Merkez Bina
            </span>
          </div>

          {filteredSeyrantepe.length === 0 ? (
            <div className="text-xs text-slate-400 py-4 text-center italic">
              Aramanıza uygun Seyrantepe dahili numarası bulunamadı.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredSeyrantepe.map((item) => {
                const isCopied = copiedExt === item.ext;
                return (
                  <div
                    key={item.ext}
                    onClick={() => handleCopy(item.ext)}
                    className={`group p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer select-none ${
                      isDark 
                        ? 'bg-slate-800/50 border-slate-800 hover:border-teal-500/40 hover:bg-slate-800' 
                        : 'bg-white border-slate-200 hover:border-teal-300 hover:shadow-xs'
                    }`}
                    title="Dahili numarayı kopyala"
                  >
                    <div className="space-y-0.5">
                      <div className={`text-xs font-bold leading-tight group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors ${
                        isDark ? 'text-slate-200' : 'text-slate-900'
                      }`}>
                        {item.name}
                      </div>
                      {item.department && (
                        <div className="text-[10px] text-slate-400">
                          {item.department}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pl-3">
                      <span className={`font-mono text-base font-bold tabular-nums tracking-wide ${
                        isDark ? 'text-teal-400' : 'text-teal-700'
                      }`}>
                        {item.ext}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item.ext);
                        }}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isCopied 
                            ? 'bg-emerald-500 text-white border-emerald-500' 
                            : isDark ? 'border-slate-700 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-500 hover:text-slate-900'
                        }`}
                        title="Kopyala"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* BLOK 2: ÇAYIRBAŞI DAHİLİ HATLAR */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-2 dark:border-slate-800 border-slate-200">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-500" />
              <h4 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Çayırbaşı Dahili Hatlar
              </h4>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                isDark ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}>
                Çayırbaşı Yerleşkesi ({filteredCayirbasi.length})
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
              Ek Hizmet Binası
            </span>
          </div>

          {filteredCayirbasi.length === 0 ? (
            <div className="text-xs text-slate-400 py-4 text-center italic">
              Aramanıza uygun Çayırbaşı dahili numarası bulunamadı.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredCayirbasi.map((item) => {
                const isCopied = copiedExt === item.ext;
                return (
                  <div
                    key={item.ext}
                    onClick={() => handleCopy(item.ext)}
                    className={`group p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer select-none ${
                      isDark 
                        ? 'bg-slate-800/50 border-slate-800 hover:border-amber-500/40 hover:bg-slate-800' 
                        : 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-xs'
                    }`}
                    title="Dahili numarayı kopyala"
                  >
                    <div className="space-y-0.5">
                      <div className={`text-xs font-bold leading-tight group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors ${
                        isDark ? 'text-slate-200' : 'text-slate-900'
                      }`}>
                        {item.name}
                      </div>
                      {item.department && (
                        <div className="text-[10px] text-slate-400">
                          {item.department}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pl-3">
                      <span className={`font-mono text-base font-bold tabular-nums tracking-wide ${
                        isDark ? 'text-amber-400' : 'text-amber-700'
                      }`}>
                        {item.ext}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item.ext);
                        }}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isCopied 
                            ? 'bg-emerald-500 text-white border-emerald-500' 
                            : isDark ? 'border-slate-700 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-500 hover:text-slate-900'
                        }`}
                        title="Kopyala"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
