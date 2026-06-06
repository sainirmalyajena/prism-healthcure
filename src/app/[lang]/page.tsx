import PrismHeader from './components/PrismHeader';
import AppointmentForm from './components/AppointmentForm';
import WhatsAppButton from './components/WhatsAppButton';
import PrismFooter from './components/PrismFooter';
import ScrollReveal from './components/ScrollReveal';
import { Eye, Microscope, Droplets, Glasses, Target, Dna, CheckCircle2, ChevronDown, Star, MapPin, Phone, Mail, Clock, Shield, Award, Users, Heart, Calendar, Stethoscope, FileText, Building2, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/get-dictionary';
import { Metadata } from 'next';

interface PageProps { params: Promise<{ lang: any }>; }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isHi = lang === 'hi';
  const title = isHi ? 'Prism Healthcure | 100% कैशलेस चिकित्सा सहायता' : 'Prism Healthcure India | Cashless Eye Surgery Assistance';
  const description = isHi ? 'ASG जैसे शीर्ष अस्पतालों में मोतियाबिंद, लैसिक और अन्य नेत्र शल्य चिकित्सा के लिए कैशलेस सहायता और मुफ़्त परामर्श।' : 'Prism Healthcure offers 100% cashless medical assistance for LASIK, Cataract, and other eye surgeries at top hospitals like ASG.';
  const baseUrl = 'https://prismhealthcure.com';
  const canonical = isHi ? `${baseUrl}/hi` : baseUrl;

  return {
    title,
    description,
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Prism Healthcure',
      images: [{ url: '/prism-logo.jpg', width: 1200, height: 630, alt: 'Prism Healthcure' }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/prism-logo.jpg'],
    }
  };
}

export default async function PrismHomePage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const d = dictionary.prism_page;

  const treatments = [
    { icon: Droplets, title: d.treatments.cataract.title, desc: d.treatments.cataract.desc, slug: 'cataract' },
    { icon: Glasses, title: d.treatments.lasik.title, desc: d.treatments.lasik.desc, slug: 'lasik' },
    { icon: Eye, title: d.treatments.retina.title, desc: d.treatments.retina.desc, slug: 'retina' },
    { icon: Target, title: d.treatments.glaucoma.title, desc: d.treatments.glaucoma.desc, slug: 'glaucoma' },
    { icon: Dna, title: d.treatments.cornea.title, desc: d.treatments.cornea.desc, slug: 'cornea' },
    { icon: Heart, title: d.treatments.pediatric.title, desc: d.treatments.pediatric.desc, slug: 'pediatric' },
  ];

  const treatments = [
    { icon: Droplets, title: d.treatments.cataract.title, desc: d.treatments.cataract.desc, slug: 'cataract' },
    { icon: Glasses, title: d.treatments.lasik.title, desc: d.treatments.lasik.desc, slug: 'lasik' },
    { icon: Eye, title: d.treatments.retina.title, desc: d.treatments.retina.desc, slug: 'retina' },
    { icon: Target, title: d.treatments.glaucoma.title, desc: d.treatments.glaucoma.desc, slug: 'glaucoma' },
    { icon: Dna, title: d.treatments.cornea.title, desc: d.treatments.cornea.desc, slug: 'cornea' },
    { icon: Heart, title: d.treatments.pediatric.title, desc: d.treatments.pediatric.desc, slug: 'pediatric' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Prism Healthcure',
    alternateName: lang === 'hi' ? 'प्रिज्म हेल्थक्योर' : 'Prism Healthcure India',
    url: 'https://prismhealthcure.com',
    logo: 'https://prismhealthcure.com/prism-logo.jpg',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-90769-93279',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi']
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'A-1441/8, Indira Nagar',
      addressLocality: 'Lucknow',
      addressRegion: 'Uttar Pradesh',
      postalCode: '226016',
      addressCountry: 'IN'
    },
    medicalSpecialty: ['Ophthalmology', 'Surgery'],
    description: d.premium_eye_care,
    sameAs: [
      'https://www.instagram.com/prismhealthcure',
      'https://www.linkedin.com/company/prism-healthcure'
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: d.faqs.map((faq: any) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Prism Healthcure',
    alternateName: 'प्रिज्म हेल्थक्योर',
    url: 'https://prismhealthcure.com/'
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <PrismHeader lang={lang} dict={dictionary.navigation} />
      <WhatsAppButton />
      <section id="hero" className="relative pt-24 md:pt-28 pb-12 md:pb-16 min-h-screen flex flex-col justify-center overflow-hidden bg-[#020617]">
        {/* Static Background Gradients — GPU-friendly, no blur animations on mobile */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-teal-900/40 rounded-full" style={{filter:'blur(80px)'}} />
          <div className="absolute top-[30%] -right-[10%] w-[40%] h-[40%] bg-indigo-900/30 rounded-full" style={{filter:'blur(60px)'}} />
          <div className="absolute -bottom-[15%] left-[15%] w-[45%] h-[45%] bg-emerald-900/20 rounded-full" style={{filter:'blur(80px)'}} />
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-20 mix-blend-overlay" aria-hidden="true"></div>
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10 w-full flex-1">
          <div className="lg:col-span-7 space-y-6 animate-reveal">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 shadow-xl">
                <span className="flex h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                <span className="text-[10px] font-bold text-teal-300 uppercase tracking-[0.2em]">{d.header_title}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
                {d.hero_parts.p1} <br/><span className="text-gradient-indigo">{d.hero_parts.p2}</span> <br/>
                <span className="relative inline-block">
                  {d.hero_parts.p3}
                  <svg className="absolute -bottom-1 left-0 w-full h-2 text-teal-500/40 -z-10" viewBox="0 0 100 12" preserveAspectRatio="none"><path d="M0,10 Q50,0 100,10" stroke="currentColor" strokeWidth="8" fill="none" /></svg>
                </span> {d.hero_parts.p4}
              </h1>
            </div>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl font-medium">
              {d.hero_subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {d.hero_points.map((point: string, i: number) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                  <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-all">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-300 group-hover:text-white transition-colors">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative w-full max-w-[420px] mx-auto lg:ml-auto animate-reveal" style={{ animationDelay: '0.2s' }}>
            {/* Form Glow Effect */}
            <div className="absolute inset-0 bg-teal-500/20 blur-[60px] rounded-full scale-90 pointer-events-none"></div>
            <AppointmentForm lang={lang} />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="bg-[#020617] py-12 md:py-16 relative z-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="flex items-center justify-center gap-5 pt-0">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-teal-400 shrink-0 shadow-xl shadow-black/20"><Users className="w-7 h-7" /></div>
              <div className="flex flex-col">
                <p className="font-extrabold text-white text-base md:text-lg leading-tight">25,000+ Patients</p>
                <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mt-1">Across 15+ Major Cities</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-5 pt-10 md:pt-0">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-teal-400 shrink-0 shadow-xl shadow-black/20"><Shield className="w-7 h-7" /></div>
              <div className="flex flex-col">
                <p className="font-extrabold text-white text-base md:text-lg leading-tight">{d.trust_bar.hospital}</p>
                <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mt-1">Certified Network</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-5 pt-10 md:pt-0">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-teal-400 shrink-0 shadow-xl shadow-black/20"><Award className="w-7 h-7" /></div>
              <div className="flex flex-col">
                <p className="font-extrabold text-white text-base md:text-lg leading-tight">{d.trust_bar.insurance}</p>
                <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mt-1">Instant Approvals</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PARTNER HOSPITALS */}
      <section className="py-12 border-b border-gray-100 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">{lang === 'hi' ? 'हमारे नेटवर्क में शामिल' : 'Empanelled With Top Hospitals'}</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {['ASG Eye Hospital', 'Centre for Sight', "Dr. Agarwal's", 'Eye-Q Vision', 'Vasan Eye Care'].map((h, i) => (
              <div key={i} className="px-5 py-3 bg-white rounded-xl shadow-sm border border-gray-100 font-bold text-slate-700 text-base md:text-lg flex items-center justify-center min-w-[140px]">
                {h}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-28 bg-white border-b border-gray-50 overflow-hidden">
        <ScrollReveal direction="up" className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-teal-600 font-bold text-sm uppercase tracking-widest">{d.how_it_works.title}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-4">{d.how_it_works.subtitle}</h2>
            <p className="text-slate-500 text-base md:text-lg">{d.how_it_works.desc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-teal-100 via-teal-200 to-emerald-100 z-0"></div>
            
            {[
              { icon: Calendar, step: d.how_it_works.steps[0] },
              { icon: Stethoscope, step: d.how_it_works.steps[1] },
              { icon: FileText, step: d.how_it_works.steps[2] },
              { icon: Heart, step: d.how_it_works.steps[3] }
            ].map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-white rounded-full shadow-[0_8px_25px_rgba(13,148,136,0.08)] border-2 border-teal-50 flex items-center justify-center text-teal-600 mb-6 group-hover:scale-105 group-hover:border-teal-100 group-hover:shadow-[0_12px_35px_rgba(13,148,136,0.15)] transition-all duration-300">
                  <s.icon className="w-9 h-9" />
                  <div className="absolute top-0 right-0 w-7 h-7 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[200px] mx-auto">{s.step.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>
      {/* TREATMENTS */}
      <section id="treatments" className="py-16 md:py-28 bg-white scroll-mt-24">
        <ScrollReveal direction="up" className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-teal-700 font-bold text-xs md:text-sm uppercase tracking-widest">{d.specialties_title}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-4">{d.comp_eye_care}</h2>
            <p className="text-slate-500 text-sm md:text-lg leading-relaxed">{d.eye_care_desc}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {treatments.map((t, i) => (
              <Link href={lang === 'en' ? `/treatments/${t.slug}` : `/${lang}/treatments/${t.slug}`} key={i} className="group bg-white p-6 md:p-8 rounded-2xl border border-slate-100 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-1 transition-all duration-300 block">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-teal-50 group-hover:bg-teal-100 rounded-xl md:rounded-2xl flex items-center justify-center text-teal-700 mb-5 transition-colors">
                  <t.icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t.desc}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-teal-700 text-[13px] font-bold group-hover:gap-2 transition-all">Learn more →</span>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* DOCTORS */}
      <section id="doctors" className="py-16 md:py-28 bg-slate-50 scroll-mt-24">
        <ScrollReveal direction="up" className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-teal-700 font-bold text-xs md:text-sm uppercase tracking-widest">{d.expert_team}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-4">{d.meet_specialists}</h2>
            <p className="text-slate-500 text-sm md:text-lg leading-relaxed">{d.specialists_desc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {d.doctors.map((doc: any, i: number) => (
              <div key={i} className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-teal-900/10 transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-[5/4] overflow-hidden bg-slate-100 relative">
                  <Image 
                    src={doc.img} 
                    alt={doc.name} 
                    width={400} 
                    height={320} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                    loading="lazy" 
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-teal-700 uppercase tracking-wider shadow-sm">
                    {doc.exp}
                  </div>
                </div>
                <div className="p-6 md:p-7">
                  <p className="text-[10px] font-bold text-teal-600 uppercase tracking-[0.2em] mb-1">{doc.role}</p>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{doc.name}</h3>
                  <p className="text-slate-400 text-xs font-medium mb-4">{doc.education}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/50">
                      {doc.spec}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 md:py-28 bg-white overflow-hidden">
        <ScrollReveal direction="up" className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 order-2 lg:order-1">
            <Image 
              src="/assets/clinic-interior.webp" 
              alt="Advanced Eye Surgery Center Interior" 
              width={800} 
              height={500} 
              className="w-full h-[300px] md:h-[500px] object-cover" 
              loading="lazy" 
            />
            <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 bg-teal-700 text-white p-4 md:p-5 rounded-2xl shadow-xl flex items-center gap-4">
              <span className="text-3xl md:text-4xl font-extrabold">24/7</span>
              <span className="text-xs md:text-sm font-medium text-teal-100 leading-tight">{lang === 'hi' ? <>समर्पित<br/>सहायता</> : <>Dedicated<br/>Assistance</>}</span>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-teal-700 font-bold text-xs md:text-sm uppercase tracking-widest">{d.why_prism}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-6">{d.vision_deserves_best}</h2>
            <p className="text-slate-500 text-sm md:text-lg mb-8 leading-relaxed">{d.vision_desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {d.why_points.map((f: any, i: number) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{f.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-16 md:py-28 bg-slate-50 scroll-mt-24">
        <ScrollReveal direction="up" className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-teal-700 font-bold text-xs md:text-sm uppercase tracking-widest">{d.patient_stories}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-4">{d.what_patients_say}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {d.testimonials.map((t: any, i: number) => (
              <div key={i} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-[13px] md:text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{t.location} · {t.surgery}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-28 bg-white scroll-mt-24">
        <ScrollReveal direction="up" className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <span className="text-teal-700 font-bold text-xs md:text-sm uppercase tracking-widest">{d.have_questions}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-3">{d.faqs_title}</h2>
          </div>
          <div className="space-y-3">
            {d.faqs.map((faq: any, i: number) => (
              <details key={i} className="group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 md:p-6 text-left font-bold text-slate-900 text-sm md:text-base hover:bg-slate-100 transition-colors list-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-4 group-open:rotate-180 transition-transform duration-200" />
                </summary>
                <div className="px-5 md:px-6 pb-5 md:pb-6 text-slate-500 text-sm leading-relaxed -mt-1">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* APPOINTMENT */}
      <section id="appointment" className="py-16 md:py-24 bg-slate-50 scroll-mt-24 overflow-hidden">
        <ScrollReveal direction="up" className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="bg-gradient-to-br from-teal-700 to-teal-800 rounded-3xl p-6 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center shadow-2xl shadow-teal-900/20">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">{d.ready_vision}</h2>
              <p className="text-sm md:text-lg text-teal-100 leading-relaxed max-w-md">{d.ready_desc}</p>
              <div className="flex items-center gap-3 mt-8 text-teal-200 text-xs md:text-sm font-medium">
                <Shield className="w-5 h-5" />
                <span>{d.confidential}</span>
              </div>
            </div>
            <AppointmentForm lang={lang} />
          </div>
        </ScrollReveal>
      </section>

      {/* FOOTER */}
      <PrismFooter lang={lang} dict={dictionary.prism_page} />
    </div>
  );
}
