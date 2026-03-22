import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import BusinessRegistration from './pages/BusinessRegistration';
import TokenVerifier from './pages/TokenVerifier';
import { ShieldCheck } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-50 font-sans relative overflow-hidden">
        
        {/* Animated Background Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 max-w-5xl mx-auto pt-6 pb-16 px-6 lg:px-8">
          
          {/* Subtle Glass Navbar */}
          <header className="mb-16 flex items-center justify-between py-4 backdrop-blur-md bg-white/5 border border-white/10 px-6 rounded-2xl shadow-sm">
            <Link to="/" className="flex items-center space-x-2 group">
              <ShieldCheck className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              <h1 className="text-2xl font-black font-heading tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent group-hover:from-indigo-100 group-hover:to-white transition-all">
                FreelanceProof
              </h1>
            </Link>
            <div className="hidden sm:flex space-x-6">
              <Link to="/business/register" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">API Keys</Link>
              <Link to="/business" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Verifier Portal</Link>
            </div>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/business" element={<TokenVerifier />} />
              <Route path="/business/register" element={<BusinessRegistration />} />
            </Routes>
          </main>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
