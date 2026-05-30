
import React from 'react';
import { LayoutDashboard, Users, Zap, BarChart3, Settings, HelpCircle } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogoClick: () => void;
  userName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogoClick, userName = 'John Doe' }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'predict', icon: Zap, label: 'Predict Churn' },
    { id: 'customers', icon: Users, label: 'Customer Base' },
    { id: 'metrics', icon: BarChart3, label: 'Model Metrics' },
  ];

  return (
    <div className="w-64 bg-slate-900 h-screen text-white flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-slate-800">
        <button 
          onClick={onLogoClick}
          className="text-xl font-bold flex items-center gap-2 hover:text-blue-400 transition-colors"
        >
          <Zap className="text-blue-400 fill-blue-400" />
          <span>ChurnGuard AI</span>
        </button>
        <p className="text-xs text-slate-400 mt-1">Telecom Analytics Suite</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-4">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold ring-2 ring-slate-700">
            {userName[0].toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">{userName}</p>
            <p className="text-xs text-slate-500 truncate">Admin Profile</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
              activeTab === 'settings' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors text-sm">
            <HelpCircle size={18} />
            <span>Documentation</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
