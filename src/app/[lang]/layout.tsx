import type { Metadata } from "next";
import { Inter, Outfit } from 'next/font/google';
import "@/app/globals.css";
import { getDictionary } from "@/get-dictionary";
import { type Locale } from "@/i18n-config";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isHi = lang === 'hi';
  const prismBaseUrl = 'https://prismhealthcure.com';
  const title = isHi ? 'Prism Healthcure | प्रीमियम नेत्र विज्ञान और नेत्र देखभाल' : 'Prism Healthcure | Premium Ophthalmology & Eye Care';
  const description = isHi
    ? 'शीर्ष नेत्र विशेषज्ञों द्वारा मोतियाबिंद, लैसिक, रेटिना और ग्लूकोमा सहित उन्नत नेत्र उपचार।'
    : 'Advanced eye treatments including Cataract, LASIK, Retina, and Glaucoma care by top ophthalmologists. Book your consultation today.';

  return {
    title: { default: title, template: '%s | Prism Healthcure' },
    description,
    metadataBase: new URL(prismBaseUrl),
    alternates: {
      canonical: `${prismBaseUrl}/${lang}`,
      languages: { 'en-IN': `${prismBaseUrl}/en`, 'hi-IN': `${prismBaseUrl}/hi` },
    },
    keywords: ['ophthalmology India', 'cataract surgery cost', 'LASIK eye surgery', 'best eye doctor Delhi', 'retina specialist', 'glaucoma treatment', 'cashless eye surgery', 'Prism Healthcure', 'eye care network'],
    authors: [{ name: 'Prism Healthcure' }],
    openGraph: {
      type: 'website',
      locale: isHi ? 'hi_IN' : 'en_IN',
      url: `${prismBaseUrl}/${lang}`,
      siteName: 'Prism Healthcure',
      title,
      description,
      images: [{ url: '/prism-logo.jpg', width: 1200, height: 630, alt: 'Prism Healthcure' }],
    },
    twitter: { card: 'summary_large_image', title, description },
    icons: {
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%230d9488" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
      apple: '/prism-logo.jpg',
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  let dictionary;
  try {
    dictionary = await getDictionary(lang as Locale);
  } catch {
    dictionary = await getDictionary('en');
  }

  return (
    <html lang={lang} className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col overflow-x-hidden font-sans antialiased text-slate-900 selection:bg-teal-900 selection:text-white">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
