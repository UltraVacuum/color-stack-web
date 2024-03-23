import type {
    Metadata,
    MetadataRoute,
    ResolvingMetadata
} from 'next'
import { createClient } from "@/supabase/server";

export async function fetchMeta(s: number, e: number) {
    const supabase = createClient()
    return await supabase
        .from('page_colors')
        .select(`*`)
        .range(s, e)
}

export async function generateSitemaps() {
    // Fetch the total number of products and calculate the number of sitemaps needed
    const SIZE = 4
    return new Array(SIZE)
        .fill(1)
        .map((s: any, i: any) => {
            return {
                id: i
            }
        })
}

export default async function sitemap({
    id,
}: {
    id: number
}): Promise<MetadataRoute.Sitemap> {
    const s = id * 50000
    const e = s + 50000 - 1

    const { data, error }: any = await fetchMeta(s, e)
    const BASE_URL = process.env.SERVER_URL

    if (error || data.length === 0) {
        return [{
            url: `${BASE_URL}/explore`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'hourly'
        }]
    }

    return data.map((d: any) => ({
        url: `${BASE_URL}/explore/${d.id}`,
        lastModified: d.updated_at,
        changeFrequency: 'weekly'
    }))
}
