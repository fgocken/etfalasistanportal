import React, { useState } from 'react';
import { Lock, Unlock, KeyRound, AlertCircle, Eye, EyeOff, X } from 'lucide-react';
import { verifyRosterAdminPassword, setRosterAdminUnlocked } from './DutyRosterService';
import { signInAdminWithGoogle } from '../../firebase';

interface RosterAdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  isDark: boolean;
  actionTitle?: string;
  actionDescription?: string;
}

export const RosterAdminAuthModal: React.FC<RosterAdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  isDark,
  actionTitle = 'Yönetici Doğrulaması',
  actionDescription = 'Nöbet yüklemek veya hekim nöbet değişimi yapmak için lütfen klinik admin şifresini giriniz veya Google ile giriş yapınız.'
}) => {
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsVerifying(true);
    setErrorMessage('');
    try {
      const user = await signInAdminWithGoogle();
      if (user) {
        setRosterAdminUnlocked(true);
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      console.warn('Google sign-in error:', err);
      if (err?.code !== 'auth/popup-closed-by-user') {
        setErrorMessage('Google yetkilendirmesi tamamlanamadı. Şifreyle giriş yapabilirsiniz.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;

    setIsVerifying(true);
    setErrorMessage('');

    try {
      const isValid = await verifyRosterAdminPassword(passwordInput.trim());
      if (isValid) {
        setRosterAdminUnlocked(true);
        setPasswordInput('');
        onSuccess();
        onClose();
      } else {
        setErrorMessage('Hatalı admin şifresi girdiniz. Lütfen tekrar deneyiniz.');
      }
    } catch {
      setErrorMessage('Doğrulama esnasında bir hata oluştu.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-sm rounded-2xl border p-5 sm:p-6 shadow-2xl space-y-4 transition-all ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDark ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-800'
            }`}>
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">
                {actionTitle}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Klinik Nöbet Yönetimi
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          {actionDescription}
        </p>

        {/* Google Authentication Button */}
        <div className="pt-1">
          <button
            type="button"
            disabled={isVerifying}
            onClick={handleGoogleSignIn}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white' 
                : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800'
            }`}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Google ile Yetkili Girişi (Bulut Eşitleme)</span>
          </button>

          <div className="flex items-center gap-2 my-3">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">veya şifreyle</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Admin Şifresi
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
                placeholder="Admin şifresini giriniz..."
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

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isVerifying || !passwordInput.trim()}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isVerifying || !passwordInput.trim()
                  ? 'bg-slate-400 dark:bg-slate-700 text-slate-200 cursor-not-allowed opacity-60'
                  : 'bg-teal-600 hover:bg-teal-500 text-white'
              }`}
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>{isVerifying ? 'Doğrulanıyor...' : 'Doğrula'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
