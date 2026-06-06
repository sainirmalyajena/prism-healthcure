'use client';

import { Phone, MessageCircle } from 'lucide-react';

interface MobileStickyBarProps {
  dict: any;
}

export default function MobileStickyBar({ dict }: MobileStickyBarProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-[90] bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,0.5rem)] flex">
      <a 
        href="tel:9076993279" 
        className="flex-1 flex flex-col items-center justify-center py-3.5 border-r border-gray-100 text-teal-700 hover:bg-teal-50 transition-colors"
      >
        <Phone className="w-5 h-5 mb-1" />
        <span className="text-[13px] font-bold tracking-tight">{dict.call_now}</span>
      </a>
      <a 
        href="https://wa.me/919076993279?text=Hello,%20I%20need%20assistance%20with%20eye%20surgery" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-3.5 text-emerald-600 hover:bg-emerald-50 transition-colors"
      >
        <MessageCircle className="w-5 h-5 mb-1" />
        <span className="text-[13px] font-bold tracking-tight">{dict.whatsapp}</span>
      </a>
    </div>
  );
}
