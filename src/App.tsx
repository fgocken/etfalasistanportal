import React, { useState, useEffect } from 'react';
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
    <div className={`min-h-screen font-sans antialiased selection:bg-teal-500 selection:text-slate-950 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
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
  );
}
