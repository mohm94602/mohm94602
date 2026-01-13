
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DownloaderForm from './components/DownloaderForm';
import ResultDisplay from './components/ResultDisplay';
import { analyzeVideoUrl } from './services/geminiService';
import { AnalysisResult } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeVideoUrl(url);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze URL. Please check your link or try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pb-20">
      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 blur-[120px] rounded-full animate-blob animation-delay-2000"></div>
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-pink-500/10 blur-[100px] rounded-full animate-blob animation-delay-4000"></div>
      </div>

      <Navbar />

      <main className="pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-400 mb-8 animate-in fade-in slide-in-from-top-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            AI Powered Multi-Platform Downloader
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Download Any Video <br />
            <span className="gradient-text">In High Quality.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed mb-8">
            The fastest and easiest way to save your favorite content from Instagram, TikTok, YouTube, and more. 
            All in one place, no watermarks, completely free.
          </p>

          <DownloaderForm onAnalyze={handleAnalyze} isLoading={loading} />

          {error && (
            <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl max-w-lg mx-auto">
              {error}
            </div>
          )}

          {result && !loading && (
            <ResultDisplay result={result} />
          )}

          {!result && !loading && (
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
              <FeatureCard 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                title="Blazing Fast"
                description="Optimized infrastructure ensures your downloads start instantly and finish in seconds."
              />
              <FeatureCard 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>}
                title="No Watermark"
                description="Get clean, high-resolution videos without any platform watermarks or branding."
              />
              <FeatureCard 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                title="Privacy First"
                description="We don't track your downloads or store your data. Your privacy is our priority."
              />
            </div>
          )}
        </div>
      </main>

      <footer className="mt-32 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 SocialStream. For educational purposes only. Please respect copyright laws.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="glass p-6 rounded-2xl hover:bg-white/10 transition-colors border border-white/5">
    <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-4">
      {icon}
    </div>
    <h3 className="text-white font-bold mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default App;
