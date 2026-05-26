'use client';

import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-5">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8">
          <h1 className="text-[150px] font-black text-white/5 leading-none select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-teal-500/10 p-6 rounded-full blur-2xl animate-pulse"></div>
            <p className="text-2xl font-extrabold text-white relative">Page Not Found</p>
          </div>
        </div>
        
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          The page you are looking for might have been moved or doesn't exist anymore.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/en" 
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-6 rounded-2xl transition-all border border-white/10 flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
