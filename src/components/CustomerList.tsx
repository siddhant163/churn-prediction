
import { mockCustomers } from '../utils/mockData';
import { Search, Filter } from 'lucide-react';

const CustomerList = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Customer Records</h2>
          <p className="text-slate-500 text-sm">Managing {mockCustomers.length} active records</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search customers..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Customer</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Tenure</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Contract</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Monthly Charges</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Service</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockCustomers.slice(0, 15).map((customer) => (
              <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{customer.name}</div>
                  <div className="text-xs text-slate-500">{customer.id}</div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{customer.tenure} months</td>
                <td className="px-6 py-4 text-sm text-slate-600">{customer.contract}</td>
                <td className="px-6 py-4 text-sm text-slate-600">${customer.monthlyCharges}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    customer.internetService === 'Fiber optic' ? 'bg-purple-100 text-purple-700' : 
                    customer.internetService === 'DSL' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {customer.internetService}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    customer.churn ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {customer.churn ? 'CHURNED' : 'ACTIVE'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-sm text-slate-500">
          <span>Showing 15 of {mockCustomers.length} customers</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
