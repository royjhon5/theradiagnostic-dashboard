import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dashboard.rjdev.space',
      lastModified: new Date(),
    },
  ]
}