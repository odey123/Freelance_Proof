import { useState } from 'react';
import api from '../api';
import { Search, ShieldAlert, ShieldCheck, Zap } from 'lucide-react';

export default function TokenVerifier() {
  const [apiKey, setApiKey] = useState('');
  const [token, setToken] = useState('');
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setReport(null);
    setLoading(true);
    try {
      const res = await api.post('/business/verify', { api_key: apiKey, token });
      setReport(res.data.report);
    } catch (err) {
      setError(err.response?.data?.error || 'Verification failed. Cryptographic signature invalid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 sm:mt-12 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-3xl mb-6 ring-1 ring-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <ShieldCheck className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-4xl font-black font-heading text-white">Compliance Portal</h2>
        <p className="text-slate-400 mt-4 text-lg max-w-xl mx-auto font-light">Paste a FreelanceProof Token to cryptographically verify a freelancer and access their legitimacy report instantly.</p>
      </div>

      <div className="bg-slate-900/60 shadow-2xl rounded-3xl p-8 sm:p-10 border border-slate-800 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-bl-full filter blur-3xl pointer-events-none"></div>
        <form onSubmit={handleVerify} className="space-y-8 relative z-10">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Fintech API Key</label>
              <input type="password" required placeholder="raenest_mock_key_123"
                className="w-full bg-slate-950/50 border border-slate-700/80 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600 shadow-inner"
                value={apiKey} onChange={e => setApiKey(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Freelancer Token (JWT)</label>
              <textarea required placeholder="eyJhbGci..." rows={3}
                className="w-full bg-slate-950/50 border border-slate-700/80 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono text-sm placeholder:text-slate-600 shadow-inner"
                value={token} onChange={e => setToken(e.target.value)} />
            </div>
          </div>
          <button type="submit" disabled={loading} className="group w-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-lg py-5 rounded-2xl transition-all flex items-center justify-center space-x-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            {loading ? <RefreshCw className="w-6 h-6 animate-spin text-emerald-600" /> : <Search className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />}
            <span>{loading ? 'Verifying Blockchain Signature...' : 'Cryptographically Verify Token'}</span>
          </button>
        </form>
        {error && (
          <div className="mt-8 flex items-center bg-rose-500/10 p-5 rounded-2xl border border-rose-500/20 text-rose-400 animate-in shake">
            <ShieldAlert className="w-6 h-6 mr-4 shrink-0" />
            <span className="font-medium text-sm">{error}</span>
          </div>
        )}
      </div>

      {report && (
        <div className="bg-slate-900/80 shadow-[0_10px_50px_rgba(16,185,129,0.1)] rounded-3xl overflow-hidden border border-emerald-500/20 mt-12 animate-in slide-in-from-bottom-12 duration-700 backdrop-blur-2xl">
          
          {/* Report Header */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-8 border-b border-emerald-500/10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-black font-heading text-2xl text-white">Verified KYC/KYW Report</h3>
                <p className="text-emerald-400/80 text-sm font-medium mt-1">Signature Valid & Authenticated</p>
              </div>
            </div>
            <div className="bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 text-xs font-mono text-slate-400 shadow-inner">
              ID: <span className="text-indigo-300">{report.github_username}</span>
            </div>
          </div>

          <div className="p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Safe Score */}
            <div className="flex flex-col items-center justify-center p-8 bg-slate-950/50 rounded-3xl border border-slate-800/80 shadow-inner relative overflow-hidden">
               <Zap className="absolute top-4 right-4 w-6 h-6 text-emerald-500/20" />
               <h4 className="text-slate-400 mb-4 font-bold font-heading uppercase tracking-widest text-xs">Trust Score</h4>
               <div className="text-7xl font-black font-heading text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">{report.score.overall}</div>
               <div className="text-sm font-medium text-slate-500 mt-2">out of 100 max</div>
               <div className="mt-6 text-xs font-bold text-emerald-300 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">Approved for Transacting</div>
            </div>
            
            {/* Raw Extracted Data */}
            <div className="col-span-2 space-y-4 flex flex-col justify-center">
               <h4 className="text-slate-300 font-bold font-heading uppercase tracking-wider text-sm mb-4">Extracted Source of Wealth Signals</h4>
               <div className="grid grid-cols-2 gap-4">
                 <MetricBox label="GitHub Account Age" value={`${report.github_data.account_age_years.toFixed(1)} yrs`} />
                 <MetricBox label="Est. Public Commits" value={report.github_data.total_commits} />
                 <MetricBox label="Public Repositories" value={report.github_data.repos.length} />
                 <MetricBox label="Prog. Languages" value={Object.keys(report.github_data.languages).length} />
               </div>
            </div>
          </div>

          <div className="bg-slate-950 px-8 py-5 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
            <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-500/50"/> Signed via RS256 algorithm by FreelanceProof CA.</span>
            <span className="mt-2 sm:mt-0 font-medium text-slate-400">Issued On: {new Date(report.issued_at).toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricBox({ label, value }) {
  return (
    <div className="bg-slate-800/30 border border-slate-700/50 p-5 rounded-2xl hover:bg-slate-800/50 transition-colors">
      <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{label}</div>
      <div className="text-2xl font-black font-heading text-white">{value}</div>
    </div>
  );
}
