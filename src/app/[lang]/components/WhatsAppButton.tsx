'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phone = '919076993279';
  const message = encodeURIComponent('Hi, I would like to book a free eye consultation at Prism Healthcure.');
  
  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 md:bottom-8 right-5 z-[60] group hidden md:block"
    >
      <div className="flex items-center gap-3 bg-white pl-2 pr-5 py-2 rounded-full shadow-[0_10px_40px_rgba(34,197,94,0.2)] border border-green-50 hover:shadow-[0_15px_50px_rgba(34,197,94,0.3)] hover:-translate-y-1 transition-all duration-300">
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border-2 border-green-500/20">
            <div className="w-full h-full bg-green-100 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] font-extrabold text-slate-800 leading-none">Chat with Expert</span>
        </div>
        <div className="ml-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
           <MessageCircle className="w-4 h-4 text-white" />
        </div>
      </div>
    </a>
  );
}
