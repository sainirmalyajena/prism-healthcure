import { treatments, treatmentSlugs, TreatmentSlug } from '@/lib/treatments';
import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Shield, Heart, ChevronDown, CheckCircle2, Phone, AlertTriangle, Eye, ArrowLeft } from 'lucide-react';
import PrismHeader from '../../components/PrismHeader';
import { getDictionary } from '@/get-dictionary';
import { notFound } from 'next/navigation';

interface Props { params: Promise<{ lang: string; slug: string }>; }

export async function generateStaticParams() {
  return treatmentSlugs.flatMap(slug => [{ lang: 'en', slug }, { lang: 'hi', slug }]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = treatments[slug as TreatmentSlug];
  if (!t) return {};
  return {
    title: `${t.title} — Cost, Procedure & Recovery | Prism Healthcure`,
    description: t.overview.slice(0, 160),
    openGraph: { title: t.title, description: t.overview.slice(0, 160), images: [{ url: t.heroImage }] },
  };
}

export default async function TreatmentPage({ params }: Props) {
  const { lang, slug } = await params;
  const t = treatments[slug as TreatmentSlug];
  if (!t) notFound();
  const dict = await getDictionary(lang as any);

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'MedicalProcedure', name: t.title,
    description: t.overview, procedureType: 'https://schema.org/SurgicalProcedure',
    howPerformed: t.types.map(x => x.desc).join('. '),
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
          <Link href={`/${lang}#treatments`} className="inline-flex items-center gap-2 text-teal-300 text-sm font-semibold mb-6 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" /> All Treatments</Link>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">{t.title}</h1>
          <p className="text-xl text-teal-200 font-medium mb-8">{t.subtitle}</p>
          <div className="flex flex-wrap gap-4">
            {[{ icon: Clock, label: 'Duration', val: t.duration }, { icon: Heart, label: 'Recovery', val: t.recovery }, { icon: Shield, label: 'Success Rate', val: t.successRate }].map((s, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-3 rounded-2xl">
                <s.icon className="w-5 h-5 text-teal-300" />
                <div><p className="text-[10px] uppercase tracking-wider text-teal-300 font-bold">{s.label}</p><p className="text-white font-bold text-sm">{s.val}</p></div>
              </div>
            ))}
            <div className="flex items-center gap-3 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 px-5 py-3 rounded-2xl">
              <p className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold">Est. Cost</p>
              <p className="text-white font-black text-sm">{t.costRange}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-20">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section><h2 className="text-2xl font-black text-slate-900 mb-4">Overview</h2><p className="text-slate-600 leading-relaxed text-lg">{t.overview}</p></section>

            {/* Symptoms */}
            <section><h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500" /> When Do You Need This?</h2>
              <div className="grid sm:grid-cols-2 gap-3">{t.symptoms.map((s, i) => (<div key={i} className="flex items-start gap-3 bg-amber-50 border border-amber-100 p-4 rounded-xl"><Eye className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /><span className="text-slate-700 text-sm font-medium">{s}</span></div>))}</div>
            </section>

            {/* Treatment Types */}
            <section><h2 className="text-2xl font-black text-slate-900 mb-4">Treatment Options</h2>
              <div className="space-y-4">{t.types.map((type, i) => (<div key={i} className="bg-gradient-to-r from-teal-50 to-white border border-teal-100 p-6 rounded-2xl"><h3 className="text-lg font-bold text-teal-800 mb-2">{type.name}</h3><p className="text-slate-600 text-sm leading-relaxed">{type.desc}</p></div>))}</div>
            </section>

            {/* Lens Options (for cataract) */}
            {t.lensOptions.length > 0 && (
              <section><h2 className="text-2xl font-black text-slate-900 mb-4">Lens Options (IOL)</h2>
                <div className="grid sm:grid-cols-2 gap-4">{t.lensOptions.map((l, i) => (<div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl hover:shadow-lg hover:border-teal-200 transition-all"><h3 className="font-bold text-slate-900 mb-1">{l.name}</h3><p className="text-slate-500 text-sm">{l.desc}</p></div>))}</div>
              </section>
            )}

            {/* Preparation */}
            <section><h2 className="text-2xl font-black text-slate-900 mb-4">How to Prepare</h2>
              <div className="space-y-3">{t.preparation.map((p, i) => (<div key={i} className="flex items-start gap-3"><span className="w-7 h-7 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-black shrink-0">{i + 1}</span><p className="text-slate-600 text-sm pt-1">{p}</p></div>))}</div>
            </section>

            {/* Aftercare */}
            <section><h2 className="text-2xl font-black text-slate-900 mb-4">Recovery & Aftercare</h2>
              <div className="space-y-3">{t.aftercare.map((a, i) => (<div key={i} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /><p className="text-slate-600 text-sm">{a}</p></div>))}</div>
            </section>

            {/* FAQ */}
            <section><h2 className="text-2xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3">{t.faqs.map((f, i) => (<details key={i} className="group bg-slate-50 rounded-2xl border border-gray-100 overflow-hidden"><summary className="flex items-center justify-between cursor-pointer p-5 text-left font-bold text-gray-900 hover:bg-slate-100 transition-colors list-none [&::-webkit-details-marker]:hidden">{f.q}<ChevronDown className="w-5 h-5 text-gray-400 shrink-0 ml-4 group-open:rotate-180 transition-transform" /></summary><div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed -mt-1">{f.a}</div></details>))}</div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="mt-12 lg:mt-0">
            <div className="sticky top-24 space-y-6">
              <div className="bg-gradient-to-br from-teal-700 to-teal-800 p-8 rounded-3xl text-white shadow-xl">
                <h3 className="text-xl font-black mb-2">Book Free Consultation</h3>
                <p className="text-teal-200 text-sm mb-6">Speak with our {t.title} specialist today.</p>
                <a href="tel:9076993279" className="block w-full py-4 bg-white text-teal-800 font-bold rounded-2xl text-center hover:bg-teal-50 transition-colors mb-3"><Phone className="w-4 h-4 inline mr-2" />Call 90769-93279</a>
                <a href={`https://wa.me/919076993279?text=${encodeURIComponent(`Hi, I'd like to know more about ${t.title} at Prism Healthcure.`)}`} target="_blank" className="block w-full py-4 bg-green-500 text-white font-bold rounded-2xl text-center hover:bg-green-600 transition-colors">💬 WhatsApp Us</a>
                <p className="text-teal-300 text-xs mt-4 text-center">Available 24/7 • Free Consultation</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-4">Other Treatments</h4>
                <div className="space-y-2">{treatmentSlugs.filter(s => s !== slug).map(s => (<Link key={s} href={`/${lang}/treatments/${s}`} className="block px-4 py-3 text-sm font-medium text-slate-600 hover:bg-teal-50 hover:text-teal-700 rounded-xl transition-colors">{treatments[s].title}</Link>))}</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
