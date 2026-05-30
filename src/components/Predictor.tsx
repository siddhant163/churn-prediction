
import React, { useState } from 'react';
import { predictChurn, Features } from '../utils/churnModel';
import { AlertCircle, CheckCircle, Info, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Predictor = () => {
  const [formData, setFormData] = useState<Features>({
    tenure: 12,
    monthlyCharges: 50,
    contract: 'Month-to-month',
    internetService: 'DSL',
    techSupport: 'No',
    paperlessBilling: true
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const prediction = predictChurn(formData);
      setResult(prediction);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Individual Customer Prediction</h2>
        <p className="text-slate-500 text-sm">Input customer attributes to calculate churn probability using our trained model.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <form onSubmit={handlePredict} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Tenure (months)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.tenure}
                  onChange={(e) => setFormData({ ...formData, tenure: parseInt(e.target.value) })}
                  min="0"
                  max="72"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Monthly Charges ($)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.monthlyCharges}
                  onChange={(e) => setFormData({ ...formData, monthlyCharges: parseInt(e.target.value) })}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Contract Type</label>
                <select
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.contract}
                  onChange={(e) => setFormData({ ...formData, contract: e.target.value })}
                >
                  <option value="Month-to-month">Month-to-month</option>
                  <option value="One year">One year</option>
                  <option value="Two year">Two year</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Internet Service</label>
                <select
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.internetService}
                  onChange={(e) => setFormData({ ...formData, internetService: e.target.value })}
                >
                  <option value="DSL">DSL</option>
                  <option value="Fiber optic">Fiber optic</option>
                  <option value="No">None</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Tech Support</label>
                <select
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.techSupport}
                  onChange={(e) => setFormData({ ...formData, techSupport: e.target.value })}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="flex items-center gap-2 h-full pt-6">
                <input
                  type="checkbox"
                  id="paperless"
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded"
                  checked={formData.paperlessBilling}
                  onChange={(e) => setFormData({ ...formData, paperlessBilling: e.target.checked })}
                />
                <label htmlFor="paperless" className="text-sm font-medium text-slate-700">Paperless Billing</label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <Sparkles size={18} />
                  Run Prediction
                </>
              )}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-6 rounded-xl border flex flex-col items-center text-center ${
                  result.churn ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                }`}
              >
                <div className={`p-4 rounded-full mb-4 ${result.churn ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                  {result.churn ? <AlertCircle size={48} /> : <CheckCircle size={48} />}
                </div>
                <h3 className={`text-xl font-bold ${result.churn ? 'text-red-900' : 'text-green-900'}`}>
                  {result.churn ? 'High Churn Risk' : 'Low Churn Risk'}
                </h3>
                <p className="text-3xl font-black my-4 text-slate-800">
                  {(result.probability * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-slate-600 mb-6">
                  {result.churn 
                    ? 'This customer is likely to leave within the next 3 months.' 
                    : 'This customer shows strong retention indicators.'}
                </p>
                <div className="w-full bg-white rounded-lg p-4 border border-slate-200 text-left">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Info size={12} /> Key Risk Factors
                  </div>
                  <ul className="text-sm space-y-1 text-slate-700">
                    {result.churn ? (
                      <>
                        {formData.contract === 'Month-to-month' && <li>• Month-to-month contract</li>}
                        {formData.internetService === 'Fiber optic' && <li>• Fiber optic high churn group</li>}
                        {formData.techSupport === 'No' && <li>• No technical support service</li>}
                      </>
                    ) : (
                      <li>• Favorable retention profile</li>
                    )}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <div className="h-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 text-center text-slate-400">
                <Sparkles size={40} className="mb-4 opacity-50" />
                <p>Fill out the form and run prediction to see results here.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Predictor;
