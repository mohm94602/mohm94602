
import React, { useState } from 'react';

interface DownloaderFormProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

const DownloaderForm: React.FC<DownloaderFormProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 px-4">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex flex-col sm:flex-row items-center gap-2 bg-slate-900 border border-white/10 p-2 rounded-2xl">
          <div className="flex-1 w-full flex items-center px-4 py-3">
            <svg className="w-6 h-6 text-slate-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Instagram, TikTok, or YouTube link here..."
              className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 outline-none"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
              'Download Now'
            )}
          </button>
        </div>
      </form>
      <div className="flex justify-center gap-6 mt-6 opacity-60">
        <img src="https://www.vectorlogo.zone/logos/instagram/instagram-tile.svg" className="h-6 w-6 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Instagram" title="Instagram" />
        <img src="https://www.vectorlogo.zone/logos/tiktok/tiktok-icon.svg" className="h-6 w-6 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="TikTok" title="TikTok" />
        <img src="https://www.vectorlogo.zone/logos/youtube/youtube-icon.svg" className="h-6 w-6 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="YouTube" title="YouTube" />
        <img src="https://www.vectorlogo.zone/logos/twitter/twitter-tile.svg" className="h-6 w-6 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Twitter" title="Twitter" />
      </div>
    </div>
  );
};

export default DownloaderForm;
