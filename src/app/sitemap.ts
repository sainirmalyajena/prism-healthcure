import type { MetadataRoute } from 'next';
import { treatmentSlugs } from '@/lib/treatments';

const BASE_URL = 'https://prismhealthcure.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'hi'];
  const staticRoutes = ['', '/privacy', '/terms'];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const isDefault = locale === 'en';
    for (const route of staticRoutes) {
      entries.push({
        url: isDefault ? `${BASE_URL}${route}` : `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.5,
      });
    }
    for (const slug of treatmentSlugs) {
      entries.push({
        url: isDefault ? `${BASE_URL}/treatments/${slug}` : `${BASE_URL}/${locale}/treatments/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
