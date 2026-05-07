import React from 'react';
import { Metadata } from 'next';
import PrismHeader from '../components/PrismHeader';
import PrismFooter from '../components/PrismFooter';
import { getDictionary } from '@/get-dictionary';

interface PageProps { params: Promise<{ lang: string }>; }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'hi' ? 'गोपनीयता नीति | Prism Healthcure' : 'Privacy Policy | Prism Healthcure',
    description: lang === 'hi' ? 'Prism Healthcure की गोपनीयता नीति।' : 'Privacy Policy for Prism Healthcure.',
  };
}

export default async function PrismPrivacyPage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as any);
  return (
    <div className="min-h-screen bg-slate-50">
      <PrismHeader lang={lang} dict={dictionary.navigation} />
      <div className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-5">
          <div className="bg-white rounded-[2rem] shadow-premium p-8 md:p-16 border border-slate-100">
            <h1 className="text-3xl font-black text-slate-900 mb-2">{lang === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}</h1>
            <p className="text-slate-500 mb-8 font-medium">Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section><h2 className="text-xl font-bold text-slate-900 mb-3">1. Overview</h2><p>At Prism Healthcure, we are dedicated to protecting your privacy and ensuring the security of your personal information.</p></section>
              <section><h2 className="text-xl font-bold text-slate-900 mb-3">2. Data We Collect</h2><ul className="list-disc pl-5 mt-2 space-y-2"><li>Basic identifiers: Name, Phone Number, and Email.</li><li>Clinical details: Current eye conditions, desired treatments.</li><li>Insurance information for cashless coordination.</li></ul></section>
              <section><h2 className="text-xl font-bold text-slate-900 mb-3">3. Purpose</h2><ul className="list-disc pl-5 mt-2 space-y-2"><li>Facilitating appointments with senior ophthalmologists.</li><li>Providing personalized treatment guidance and cost estimations.</li><li>Managing hospital admissions and insurance pre-authorizations.</li></ul></section>
              <section><h2 className="text-xl font-bold text-slate-900 mb-3">4. Information Sharing</h2><p>Your data is shared <strong>exclusively</strong> with our partner clinics and surgeons. We do not sell your information.</p></section>
              <section><h2 className="text-xl font-bold text-slate-900 mb-3">5. Contact Us</h2><p><strong>Email:</strong> contact@prismhealthcure.com<br /><strong>Phone:</strong> +91 90769 93279</p></section>
            </div>
          </div>
        </div>
      </div>
      <PrismFooter lang={lang} dict={dictionary.prism_page} />
    </div>
  );
}
