import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = process.env.SERVER_URL
    return [
        {
            url: `${siteUrl}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${siteUrl}/explore`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${siteUrl}/color-sets`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ]
}
