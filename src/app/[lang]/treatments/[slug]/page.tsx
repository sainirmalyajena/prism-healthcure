import { treatments, treatmentSlugs, TreatmentSlug } from '@/lib/treatments';
import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Shield, Heart, ChevronDown, CheckCircle2, Phone, AlertTriangle, Eye, ArrowLeft } from 'lucide-react';
import PrismHeader from '../../components/PrismHeader';
import { getDictionary } from '@/get-dictionary';
import { notFound } from 'next/navigation';
import AppointmentForm from '../../components/AppointmentForm';

interface Props { params: Promise<{ lang: string; slug: string }>; }

export async function generateStaticParams() {
  return treatmentSlugs.flatMap(slug => [{ lang: 'en', slug }, { lang: 'hi', slug }]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const t = treatments[slug as TreatmentSlug];
  if (!t) return {};
  const isHi = lang === 'hi';
  const content = isHi ? t.hi : t;
  const baseUrl = 'https://prismhealthcure.com';
  const canonical = isHi ? `${baseUrl}/hi/treatments/${slug}` : `${baseUrl}/treatments/${slug}`;

  return {
    title: `${content.title} — Cost, Procedure & Recovery | Prism Healthcure`,
    description: content.overview.slice(0, 160),
    alternates: {
      canonical: canonical,
    },
    openGraph: { 
      title: content.title, 
      description: content.overview.slice(0, 160), 
      url: canonical,
      images: [{ url: t.heroImage }] 
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.overview.slice(0, 160),
      images: [t.heroImage],
    }
  };
}

export default async function TreatmentPage({ params }: Props) {
  const { lang, slug } = await params;
  const t = treatments[slug as TreatmentSlug];
  if (!t) notFound();
  
  const isHi = lang === 'hi';
  const c = isHi ? t.hi : t;
  const dict = await getDictionary(lang as any);

  const labels = {
    all_treatments: isHi ? 'सभी उपचार' : 'All Treatments',
    overview: isHi ? 'अवलोकन' : 'Overview',
    need_this: isHi ? 'आपको इसकी आवश्यकता कब है?' : 'When Do You Need This?',
    options: isHi ? 'उपचार के विकल्प' : 'Treatment Options',
    lens: isHi ? 'लेंस विकल्प (IOL)' : 'Lens Options (IOL)',
    prepare: isHi ? 'कैसे तैयारी करें' : 'How to Prepare',
    aftercare: isHi ? 'रिकवरी और देखभाल' : 'Recovery & Aftercare',
    faq: isHi ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions',
    sidebar_title: isHi ? 'मुफ़्त परामर्श बुक करें' : 'Book Free Consultation',
    sidebar_desc: isHi ? `आज ही हमारे ${c.title} विशेषज्ञ से बात करें।` : `Speak with our ${c.title} specialist today.`,
    call: isHi ? 'कॉल करें 90769-93279' : 'Call 90769-93279',
    whatsapp: isHi ? '💬 व्हाट्सएप करें' : '💬 WhatsApp Us',
    available: isHi ? '24/7 उपलब्ध • मुफ़्त परामर्श' : 'Available 24/7 • Free Consultation',
    other_treatments: isHi ? 'अन्य उपचार' : 'Other Treatments',
    duration: isHi ? 'समय' : 'Duration',
    recovery: isHi ? 'रिकवरी' : 'Recovery',
    success: isHi ? 'सफलता दर' : 'Success Rate',
    cost: isHi ? 'अनुमानित लागत' : 'Est. Cost'
  };

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'MedicalProcedure', name: c.title,
    description: c.overview, procedureType: 'https://schema.org/SurgicalProcedure',
    howPerformed: c.types.map(x => x.desc).join('. '),
    provider: { '@type': 'MedicalOrganization', name: 'Prism Healthcure', url: 'https://prismhealthcure.com', telephone: '+919076993279' },
  };

  return (
    <div className="min-h-screen bg-white">
      <PrismHeader lang={lang} dict={dict.navigation} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${t.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 z-10">
          <Link href={`/${lang}#treatments`} className="inline-flex items-center gap-2 text-teal-300 text-sm font-semibold mb-6 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" /> {labels.all_treatments}</Link>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">{c.title}</h1>
          <p className="text-xl text-teal-200 font-medium mb-8">{c.subtitle}</p>
          <div className="flex flex-wrap gap-4">
            {[{ icon: Clock, label: labels.duration, val: c.duration }, { icon: Heart, label: labels.recovery, val: c.recovery }, { icon: Shield, label: labels.success, val: c.successRate }].map((s, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-3 rounded-2xl">
                <s.icon className="w-5 h-5 text-teal-300" />
                <div><p className="text-[10px] uppercase tracking-wider text-teal-300 font-bold">{s.label}</p><p className="text-white font-bold text-sm">{s.val}</p></div>
              </div>
            ))}
            <div className="flex items-center gap-3 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 px-5 py-3 rounded-2xl">
              <p className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold">{labels.cost}</p>
              <p className="text-white font-black text-sm">{c.costRange}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-20">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section><h2 className="text-2xl font-black text-slate-900 mb-4">{labels.overview}</h2><p className="text-slate-600 leading-relaxed text-lg">{c.overview}</p></section>

            {/* Symptoms */}
            <section><h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500" /> {labels.need_this}</h2>
              <div className="grid sm:grid-cols-2 gap-3">{c.symptoms.map((s, i) => (<div key={i} className="flex items-start gap-3 bg-amber-50 border border-amber-100 p-4 rounded-xl"><Eye className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm font-medium">{s}</span></div>))}</div>
            </section>

            {/* Treatment Types */}
            <section><h2 className="text-2xl font-black text-slate-900 mb-4">{labels.options}</h2>
              <div className="space-y-4">{c.types.map((type, i) => (<div key={i} className="bg-gradient-to-r from-teal-50 to-white border border-teal-100 p-6 rounded-2xl"><h3 className="text-lg font-bold text-teal-800 mb-2">{type.name}</h3><p className="text-slate-600 text-sm leading-relaxed">{type.desc}</p></div>))}</div>
            </section>

            {/* Lens Options (for cataract) */}
            {c.lensOptions && c.lensOptions.length > 0 && (
              <section><h2 className="text-2xl font-black text-slate-900 mb-4">{labels.lens}</h2>
                <div className="grid sm:grid-cols-2 gap-4">{c.lensOptions.map((l, i) => (<div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl hover:shadow-lg hover:border-teal-200 transition-all"><h3 className="font-bold text-slate-900 mb-1">{l.name}</h3><p className="text-slate-500 text-sm">{l.desc}</p></div>))}</div>
              </section>
            )}

            {/* Preparation */}
            <section><h2 className="text-2xl font-black text-slate-900 mb-4">{labels.prepare}</h2>
              <div className="space-y-3">{c.preparation.map((p, i) => (<div key={i} className="flex items-start gap-3"><span className="w-7 h-7 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-black shrink-0">{i + 1}</span><p className="text-slate-600 text-sm pt-1">{p}</p></div>))}</div>
            </section>

            {/* Aftercare */}
            <section><h2 className="text-2xl font-black text-slate-900 mb-4">{labels.aftercare}</h2>
              <div className="space-y-3">{c.aftercare.map((a, i) => (<div key={i} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /><p className="text-slate-600 text-sm">{a}</p></div>))}</div>
            </section>

            {/* FAQ */}
            <section><h2 className="text-2xl font-black text-slate-900 mb-4">{labels.faq}</h2>
              <div className="space-y-3">{c.faqs.map((f, i) => (<details key={i} className="group bg-slate-50 rounded-2xl border border-gray-100 overflow-hidden"><summary className="flex items-center justify-between cursor-pointer p-5 text-left font-bold text-gray-900 hover:bg-slate-100 transition-colors list-none [&::-webkit-details-marker]:hidden">{f.q}<ChevronDown className="w-5 h-5 text-gray-400 shrink-0 ml-4 group-open:rotate-180 transition-transform" /></summary><div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed -mt-1">{f.a}</div></details>))}</div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="mt-12 lg:mt-0">
            <div className="sticky top-24 space-y-6">
              <AppointmentForm lang={lang} />
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-4">{labels.other_treatments}</h4>
                <div className="space-y-2">{treatmentSlugs.filter(s => s !== slug).map(s => (<Link key={s} href={`/${lang}/treatments/${s}`} className="block px-4 py-3 text-sm font-medium text-slate-600 hover:bg-teal-50 hover:text-teal-700 rounded-xl transition-colors">{(isHi ? treatments[s].hi.title : treatments[s].title)}</Link>))}</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
