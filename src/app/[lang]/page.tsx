import PrismHeader from './components/PrismHeader';
import AppointmentForm from './components/AppointmentForm';
import WhatsAppButton from './components/WhatsAppButton';
import { Eye, Microscope, Droplets, Glasses, Target, Dna, CheckCircle2, ChevronDown, Star, MapPin, Phone, Mail, Clock, Shield, Award, Users, Heart, Calendar, Stethoscope, FileText, Building2, Globe } from 'lucide-react';
import Link from 'next/link';
import { getDictionary } from '@/get-dictionary';
import { Metadata } from 'next';

interface PageProps { params: Promise<{ lang: any }>; }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'hi' ? 'Prism Healthcure | 100% कैशलेस चिकित्सा सहायता' : 'Cashless Eye Surgery Assistance | Prism Healthcure India',
    description: lang === 'hi' ? 'ASG जैसे शीर्ष अस्पतालों में मोतियाबिंद, लैसिक और अन्य नेत्र शल्य चिकित्सा के लिए कैशलेस सहायता और मुफ़्त परामर्श।' : '100% cashless medical assistance for LASIK, Cataract, and other eye surgeries at top empanelled hospitals like ASG.',
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

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'MedicalOrganization',
    name: 'Prism Healthcure', url: 'https://prismhealthcure.com',
    telephone: '+919076993279', email: 'contact@prismhealthcure.com',
    medicalSpecialty: 'Ophthalmology',
    openingHours: 'Mo-Su 00:00-23:59',
    description: 'Medical assistance network providing 100% cashless eye surgery and free consultations at top empanelled hospitals like ASG.',
  };

  const doctors = [
    { name: 'Dr. Arjun Mehta', role: lang === 'hi' ? 'मुख्य नेत्र रोग विशेषज्ञ' : 'Chief Ophthalmologist', spec: d.treatments.cataract.title + ' & LASIK', exp: '18+ ' + (lang === 'hi' ? 'वर्ष' : 'Years'), img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300' },
    { name: 'Dr. Priya Sharma', role: lang === 'hi' ? 'रेटिना विशेषज्ञ' : 'Retina Specialist', spec: 'Retina & Vitreous', exp: '14+ ' + (lang === 'hi' ? 'वर्ष' : 'Years'), img: 'https://images.unsplash.com/photo-1594824476967-48c8b964ae17?auto=format&fit=crop&q=80&w=300&h=300' },
    { name: 'Dr. Vikram Singh', role: lang === 'hi' ? 'ग्लूकोमा विशेषज्ञ' : 'Glaucoma Expert', spec: 'Glaucoma & Neuro', exp: '12+ ' + (lang === 'hi' ? 'वर्ष' : 'Years'), img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300' },
  ];

  const testimonials = [
    { name: 'Rajesh Kumar', location: 'Delhi', surgery: d.treatments.cataract.title, text: lang === 'hi' ? 'Prism Healthcure में पूरा अनुभव असाधारण था। डॉ मेहता ने सब कुछ स्पष्ट रूप से समझाया और सर्जरी पूरी तरह से दर्द रहित थी।' : 'The entire experience at Prism Healthcure was exceptional. Dr. Mehta explained everything clearly and the surgery was completely painless. I can see perfectly now!', rating: 5 },
    { name: 'Sunita Devi', location: 'Noida', surgery: 'LASIK', text: lang === 'hi' ? '15 साल तक चश्मा पहनने के बाद, आखिरकार मैंने यहाँ लैसिक करवाया। प्रक्रिया में केवल 10 मिनट लगे। जीवन बदल गया!' : 'After 15 years of wearing glasses, I finally got LASIK done here. The procedure took only 10 minutes and I could see clearly the next morning. Life-changing!', rating: 5 },
    { name: 'Amit Patel', location: 'Gurgaon', surgery: d.treatments.glaucoma.title, text: lang === 'hi' ? 'उनकी उन्नत स्क्रीनिंग की बदौलत मेरे ग्लूकोमा का जल्दी पता चल गया। उपचार योजना बहुत प्रभावी रही है।' : 'My glaucoma was detected early thanks to their advanced screening. The treatment plan has been very effective. Highly recommend their expertise.', rating: 5 },
  ];

  const faqs = [
    { q: lang === 'hi' ? 'आप किस प्रकार के मोतियाबिंद लेंस प्रदान करते हैं?' : 'What types of cataract lenses do you offer?', a: lang === 'hi' ? 'हम मोनोफोकल, मल्टीफोकल, टोरिक और एक्सटेंडेड डेप्थ-ऑफ-फोकस लेंस सहित प्रीमियम आईओएल की एक पूरी श्रृंखला पेश करते हैं।' : 'We offer a full range of premium IOLs including monofocal, multifocal, toric, and extended depth-of-focus lenses. Our surgeons will recommend the best option based on your lifestyle and vision needs.' },
    { q: lang === 'hi' ? 'क्या लैसिक सर्जरी दर्दनाक है?' : 'Is LASIK surgery painful?', a: lang === 'hi' ? 'नहीं। लैसिक वस्तुतः दर्द रहित है।' : 'No. LASIK is virtually painless. We use numbing eye drops before the procedure. Most patients feel only mild pressure during the 10-15 minute procedure.' },
    { q: lang === 'hi' ? 'मोतियाबिंद की सर्जरी में कितना समय लगता है?' : 'How long does cataract surgery take?', a: lang === 'hi' ? 'वास्तविक सर्जरी में प्रति आँख केवल 15-20 मिनट लगते हैं।' : 'The actual surgery takes only 15-20 minutes per eye. You can go home the same day.' },
    { q: lang === 'hi' ? 'क्या आप बीमा स्वीकार करते हैं?' : 'Do you accept insurance?', a: lang === 'hi' ? 'हाँ, हम सभी प्रमुख बीमा प्रदाताओं के साथ काम करते हैं।' : 'Yes, we work with all major insurance providers and offer cashless treatment at our facility.' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PrismHeader lang={lang} dict={dictionary.navigation} />
      <WhatsAppButton />
      <section id="hero" className="relative pt-24 md:pt-28 pb-12 md:pb-16 min-h-screen flex flex-col justify-center overflow-hidden bg-[#020617]">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-teal-500/20 rounded-full blur-[120px] animate-float-slow" />
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-indigo-500/20 rounded-full blur-[100px] animate-float" />
          <div className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] bg-emerald-500/10 rounded-full blur-[120px] animate-float-slow" style={{ animationDelay: '-2s' }} />
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] mask-image:linear-gradient(to_bottom,transparent,black,transparent)"></div>
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10 w-full flex-1">
          <div className="lg:col-span-7 space-y-6 animate-reveal">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 shadow-xl">
                <span className="flex h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                <span className="text-[10px] font-bold text-teal-300 uppercase tracking-[0.2em]">{d.header_title}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
                Your Trusted <br/>
                <span className="text-gradient-indigo">Partner for</span> <br/>
                <span className="relative inline-block">
                  Cashless
                  <svg className="absolute -bottom-1 left-0 w-full h-2 text-teal-500/40 -z-10" viewBox="0 0 100 12" preserveAspectRatio="none"><path d="M0,10 Q50,0 100,10" stroke="currentColor" strokeWidth="8" fill="none" /></svg>
                </span> Eye Surgery
              </h1>
            </div>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl font-medium">
              We facilitate high-quality eye care at India&apos;s leading hospital chains with <span className="text-white font-bold underline decoration-teal-500/50 decoration-2 underline-offset-4">100% Cashless Support</span>.
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
            <AppointmentForm />
          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-500">
          <span className="text-[9px] font-bold uppercase tracking-widest opacity-50">Scroll to Explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-teal-500 to-transparent"></div>
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
      <section className="py-20 md:py-28 bg-white border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
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
        </div>
      </section>
      {/* TREATMENTS */}
      <section id="treatments" className="py-20 md:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14"><span className="text-teal-700 font-bold text-sm uppercase tracking-widest">{d.specialties_title}</span><h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-3 mb-4">{d.comp_eye_care}</h2><p className="text-gray-500 text-base md:text-lg">{d.eye_care_desc}</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {treatments.map((t, i) => (<Link href={`/${lang}/treatments/${t.slug}`} key={i} className="group bg-white p-7 md:p-8 rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-50 hover:-translate-y-1 transition-all duration-300 block"><div className="w-14 h-14 bg-teal-50 group-hover:bg-teal-100 rounded-2xl flex items-center justify-center text-teal-700 mb-5 transition-colors"><t.icon className="w-7 h-7" /></div><h3 className="text-lg font-bold text-gray-900 mb-2">{t.title}</h3><p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p><span className="inline-flex items-center gap-1 mt-4 text-teal-700 text-sm font-bold group-hover:gap-2 transition-all">Learn more →</span></Link>))}
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section id="doctors" className="py-20 md:py-28 bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-teal-700 font-bold text-sm uppercase tracking-widest">{d.expert_team}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-4">{d.meet_specialists}</h2>
            <p className="text-slate-500 text-base md:text-lg">{d.specialists_desc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { name: 'Dr. Sameer Gupta', role: 'Senior Ophthalmic Surgeon', spec: 'Cataract & Refractive', exp: '18+ Yrs Exp', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400', education: 'MBBS, MS (AIIMS)' },
              { name: 'Dr. Anjali Verma', role: 'Retina Specialist', spec: 'Vitreoretinal Surgery', exp: '15+ Yrs Exp', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400', education: 'MS, DNB (Sankara Nethralaya)' },
              { name: 'Dr. Vikram Seth', role: 'Glaucoma Consultant', spec: 'Cornea & Glaucoma', exp: '20+ Yrs Exp', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400', education: 'MBBS, MD, FRCS (London)' }
            ].map((doc, i) => (
              <div key={i} className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-teal-900/10 transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-[5/4] overflow-hidden bg-slate-100 relative">
                  <img src={doc.img} alt={doc.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-teal-700 uppercase tracking-wider shadow-sm">
                    {doc.exp}
                  </div>
                </div>
                <div className="p-7">
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
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 order-2 lg:order-1"><img src="https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&q=80&w=800" alt="Advanced Eye Surgery" className="w-full h-[350px] md:h-[500px] object-cover" loading="lazy" /><div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 bg-teal-700 text-white p-5 rounded-2xl shadow-xl flex items-center gap-4"><span className="text-4xl font-black">24/7</span><span className="text-sm font-medium text-teal-100 leading-tight">{lang === 'hi' ? <>समर्पित<br/>सहायता</> : <>Dedicated<br/>Assistance</>}</span></div></div>
          <div className="order-1 lg:order-2"><span className="text-teal-700 font-bold text-sm uppercase tracking-widest">{d.why_prism}</span><h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-3 mb-6">{d.vision_deserves_best}</h2><p className="text-gray-500 text-base md:text-lg mb-10 leading-relaxed">{d.vision_desc}</p><div className="space-y-6">{d.why_points.map((f: any, i: number) => (<div key={i} className="flex gap-4"><CheckCircle2 className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" /><div><h4 className="text-base font-bold text-gray-900">{f.title}</h4><p className="text-sm text-gray-500 mt-0.5">{f.desc}</p></div></div>))}</div></div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 md:py-28 bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14"><span className="text-teal-700 font-bold text-sm uppercase tracking-widest">{d.patient_stories}</span><h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-3 mb-4">{d.what_patients_say}</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{testimonials.map((t, i) => (<div key={i} className="bg-white p-7 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"><div className="flex gap-1 mb-4">{Array.from({ length: t.rating }).map((_, j) => (<Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />))}</div><p className="text-gray-600 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p><div className="flex items-center gap-3 pt-4 border-t border-gray-50"><div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">{t.name.charAt(0)}</div><div><p className="font-bold text-gray-900 text-sm">{t.name}</p><p className="text-xs text-gray-400">{t.location} · {t.surgery}</p></div></div></div>))}</div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28 bg-white scroll-mt-24">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="text-center mb-14"><span className="text-teal-700 font-bold text-sm uppercase tracking-widest">{d.have_questions}</span><h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-3">{d.faqs_title}</h2></div>
          <div className="space-y-3">{faqs.map((faq, i) => (<details key={i} className="group bg-slate-50 rounded-2xl border border-gray-100 overflow-hidden"><summary className="flex items-center justify-between cursor-pointer p-5 md:p-6 text-left font-bold text-gray-900 text-base hover:bg-slate-100 transition-colors list-none [&::-webkit-details-marker]:hidden">{faq.q}<ChevronDown className="w-5 h-5 text-gray-400 shrink-0 ml-4 group-open:rotate-180 transition-transform duration-200" /></summary><div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-500 text-sm leading-relaxed -mt-1">{faq.a}</div></details>))}</div>
        </div>
      </section>

      {/* APPOINTMENT */}
      <section id="appointment" className="py-16 md:py-24 bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="bg-gradient-to-br from-teal-700 to-teal-800 rounded-3xl p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center shadow-2xl shadow-teal-900/20">
            <div><h2 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight">{d.ready_vision}</h2><p className="text-base md:text-lg text-teal-100 leading-relaxed max-w-md">{d.ready_desc}</p><div className="flex items-center gap-3 mt-8 text-teal-200 text-sm"><Shield className="w-5 h-5" /><span>{d.confidential}</span></div></div>
            <AppointmentForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-teal-500 transition-all border border-white/10 group"><Globe className="w-5 h-5 group-hover:scale-110 transition-transform" /></a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-teal-500 transition-all border border-white/10 group"><Globe className="w-5 h-5 group-hover:scale-110 transition-transform" /></a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-teal-500 transition-all border border-white/10 group"><Globe className="w-5 h-5 group-hover:scale-110 transition-transform" /></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">{d.quick_links}</h4>
              <ul className="space-y-4 text-[13px] font-medium">
                <li><Link href={`/${lang}#hero`} className="hover:text-teal-400 transition-colors">Home</Link></li>
                <li><Link href={`/${lang}#treatments`} className="hover:text-teal-400 transition-colors">Treatments</Link></li>
                <li><Link href={`/${lang}#doctors`} className="hover:text-teal-400 transition-colors">Specialists</Link></li>
                <li><Link href={`/${lang}#testimonials`} className="hover:text-teal-400 transition-colors">Testimonials</Link></li>
                <li><Link href={`/${lang}#faq`} className="hover:text-teal-400 transition-colors">FAQs</Link></li>
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
                  <div className="flex flex-col"><span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Head Office</span><span className="text-white">New Delhi, India</span></div>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal & Trust Details */}
          <div className="pt-10 pb-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-wrap gap-x-8 gap-y-4">
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">GST Number</span>
                  <span className="text-xs font-bold text-slate-400">07AAXCPXXXXX1Z1 (Sample)</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">Company CIN</span>
                  <span className="text-xs font-bold text-slate-400">U85110DL2024PTCXXXXXX</span>
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
            <p>&copy; {new Date().getFullYear()} Prism Healthcure India. {d.all_rights}</p>
            <div className="flex gap-8">
              <Link href={`/${lang}/privacy`} className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
              <Link href={`/${lang}/terms`} className="hover:text-teal-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
