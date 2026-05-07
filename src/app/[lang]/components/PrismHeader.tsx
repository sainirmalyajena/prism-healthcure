'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PrismHeaderProps {
  lang: string;
  dict: any;
}

export default function PrismHeader({ lang, dict }: PrismHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for Scroll Reveals
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const getLinkHref = (path: string) => {
    return lang === 'en' ? path : `/${lang}${path}`;
  };

  const navLinks = [
    { href: getLinkHref('#treatments'), label: lang === 'hi' ? 'विशेषताएं' : 'Specialties' },
    { href: getLinkHref('#doctors'), label: lang === 'hi' ? 'हमारे डॉक्टर' : 'Our Doctors' },
    { href: getLinkHref('#testimonials'), label: lang === 'hi' ? 'समीक्षाएं' : 'Reviews' },
    { href: getLinkHref('#faq'), label: "FAQ" },
    { href: getLinkHref('#appointment'), label: lang === 'hi' ? 'संपर्क' : 'Contact' },
  ];

  const redirectedPathname = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    // Current segments for /en/privacy are ['', 'en', 'privacy']
    // If we want clean URLs, we need to handle the case where segment 1 is a locale or not.
    const isLocaleSegment = i18n.locales.includes(segments[1] as any);
    
    if (locale === 'en') {
      if (isLocaleSegment) {
        segments.splice(1, 1); // Remove locale segment
      }
    } else {
      if (isLocaleSegment) {
        segments[1] = locale; // Change locale segment
      } else {
        segments.splice(1, 0, locale); // Insert locale segment
      }
    }
    
    const result = segments.join('/') || '/';
    return result;
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-[100] transition-all duration-500",
      scrolled
        ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] py-2"
        : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        <Link href={lang === 'en' ? '/' : `/${lang}`} className="flex flex-col group transition-all" onClick={() => setIsOpen(false)}>
          <span className={cn(
            "text-xl md:text-2xl font-black font-outfit tracking-tighter leading-none transition-all duration-300",
            scrolled ? "text-gradient-teal" : "text-white group-hover:text-teal-300"
          )}>
            PRISM
          </span>
          <span className={cn(
            "text-[10px] md:text-[11px] uppercase tracking-[0.4em] block font-black ml-0.5 mt-0.5 transition-colors",
            scrolled ? "text-teal-600/80" : "text-teal-400 group-hover:text-white"
          )}>
            Healthcure
          </span>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={cn(
                "px-4 py-2 text-[13px] font-bold rounded-lg transition-all duration-200",
                scrolled 
                  ? "text-slate-600 hover:text-teal-700 hover:bg-teal-50/60" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden lg:flex items-center gap-4">
          <div className={cn(
            "flex items-center gap-1 mr-2 px-3 py-1.5 rounded-full transition-colors",
            scrolled ? "bg-slate-100" : "bg-white/10 backdrop-blur-md border border-white/10"
          )}>
            <Globe className={cn("w-3.5 h-3.5", scrolled ? "text-slate-400" : "text-white/60")} />
            <Link 
              href={redirectedPathname('en')}
              className={cn("text-[11px] font-bold px-2 py-0.5 rounded-full transition-all", 
                lang === 'en' 
                  ? (scrolled ? "bg-white text-teal-700 shadow-sm" : "bg-white/20 text-white shadow-sm") 
                  : (scrolled ? "text-slate-500 hover:text-slate-700" : "text-white/50 hover:text-white")
              )}
            >
              EN
            </Link>
            <Link 
              href={redirectedPathname('hi')}
              className={cn("text-[11px] font-bold px-2 py-0.5 rounded-full transition-all", 
                lang === 'hi' 
                  ? (scrolled ? "bg-white text-teal-700 shadow-sm" : "bg-white/20 text-white shadow-sm") 
                  : (scrolled ? "text-slate-500 hover:text-slate-700" : "text-white/50 hover:text-white")
              )}
            >
              हिन्दी
            </Link>
          </div>

          <Link 
            href={`/${lang}#appointment`} 
            className={cn(
              "px-7 py-3 rounded-full text-sm font-bold transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0",
              scrolled 
                ? "bg-teal-700 text-white hover:bg-teal-800 shadow-teal-700/20" 
                : "bg-white text-teal-900 hover:bg-teal-50 shadow-black/20"
            )}
          >
            {lang === 'hi' ? 'अपॉइंटमेंट' : 'Book Appointment'}
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
            <Link 
              href={redirectedPathname(lang === 'en' ? 'hi' : 'en')}
              className={cn(
                "text-[11px] font-black px-3 py-2 rounded-xl flex items-center gap-1 transition-colors",
                scrolled ? "bg-slate-100 text-slate-600" : "bg-white/10 text-white border border-white/10"
              )}
            >
              <Globe className="w-3 h-3" />
              {lang === 'en' ? 'हिन्दी' : 'EN'}
            </Link>
            <button 
                className={cn(
                  "p-2.5 rounded-xl transition-colors",
                  scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
                )}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
      </div>

      <div className={cn(
        "fixed inset-0 bg-white z-[999] transition-transform duration-300 lg:hidden flex flex-col h-[100dvh] w-full",
        isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
      )}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex flex-col">
            <span className="text-xl font-black font-outfit tracking-tighter leading-none bg-gradient-to-br from-teal-700 to-teal-900 bg-clip-text text-transparent">
              PRISM
            </span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-teal-600/70 block font-black ml-0.5 mt-0.5">
              Healthcure
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col px-5 pt-6 gap-1">
          {navLinks.map((link, i) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-lg font-semibold text-slate-800 hover:text-teal-700 py-4 px-4 rounded-xl hover:bg-teal-50 transition-all border-b border-slate-50 last:border-0"
              onClick={() => setIsOpen(false)}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-5 pb-8 pt-4 space-y-3 border-t border-slate-100">
          <Link 
            href={`/${lang}#appointment`} 
            className="block w-full bg-teal-700 text-white py-4 rounded-2xl font-bold text-center text-lg shadow-lg shadow-teal-700/20 active:scale-[0.98] transition-transform"
            onClick={() => setIsOpen(false)}
          >
            {lang === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment'}
          </Link>
          <a 
            href="tel:9076993279" 
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-teal-700 bg-teal-50 border border-teal-100 active:scale-[0.98] transition-transform"
          >
            <Phone className="w-5 h-5" />
            {lang === 'hi' ? 'कॉल करें 90769-93279' : 'Call 90769-93279'}
          </a>
        </div>
      </div>
    </header>
  );
}
