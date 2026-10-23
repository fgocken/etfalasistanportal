import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PortalWorkspace } from './components/PortalWorkspace';
import { DisclaimerView } from './components/DisclaimerView';

export default function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'portal' | 'disclaimer'>('welcome');
  const [previousView, setPreviousView] = useState<'welcome' | 'portal'>('welcome');

  // Theme state: defaults to dark or stored preference
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('etfal_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'dark';
    }
  });

  const isDark = theme === 'dark';

  useEffect(() => {
    try {
      localStorage.setItem('etfal_theme', theme);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme, isDark]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const openDisclaimer = () => {
    if (currentView !== 'disclaimer') {
      setPreviousView(currentView);
    }
    setCurrentView('disclaimer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeDisclaimer = () => {
    setCurrentView(previousView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen font-sans antialiased selection:bg-teal-500 selection:text-slate-950 relative overflow-x-hidden ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Vercel Web Analytics */}
      <Analytics />

      {/* Background Institutional Watermark (Şişli Etfal 1899 Emblem) */}
      <div 
        aria-hidden="true" 
        className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden select-none"
      >
        <img
          src="/assets/aistudio/sisli-etfal-logo-png_seeklogo-246491_e70206cc.png"
          alt=""
          className={`w-[480px] sm:w-[620px] md:w-[740px] max-w-[85vw] max-h-[85vh] object-contain transition-all duration-300 pointer-events-none ${
            isDark 
              ? 'opacity-[0.038] invert brightness-200 contrast-125' 
              : 'opacity-[0.045] grayscale contrast-125'
          }`}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {currentView === 'welcome' && (
          <WelcomeScreen
            onProceed={() => setCurrentView('portal')}
            onOpenDisclaimer={openDisclaimer}
            isDark={isDark}
            onToggleTheme={toggleTheme}
          />
        )}

        {currentView === 'portal' && (
          <PortalWorkspace
            onBackToWelcome={() => setCurrentView('welcome')}
            onOpenDisclaimer={openDisclaimer}
            isDark={isDark}
            onToggleTheme={toggleTheme}
          />
        )}

        {currentView === 'disclaimer' && (
          <DisclaimerView
            onBack={closeDisclaimer}
            isDark={isDark}
            onToggleTheme={toggleTheme}
          />
        )}
      </div>
      <Analytics />
    </div>
  );
}
