
import React, { useState } from 'react';
import { Zap, Mail, Lock, User, ArrowRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuthProps {
  onLogin: (name?: string, email?: string) => void;
  onBack: () => void;
  onSSO: () => void;
  initialMode?: 'login' | 'register';
}

const Auth: React.FC<AuthProps> = ({ onLogin, onBack, onSSO, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [ssoLoading, setSsoLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(name || (mode === 'login' ? 'Alex Carter' : 'New User'), email || 'alex@company.com');
    }, 1500);
  };

  const handleSSOClick = () => {
    setSsoLoading(true);
    setTimeout(() => {
      setSsoLoading(false);
      onSSO();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-60" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8 relative z-10"
      >
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 group"
        >
          <Zap className="text-blue-600 fill-blue-600" size={20} />
          <span className="font-bold text-slate-900">ChurnGuard AI</span>
        </button>

        <h2 className="text-3xl font-black text-slate-900 mb-2">
          {mode === 'login' ? 'Welcome back' : 'Create an account'}
        </h2>
        <p className="text-slate-500 mb-8">
          {mode === 'login' ? 'Enter your credentials to access your dashboard.' : 'Start your 14-day free trial today.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                  placeholder="Alex Carter"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                placeholder="alex@company.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              {mode === 'login' && (
                <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Forgot password?</button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                required
                type="password" 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-slate-200 mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {mode === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Or continue with</span>
            </div>
          </div>

          <button 
            type="button"
            onClick={handleSSOClick}
            disabled={ssoLoading}
            className="w-full py-3 border border-slate-200 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            {ssoLoading ? (
              <div className="w-5 h-5 border-2 border-slate-400 border-t-slate-900 rounded-full animate-spin" />
            ) : (
              <>
                <Globe size={20} />
                Continue with SSO
              </>
            )}
          </button>
        </div>

        <p className="mt-8 text-center text-slate-600 text-sm">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="font-bold text-blue-600 hover:text-blue-700"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
