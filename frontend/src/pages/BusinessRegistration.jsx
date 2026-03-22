import { useState } from 'react';
import api from '../api';
import { Key } from 'lucide-react';

export default function BusinessRegistration() {
  const [form, setForm] = useState({ business_name: '', email: '' });
  const [apiKey, setApiKey] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/business/register', form);
      setApiKey(res.data.api_key);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl">
      <div className="text-center mb-8">
        <Key className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Fintech Sandbox</h2>
        <p className="text-slate-400 mt-2 text-sm">Register your business to get an API Key for verifying freelancer tokens.</p>
      </div>

      {!apiKey ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-400 text-sm bg-red-900/30 p-3 rounded-lg">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Business Name</label>
            <input 
              type="text" required 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              value={form.business_name} 
              onChange={e => setForm({...form, business_name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Company Email</label>
            <input 
              type="email" required 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              value={form.email} 
              onChange={e => setForm({...form, email: e.target.value})}
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors mt-6">
            Generate API Key
          </button>
        </form>
      ) : (
        <div className="text-center space-y-6">
          <div className="bg-emerald-900/30 text-emerald-400 p-4 rounded-xl border border-emerald-800">
            Success! Here is your Sandbox API Key.
          </div>
          <div className="bg-slate-900 p-4 rounded-xl font-mono text-sm break-all border border-slate-700 select-all">
            {apiKey}
          </div>
          <p className="text-sm text-yellow-500">Copy this key now. You will not be able to see it again.</p>
        </div>
      )}
    </div>
  );
}
