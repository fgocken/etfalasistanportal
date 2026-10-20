import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PortalWorkspace } from './components/PortalWorkspace';

export default function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'portal'>('welcome');

  return (
    <div className="min-h-screen bg-slate-900 font-sans antialiased">
      {currentView === 'welcome' ? (
        <WelcomeScreen onProceed={() => setCurrentView('portal')} />
      ) : (
        <PortalWorkspace onBackToWelcome={() => setCurrentView('welcome')} />
      )}
    </div>
  );
}
