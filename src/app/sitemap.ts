import type { MetadataRoute } from 'next';

const BASE_URL = 'https://prismhealthcure.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'hi'];
  const routes = ['', '/privacy', '/terms'];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.5,
      });
    }
  }

  return entries;
}
