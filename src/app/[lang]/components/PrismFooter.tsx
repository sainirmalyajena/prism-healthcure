import Link from 'next/link';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

interface PrismFooterProps {
  lang: string;
  dict: any;
}

export default function PrismFooter({ lang, dict }: PrismFooterProps) {
  const d = dict;
  
  return (
    <footer className="bg-[#020617] text-slate-400 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col mb-8">
              <span className="text-2xl font-black font-outfit tracking-tighter leading-none text-white">PRISM</span>
              <span className="text-[11px] uppercase tracking-[0.4em] text-teal-400 block font-black ml-0.5 mt-1">Healthcure</span>
            </div>
            <p className="text-sm leading-relaxed mb-8 text-slate-400 max-w-xs">{d.premium_eye_care}</p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/prismhealthcure" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-teal-50 transition-all border border-white/10 group"><Globe className="w-5 h-5 group-hover:scale-110 transition-transform" /></a>
              <a href="https://www.linkedin.com/company/prism-healthcure" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-teal-50 transition-all border border-white/10 group"><Globe className="w-5 h-5 group-hover:scale-110 transition-transform" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">{d.quick_links}</h4>
            <ul className="space-y-4 text-[13px] font-medium">
              <li><Link href={lang === 'en' ? '/#hero' : `/${lang}#hero`} className="hover:text-teal-400 transition-colors">Home</Link></li>
              <li><Link href={lang === 'en' ? '/#treatments' : `/${lang}#treatments`} className="hover:text-teal-400 transition-colors">Treatments</Link></li>
              <li><Link href={lang === 'en' ? '/#doctors' : `/${lang}#doctors`} className="hover:text-teal-400 transition-colors">Specialists</Link></li>
              <li><Link href={lang === 'en' ? '/#testimonials' : `/${lang}#testimonials`} className="hover:text-teal-400 transition-colors">Testimonials</Link></li>
              <li><Link href={lang === 'en' ? '/#faq' : `/${lang}#faq`} className="hover:text-teal-400 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">{d.services}</h4>
            <ul className="space-y-4 text-[13px] font-medium">
              <li className="hover:text-teal-400 cursor-default transition-colors">Cataract Surgery</li>
              <li className="hover:text-teal-400 cursor-default transition-colors">LASIK Vision Correction</li>
              <li className="hover:text-teal-400 cursor-default transition-colors">Retina & Diabetic Care</li>
              <li className="hover:text-teal-400 cursor-default transition-colors">Glaucoma Treatment</li>
              <li className="hover:text-teal-400 cursor-default transition-colors">Pediatric Eye Care</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">{d.contact}</h4>
            <ul className="space-y-5 text-[13px] font-medium">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500 shrink-0 border border-teal-500/20"><Phone className="w-4 h-4" /></div>
                <div className="flex flex-col"><span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Call Support</span><a href="tel:9076993279" className="text-white hover:text-teal-400 transition-colors">90769-93279</a></div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500 shrink-0 border border-teal-500/20"><Mail className="w-4 h-4" /></div>
                <div className="flex flex-col"><span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Email Us</span><a href="mailto:contact@prismhealthcure.com" className="text-white hover:text-teal-400 transition-colors">contact@prismhealthcure.com</a></div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500 shrink-0 border border-teal-500/20"><MapPin className="w-4 h-4" /></div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Registered Office</span>
                  <span className="text-white text-xs leading-relaxed font-medium">A-1441/8, Indira Nagar,<br/>Faizabad Road, Lucknow, UP 226016</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Trust Details */}
        <div className="pt-10 pb-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-wrap gap-x-8 gap-y-4">
             <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">GST Number</span>
                <span className="text-xs font-bold text-slate-400 uppercase">09NIIPS7822H1ZF</span>
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">Legal Name</span>
                <span className="text-xs font-bold text-slate-400">Mujahid Sultan</span>
             </div>
          </div>
          <div className="flex flex-col md:items-end">
             <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">{d.footer_seo.title}</span>
             <div className="flex flex-wrap md:justify-end gap-x-3 gap-y-1 text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                {d.footer_seo.cities.slice(0, 15).map((city: string, i: number) => (
                  <span key={i} className="hover:text-teal-400 transition-colors cursor-default">{city}</span>
                ))}
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-bold text-slate-600 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} M/s Prism Healthcare India. {d.all_rights}</p>
          <div className="flex gap-8">
            <Link href={lang === 'en' ? '/privacy' : `/${lang}/privacy`} className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
            <Link href={lang === 'en' ? '/terms' : `/${lang}/terms`} className="hover:text-teal-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
