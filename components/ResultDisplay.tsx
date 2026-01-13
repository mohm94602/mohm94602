
import React from 'react';
import { AnalysisResult } from '../types';

interface ResultDisplayProps {
  result: AnalysisResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const { metadata, options } = result;

  const handleDownload = (quality: string) => {
    alert(`Initiating download for ${metadata.title} in ${quality}. This is a simulation.`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="grid md:grid-cols-2 gap-8 glass rounded-3xl p-8 border border-white/10">
        <div className="space-y-4">
          <div className="relative group aspect-video overflow-hidden rounded-2xl bg-slate-800 shadow-2xl">
            <img 
              src={metadata.thumbnail} 
              alt={metadata.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                 <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                   <path d="M6.3 2.841A.7.7 0 017.041 2.81l7.142 4.045a.7.7 0 010 1.21L7.041 12.11a.7.7 0 01-1.041-.606V3.447a.7.7 0 01.3-.606z" />
                 </svg>
               </div>
            </div>
            <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase">
              {metadata.platform}
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white leading-tight">{metadata.title}</h2>
            <p className="text-indigo-400 text-sm font-medium">@{metadata.author}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Available Formats</h3>
            <div className="space-y-3">
              {options.map((option, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                  onClick={() => handleDownload(option.quality)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{option.quality} ({option.format})</p>
                      <p className="text-xs text-slate-500">{option.size}</p>
                    </div>
                  </div>
                  <button className="p-2 text-indigo-400 hover:text-indigo-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
