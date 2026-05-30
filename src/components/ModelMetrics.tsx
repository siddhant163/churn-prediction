
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Award, Target, Zap, Activity } from 'lucide-react';

const ModelMetrics = () => {
  const rocData = [
    { fpr: 0, tpr: 0 },
    { fpr: 0.1, tpr: 0.4 },
    { fpr: 0.2, tpr: 0.65 },
    { fpr: 0.3, tpr: 0.78 },
    { fpr: 0.4, tpr: 0.85 },
    { fpr: 0.5, tpr: 0.9 },
    { fpr: 0.7, tpr: 0.95 },
    { fpr: 1, tpr: 1 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Model Performance</h2>
          <p className="text-slate-500 text-sm">Evaluation metrics for the XGBoost classifier</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">XGBOOST V2.4</span>
          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">PROD</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricBox label="Accuracy" value="89.2%" sub="vs 87.5% baseline" icon={Award} />
        <MetricBox label="Precision" value="84.5%" sub="on churn class" icon={Target} />
        <MetricBox label="Recall" value="81.2%" sub="on churn class" icon={Zap} />
        <MetricBox label="F1 Score" value="0.828" sub="+0.04 from V2.3" icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 text-slate-800">ROC Curve</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rocData}>
                <defs>
                  <linearGradient id="colorTpr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="fpr" label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Area type="monotone" dataKey="tpr" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTpr)" />
                <Line type="monotone" dataKey={(v: any) => v.fpr} stroke="#94a3b8" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-slate-500 text-center italic">Area Under Curve (AUC): 0.884</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6 text-slate-800">Confusion Matrix</h3>
          <div className="grid grid-cols-2 gap-2 mt-8">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded flex flex-col items-center justify-center aspect-square">
              <span className="text-2xl font-bold text-blue-700">1240</span>
              <span className="text-xs text-blue-600 font-medium">True Negative</span>
            </div>
            <div className="p-4 bg-red-50 border border-red-100 rounded flex flex-col items-center justify-center aspect-square">
              <span className="text-2xl font-bold text-red-700">112</span>
              <span className="text-xs text-red-600 font-medium">False Positive</span>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded flex flex-col items-center justify-center aspect-square">
              <span className="text-2xl font-bold text-amber-700">89</span>
              <span className="text-xs text-amber-600 font-medium">False Negative</span>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded flex flex-col items-center justify-center aspect-square">
              <span className="text-2xl font-bold text-emerald-700">324</span>
              <span className="text-xs text-emerald-600 font-medium">True Positive</span>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <h4 className="text-sm font-semibold text-slate-700">Feature Importance (Top 3)</h4>
            <div className="space-y-3">
              <FeatureBar label="Contract Type" value={85} color="bg-blue-500" />
              <FeatureBar label="Monthly Charges" value={62} color="bg-blue-400" />
              <FeatureBar label="Tenure" value={54} color="bg-blue-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricBox = ({ label, value, sub, icon: Icon }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-2">
      <span className="text-sm text-slate-500 font-medium uppercase">{label}</span>
      <Icon size={18} className="text-blue-500" />
    </div>
    <div className="text-2xl font-bold text-slate-900">{value}</div>
    <div className="text-xs text-slate-400 mt-1">{sub}</div>
  </div>
);

const FeatureBar = ({ label, value, color }: any) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs font-medium">
      <span className="text-slate-600">{label}</span>
      <span className="text-slate-400">{value}%</span>
    </div>
    <div className="w-full bg-slate-100 rounded-full h-1.5">
      <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  </div>
);

const Line = ({ }: any) => null; // Mock for AreaChart line component if needed or just use Area

export default ModelMetrics;
