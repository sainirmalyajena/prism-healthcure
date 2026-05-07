import React from 'react';
import { Metadata } from 'next';
import PrismHeader from '../components/PrismHeader';
import PrismFooter from '../components/PrismFooter';
import { getDictionary } from '@/get-dictionary';

interface PageProps { params: Promise<{ lang: string }>; }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'hi' ? 'नियम और शर्तें | Prism Healthcure' : 'Terms of Service | Prism Healthcure',
    description: lang === 'hi' ? 'Prism Healthcure के नियम और शर्तें।' : 'Terms of Service for Prism Healthcure.',
  };
}

export default async function PrismTermsPage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as any);
  return (
    <div className="min-h-screen bg-slate-50">
      <PrismHeader lang={lang} dict={dictionary.navigation} />
      <div className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-5">
          <div className="bg-white rounded-[2rem] shadow-premium p-8 md:p-16 border border-slate-100">
            <h1 className="text-3xl font-black text-slate-900 mb-2">{lang === 'hi' ? 'नियम और शर्तें' : 'Terms of Service'}</h1>
            <p className="text-slate-500 mb-8 font-medium">Effective Date: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section><h2 className="text-xl font-bold text-slate-900 mb-3">1. Services Provided</h2><p>Prism Healthcure provides medical coordination and concierge services for ophthalmology patients.</p></section>
              <section><h2 className="text-xl font-bold text-slate-900 mb-3">2. No Medical Advice</h2><p>The content on our website is for informational purposes only and does not constitute medical advice.</p></section>
              <section><h2 className="text-xl font-bold text-slate-900 mb-3">3. Accuracy</h2><p>Surgery cost estimates and hospital availability are subject to change based on actual clinical evaluation.</p></section>
              <section><h2 className="text-xl font-bold text-slate-900 mb-3">4. Limitation of Liability</h2><p>Prism Healthcure is not liable for clinical outcomes at partner hospitals. Patients enter into a direct relationship with the medical provider.</p></section>
              <section><h2 className="text-xl font-bold text-slate-900 mb-3">5. Governing Law</h2><p>These terms are governed by the laws of India. Any disputes shall be subject to the courts in Lucknow, Uttar Pradesh.</p></section>
            </div>
          </div>
        </div>
      </div>
      <PrismFooter lang={lang} dict={dictionary.prism_page} />
    </div>
  );
}
