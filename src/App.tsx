import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Predictor from './components/Predictor';
import CustomerList from './components/CustomerList';
import ModelMetrics from './components/ModelMetrics';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import { motion, AnimatePresence } from 'framer-motion';

import SettingsView from './components/SettingsView';

export default function App() {
  const [view, setView] = useState<'landing' | 'auth' | 'app'>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Persistent global user state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleStart = (mode: 'login' | 'register' = 'login') => {
    if (isLoggedIn) {
      setView('app');
    } else {
      setAuthMode(mode);
      setView('auth');
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setView('app');
  };

  const handleSSO = () => {
    setAuthMode('login');
    setView('auth');
    // Simulate SSO popup
    setTimeout(() => {
      setIsLoggedIn(true);
      setView('app');
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('landing');
  };

  const handleUpdateProfile = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
  };

  const handleLogoClick = () => {
    setView('landing');
  };

  const renderDashboardContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'predict': return <Predictor />;
      case 'customers': return <CustomerList />;
      case 'metrics': return <ModelMetrics />;
      case 'settings': return <SettingsView userName={userName} userEmail={userEmail} onUpdateProfile={handleUpdateProfile} onLogout={handleLogout} />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage 
              onStart={handleStart} 
              onLogoClick={handleLogoClick} 
              isLoggedIn={isLoggedIn}
              userName={userName}
            />
          </motion.div>
        )}

        {view === 'auth' && (
          <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Auth 
              onLogin={(name, email) => {
                setUserName(name || 'Alex Carter');
                setUserEmail(email || 'alex@company.com');
                handleLogin();
              }} 
              onBack={handleLogoClick} 
              onSSO={handleSSO}
              initialMode={authMode} 
            />
          </motion.div>
        )}

        {view === 'app' && (
          <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-screen">
            <Sidebar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              onLogoClick={handleLogoClick} 
              userName={userName} 
            />
            <main className="flex-1 ml-64 p-8 min-h-screen">
              <div className="max-w-6xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderDashboardContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
