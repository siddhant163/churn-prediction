
import React from 'react';
import { Zap, Shield, BarChart3, Users, ArrowRight, CheckCircle2, PlayCircle } from 'lucide-react';

interface LandingPageProps {
  onStart: (mode?: 'login' | 'register') => void;
  onLogoClick: () => void;
  isLoggedIn?: boolean;
  userName?: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogoClick, isLoggedIn, userName }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <button onClick={onLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Zap className="text-white fill-white" size={24} />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">ChurnGuard AI</span>
            </button>
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
              {isLoggedIn ? (
                <button 
                  onClick={() => onStart('login')}
                  className="flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-100 transition-colors border border-blue-100"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {userName?.[0] || 'U'}
                  </div>
                  <span>Dashboard</span>
                </button>
              ) : (
                <>
                  <button onClick={() => onStart('login')} className="hover:text-blue-600 transition-colors">Log In</button>
                  <button 
                    onClick={() => onStart('register')}
                    className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
                  >
                    Sign Up Free
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New: XGBoost v2.4 Engine Now Live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
            Stop Churn Before <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">It Actually Happens</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
            Harness the power of machine learning to predict which customers are likely to leave. 
            Automate your retention strategy with 89% prediction accuracy.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onStart('register')}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-200"
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Get Started for Free'} <ArrowRight size={20} />
            </button>
            <a 
              href="#demo-video" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <PlayCircle size={20} /> Watch Demo
            </a>
          </div>

          {/* Video / Dashboard Interactive Preview */}
          <div id="demo-video" className="mt-20 relative max-w-5xl mx-auto scroll-mt-24">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-25" />
            <div className="relative bg-slate-950 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
              <div className="h-10 bg-slate-900 flex items-center justify-between px-4 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="bg-slate-950/60 px-4 py-1 rounded-full text-xs font-mono text-slate-400 border border-slate-800/80">
                  churnguard-inference-engine.mp4
                </div>
                <div className="w-12" /> {/* Spacer */}
              </div>

              {/* Native embedded stock video representing the AI analytics terminal */}
              <div className="relative aspect-video w-full bg-slate-950">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  controls
                  className="w-full h-full object-cover opacity-90"
                  poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070"
                >
                  {/* Providing directly hosted high speed video of code/dashboard analytics */}
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-41695-large.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-700/50 text-left pointer-events-none">
                  <div className="flex items-center gap-3">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <p className="text-xs text-slate-200 font-medium">Live System Architecture & High-Risk Anomaly Simulation</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">1080p60 AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to boost retention</h2>
            <p className="text-slate-600">Enterprise-grade tools for SaaS and Telecom companies.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={BarChart3} 
              title="Real-time Analytics" 
              desc="Monitor your churn rate, MRR, and CLV across different segments in one unified view."
            />
            <FeatureCard 
              icon={Shield} 
              title="Risk Scoring" 
              desc="Our ML model assigns a 0-100 risk score to every user based on behavior patterns."
            />
            <FeatureCard 
              icon={Users} 
              title="Cohort Analysis" 
              desc="Understand which specific groups are leaving and identify common pain points."
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">Trusted by high-growth product teams</h2>
              <div className="space-y-4">
                {[
                  "89% Average Prediction Accuracy",
                  "Reduced Churn by 15% within 3 months",
                  "Seamless API Integration with existing CRMs",
                  "Automatic re-training based on new data"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-blue-600" size={20} />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
                <div className="text-4xl font-black text-blue-600 mb-2">10M+</div>
                <div className="text-sm font-bold text-slate-500 uppercase">Customers Tracked</div>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
                <div className="text-4xl font-black text-indigo-600 mb-2">99%</div>
                <div className="text-sm font-bold text-slate-500 uppercase">Model Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Zap className="text-blue-400 fill-blue-400" size={24} />
              <span className="text-xl font-bold tracking-tight">ChurnGuard AI</span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2026 ChurnGuard Technologies. Built for modern analytics teams.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;
