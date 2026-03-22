import { Github, Fingerprint, Coins, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Landing() {
  const handleConnect = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    window.location.href = `${apiUrl}/auth/github`;
  };

  return (
    <div className="flex flex-col items-center text-center mt-12 sm:mt-24 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Top Badge */}
      <div className="inline-flex items-center space-x-2 bg-indigo-500/10 rounded-full px-5 py-2 mb-10 border border-indigo-500/20 backdrop-blur-sm shadow-[0_0_15px_rgba(99,102,241,0.2)]">
        <span className="relative flex h-2 w-2 mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-sm font-medium text-indigo-300">Overcoming Freelancer EdD Filters securely</span>
      </div>
      
      {/* Hero Text */}
      <h1 className="text-5xl sm:text-7xl font-black font-heading tracking-tight mb-8 leading-tight">
        Your GitHub is Your <br/>
        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Passport to the World.</span>
      </h1>
      
      <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mb-12 font-light leading-relaxed">
        Stop getting your accounts flagged or frozen by Fintechs. Connect your <span className="text-white font-medium">GitHub</span>, instantly prove your professional legitimacy, and onboard securely in seconds.
      </p>

      {/* Main CTA */}
      <button
        onClick={handleConnect}
        className="group relative flex items-center justify-center space-x-3 bg-white text-slate-950 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-slate-100 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] hover:-translate-y-1 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[150%] skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]"></div>
        <Github className="w-7 h-7" />
        <span>Connect GitHub to Prove Identity</span>
        <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
      </button>

      {/* Feature Grid */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left w-full">
        <FeatureCard 
          icon={<Fingerprint className="w-8 h-8 text-blue-400" />}
          title="Verify Source of Wealth"
          desc="Turn your commit history into undeniable proof of active professional income, fulfilling complex due diligence instantly."
        />
        <FeatureCard 
          icon={<ShieldCheck className="w-8 h-8 text-emerald-400" />}
          title="Zero-Trust Scoring"
          desc="Our advanced engine rigorously scans your public data across 5 parameters to assign a 100-point Legitimacy Score."
        />
        <FeatureCard 
          icon={<Coins className="w-8 h-8 text-purple-400" />}
          title="Fintech Ready Tokens"
          desc="We issue an RS256 cryptographically signed JWT. Share it with banks to bypass standard geographic friction safely."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800/60 backdrop-blur-md hover:bg-slate-800/60 hover:border-slate-700 transition-all shadow-lg hover:-translate-y-1">
      <div className="mb-6 inline-flex p-3 bg-slate-800 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-heading text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{desc}</p>
    </div>
  );
}
