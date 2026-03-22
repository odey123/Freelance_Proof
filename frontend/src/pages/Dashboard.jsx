import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Copy, CheckCircle, RefreshCw, ShieldCheck } from 'lucide-react';

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [freelancer, setFreelancer] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }
    api.get(`/freelancer/score?id=${id}`).then(res => {
      setFreelancer(res.data);
      setLoading(false);
    }).catch(() => {
      navigate('/');
    });
  }, [id, navigate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(freelancer.verification_token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const regenerateToken = async () => {
    const res = await api.post('/freelancer/regenerate', { id });
    setFreelancer(prev => ({ ...prev, verification_token: res.data.token }));
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><div className="animate-pulse text-indigo-400 font-bold text-xl">Analyzing GitHub Telemetry...</div></div>;
  if (!freelancer) return <div className="text-center mt-20 text-rose-400 font-bold">Error loading data.</div>;

  const score = freelancer.score || { overall: 0, experience: 0, consistency: 0, activity: 0, diversity: 0, community: 0 };
  const pieData = [
    { name: 'Score', value: score.overall || 0 },
    { name: 'Remaining', value: 100 - (score.overall || 0) }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-4xl mx-auto">
      
      {/* Profile Header */}
      <div className="flex items-center space-x-5 mb-8 p-6 bg-slate-900/50 rounded-3xl border border-slate-800/80 backdrop-blur-xl shadow-lg">
        <img src={freelancer.avatar_url} alt="avatar" className="w-20 h-20 rounded-full ring-4 ring-indigo-500/30 p-1 shadow-2xl" />
        <div>
          <h2 className="text-3xl font-black font-heading tracking-tight text-white">{freelancer.github_username}</h2>
          <div className="flex items-center mt-1 space-x-2">
            <span className="bg-emerald-500/10 text-emerald-400 px-3 py-0.5 rounded-full text-xs font-bold ring-1 ring-emerald-500/20">Verified Professional</span>
            <p className="text-slate-400 text-sm">FreelanceProof Authenticated</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Overall Score Card */}
        <div className="bg-slate-900/60 rounded-3xl p-8 border border-slate-800 backdrop-blur-xl shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full filter blur-2xl"></div>
          <h3 className="text-indigo-200 font-medium mb-6 uppercase tracking-widest text-xs">Legitimacy Score</h3>
          <div className="w-52 h-52 relative drop-shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={80} outerRadius={95} dataKey="value" startAngle={90} endAngle={-270} stroke="none" strokeWidth={0}>
                  <Cell fill="url(#colorUv)" />
                  <Cell fill="var(--color-bg)" className="fill-slate-800/50" />
                </Pie>
                <defs>
                  <linearGradient id="colorUv" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-6xl font-black font-heading text-white">{score.overall}</span>
              <span className="text-sm font-medium text-slate-500 mt-1">/ 100</span>
            </div>
          </div>
          <p className="mt-8 text-sm font-medium text-slate-300 px-4">
            {score.overall > 75 ? 'Top-tier standing.' : 'Good start. Keep building your history.'}
          </p>
        </div>

        {/* Breakdown Card */}
        <div className="md:col-span-2 bg-slate-900/60 rounded-3xl p-8 border border-slate-800 backdrop-blur-xl shadow-xl">
          <h3 className="text-lg font-bold font-heading mb-8 text-white">Cryptographic Breakdown</h3>
          <div className="space-y-7">
            <ProgressBar label="Account Experience & Age" value={score.experience} max={25} color="from-blue-500 to-indigo-400" />
            <ProgressBar label="Activity & Commit Consistency" value={score.consistency} max={25} color="from-indigo-500 to-purple-400" />
            <ProgressBar label="Valid Repositories & Projects" value={score.activity} max={20} color="from-purple-500 to-pink-400" />
            <ProgressBar label="Programming Tech Diversity" value={score.diversity} max={15} color="from-pink-500 to-rose-400" />
            <ProgressBar label="Community Validation Signals" value={score.community} max={15} color="from-rose-500 to-orange-400" />
          </div>
        </div>
      </div>

      {/* Verification Token Section */}
      <div className="bg-gradient-to-br from-blue-900/40 via-indigo-900/40 to-slate-900 rounded-3xl p-8 lg:p-10 border border-indigo-500/20 shadow-[0_10px_40px_rgba(79,70,229,0.1)] relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck className="w-64 h-64 text-indigo-500" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6">
          <div>
            <h3 className="text-2xl font-black font-heading flex items-center text-white">
              <ShieldCheck className="w-6 h-6 mr-3 text-emerald-400" />
              RS256 Verification Token
            </h3>
            <p className="text-indigo-200/80 text-sm mt-2 max-w-md">Copy this cryptographic JWT and securely share it with Fintechs during Source of Wealth checks to bypass restrictions.</p>
          </div>
          <button onClick={regenerateToken} className="mt-4 md:mt-0 p-3 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-slate-300 transition-all font-semibold flex items-center shadow-lg">
            <RefreshCw className="w-4 h-4 mr-2" /> Rotate Keys
          </button>
        </div>
        
        <div className="relative z-10 mt-6 bg-[#0B0F19] p-5 rounded-2xl font-mono text-xs sm:text-sm text-indigo-300/90 break-all border border-slate-700/50 shadow-inner group">
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0B0F19] to-transparent pointer-events-none rounded-r-2xl" />
          {freelancer.verification_token}
        </div>
        
        <button
          onClick={handleCopy}
          className="relative z-10 mt-8 flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 transition-all rounded-xl font-bold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:-translate-y-0.5"
        >
          {copied ? <CheckCircle className="w-5 h-5 mr-3" /> : <Copy className="w-5 h-5 mr-3" />}
          {copied ? 'Copied securely!' : 'Copy Secure Token'}
        </button>
      </div>
    </div>
  );
}

function ProgressBar({ label, value, max, color }) {
  const percentage = (value / max) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm mb-2.5 font-medium items-end">
        <span className="text-slate-300 font-heading tracking-wide uppercase text-xs">{label}</span>
        <span className="text-white font-bold">{value} <span className="text-slate-500 font-medium ml-1">/ {max}</span></span>
      </div>
      <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
        <div 
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
