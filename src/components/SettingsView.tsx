
import React, { useState } from 'react';
import { User, Lock, Bell, Shield, Sparkles, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface SettingsViewProps {
  userName: string;
  userEmail: string;
  onUpdateProfile: (name: string, email: string) => void;
  onLogout: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ userName, userEmail, onUpdateProfile, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'api'>('profile');
  
  // Profile State
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [saved, setSaved] = useState(false);

  // OTP Verification State for Password Change
  const [mobileNo, setMobileNo] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);

  // 2FA TOTP State
  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [show2faSetup, setShow2faSetup] = useState(false);
  const [totpInput, setTotpInput] = useState('');

  const handleSendOtp = () => {
    setIsOtpSending(true);
    setTimeout(() => {
      setIsOtpSending(false);
      setOtpSent(true);
      // alert code if needed but banner handles it
    }, 1200);
  };

  const handleVerifyOtp = () => {
    setIsOtpVerifying(true);
    setTimeout(() => {
      setIsOtpVerifying(false);
      if (otp === '123456' || otp.length === 6) {
        setOtpVerified(true);
      }
    }, 1000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(name, email);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Account Settings</h2>
        <p className="text-slate-500 text-sm">Manage your personal profile, workspace integrations, and security preferences.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 bg-slate-50 p-4 border-b md:border-b-0 md:border-r border-slate-200 space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'profile' ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User size={18} /> Profile
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'security' ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Lock size={18} /> Security
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'notifications' ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Bell size={18} /> Notifications
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'api' ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles size={18} /> Integrations & API
          </button>

          <div className="pt-6 mt-6 border-t border-slate-200">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-8">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Display Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="name@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Role</label>
                  <input
                    type="text"
                    disabled
                    value="Administrator (Primary)"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div className="pt-4 flex items-center gap-4">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  {saved && (
                    <span className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5 animate-fade-in">
                      <Check size={16} /> Profile updated successfully
                    </span>
                  )}
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Security Preferences</h3>
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-xl p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-slate-800">Two-Factor Authentication (2FA)</h4>
                      <p className="text-xs text-slate-500">Secure your account with TOTP (Google Authenticator / Authy)</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => {
                        if (is2faEnabled) {
                          if (confirm("Are you sure you want to disable Two-Factor Authentication?")) {
                            setIs2faEnabled(false);
                            setShow2faSetup(false);
                          }
                        } else {
                          setShow2faSetup(true);
                        }
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                        is2faEnabled 
                          ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      {is2faEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                    </button>
                  </div>

                  {show2faSetup && !is2faEnabled && (
                    <div className="pt-4 border-t border-slate-200 space-y-4 animate-fade-in">
                      <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                        {/* QR Code Simulation */}
                        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center">
                          <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/ChurnGuardAI:alex@company.com?secret=JBSWY3DPEHPK3PXP&issuer=ChurnGuardAI" 
                            alt="2FA QR Code"
                            className="w-32 h-32"
                          />
                          <span className="text-[10px] text-slate-400 mt-1 font-mono">Scan with Auth App</span>
                        </div>
                        
                        <div className="space-y-2 flex-1">
                          <h5 className="text-sm font-bold text-slate-800">1. Scan the QR Code</h5>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Open Google Authenticator, Authy, or 1Password and scan the QR code to the left. If you can't scan, manually enter this setup key:
                          </p>
                          <div className="bg-white px-3 py-1.5 rounded border border-slate-200 font-mono text-xs text-slate-700 select-all tracking-wider">
                            JBSW Y3DP EHPK 3PXP
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-sm font-bold text-slate-800">2. Verify the 6-Digit Code</h5>
                        <p className="text-xs text-slate-500">Enter the current 6-digit code generated by your app to complete setup.</p>
                        <div className="flex gap-2 max-w-xs">
                          <input 
                            type="text" 
                            maxLength={6}
                            value={totpInput}
                            onChange={(e) => setTotpInput(e.target.value)}
                            placeholder="••••••" 
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm tracking-widest font-mono text-center outline-none focus:ring-2 focus:ring-blue-500" 
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              if (totpInput.length === 6) {
                                setIs2faEnabled(true);
                                setShow2faSetup(false);
                                setTotpInput("");
                              } else {
                                alert("Please enter a valid 6-digit authenticator code.");
                              }
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
                          >
                            Verify
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {is2faEnabled && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
                      <Check size={14} /> Two-Factor Authentication is Active
                    </div>
                  )}
                </div>

                <div className="border border-slate-200 rounded-xl p-4 space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-800">Change Password with OTP Verification</h4>
                    <p className="text-xs text-slate-500">For security, changing your password requires verifying your identity via mobile OTP.</p>
                  </div>

                  {!otpSent ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Registered Mobile Number</label>
                        <div className="flex gap-2">
                          <span className="inline-flex items-center px-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-500 text-sm">
                            +1
                          </span>
                          <input 
                            type="tel" 
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                            placeholder="(555) 019-2834" 
                            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                          />
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={handleSendOtp}
                        disabled={!mobileNo || isOtpSending}
                        className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {isOtpSending ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : null}
                        Send OTP to Mobile
                      </button>
                    </div>
                  ) : !otpVerified ? (
                    <div className="space-y-3 animate-fade-in bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                      <div className="flex justify-between items-center">
                        <label className="block text-xs font-semibold text-blue-900">Enter 6-Digit OTP</label>
                        <span className="text-xs text-slate-500">Sent to +1 {mobileNo}</span>
                      </div>
                      <input 
                        type="text" 
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="••••••" 
                        className="w-full px-4 py-2 border border-blue-200 rounded-lg text-sm tracking-widest font-mono text-center outline-none focus:ring-2 focus:ring-blue-500 bg-white" 
                      />
                      <div className="flex gap-2">
                        <button 
                          type="button"
                          onClick={handleVerifyOtp}
                          disabled={otp.length !== 6 || isOtpVerifying}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isOtpVerifying ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : null}
                          Verify OTP
                        </button>
                        <button 
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50"
                        >
                          Change Number
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 animate-fade-in">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
                        <Check size={14} /> Identity Verified via OTP
                      </div>
                      
                      <div className="space-y-2.5 pt-2">
                        <input type="password" placeholder="Current Password" className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                        <input type="password" placeholder="New Password" className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                        <input type="password" placeholder="Confirm New Password" className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>

                      <button 
                        type="button"
                        onClick={() => {
                          alert("Password updated successfully!");
                          setOtpSent(false);
                          setOtpVerified(false);
                          setOtp("");
                        }}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors"
                      >
                        Securely Update Password
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Notification Channels</h3>
              <div className="space-y-4">
                {[
                  { title: "High Churn Alerts", desc: "Get an immediate email when a VIP client's risk score exceeds 80%" },
                  { title: "Weekly Model Digest", desc: "Receive automated retraining summaries and performance accuracy reports" },
                  { title: "New Feature Announcements", desc: "Stay updated on the latest ChurnGuard AI modules and engine updates" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg">
                    <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300" />
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'api' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">API Access & Keys</h3>
              <p className="text-sm text-slate-500">Connect your internal databases directly to the ChurnGuard live inference engine.</p>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-bold uppercase">Production Secret Key</span>
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <Shield size={12} /> Live
                    </span>
                  </div>
                  <div className="bg-slate-800 p-2.5 rounded font-mono text-xs text-slate-300 break-all select-all">
                    cg_prod_984f2b1a8c9e0d3f4a2b1c0e9d8f7a6b
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4">
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Webhook Endpoints</h4>
                  <p className="text-xs text-slate-500 mb-3">Send event payloads when an account is marked as churned.</p>
                  <input 
                    type="url" 
                    placeholder="https://api.yourcompany.com/v1/churn-webhook" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                  <button className="mt-3 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-bold transition-colors">
                    Save Endpoint
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
