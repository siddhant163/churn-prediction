
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';
import { TrendingDown, Users, DollarSign, AlertTriangle } from 'lucide-react';
import { mockCustomers } from '../utils/mockData';

const Dashboard = () => {
  const totalCustomers = mockCustomers.length;
  const churnedCount = mockCustomers.filter(c => c.churn).length;
  const churnRate = ((churnedCount / totalCustomers) * 100).toFixed(1);
  const avgMonthlyCharges = (mockCustomers.reduce((acc, c) => acc + c.monthlyCharges, 0) / totalCustomers).toFixed(2);
  
  // Data for charts
  const contractData = [
    { name: 'Month-to-month', value: mockCustomers.filter(c => c.contract === 'Month-to-month').length },
    { name: 'One year', value: mockCustomers.filter(c => c.contract === 'One year').length },
    { name: 'Two year', value: mockCustomers.filter(c => c.contract === 'Two year').length },
  ];

  const churnByService = [
    { name: 'DSL', churned: mockCustomers.filter(c => c.internetService === 'DSL' && c.churn).length },
    { name: 'Fiber optic', churned: mockCustomers.filter(c => c.internetService === 'Fiber optic' && c.churn).length },
    { name: 'No Service', churned: mockCustomers.filter(c => c.internetService === 'No' && c.churn).length },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Operational Overview</h2>
          <p className="text-slate-500 text-sm">Real-time customer retention monitoring</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Customers" value={totalCustomers.toString()} icon={Users} color="text-blue-600" bg="bg-blue-50" />
        <StatCard title="Churn Rate" value={`${churnRate}%`} icon={TrendingDown} color="text-red-600" bg="bg-red-50" />
        <StatCard title="Avg. Monthly Bill" value={`$${avgMonthlyCharges}`} icon={DollarSign} color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard title="High Risk Users" value="24" icon={AlertTriangle} color="text-amber-600" bg="bg-amber-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">Churn by Internet Service</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={churnByService}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="churned" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">Contract Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contractData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {contractData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {contractData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-sm text-slate-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color, bg }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-lg ${bg} ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
