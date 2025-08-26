import type { Metadata, ResolvingMetadata } from 'next'
import { createClient } from "@/supabase/server";
import { BasicLayout } from "@/components/local/layout";
import Main from './components/main';

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function fetchMata(id: string | number) {
    const supabase = await createClient()
    return await supabase
        .from('page_colors')
        .select(`*, 
            user:users(
                id,
                avatar:user_meta->avatar_url,
                name:user_meta->full_name
                )
            )`)
        .eq('id', id)
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    // fetch data
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    const resolvedParams = await params;
    const { data, error }: any = await fetchMata(resolvedParams.id)

    // Handle case where data is empty or undefined
    if (!data || data.length === 0 || !data[0]) {
        return {
            title: 'Explore Theme Colors - Color Stack',
            openGraph: {
                title: 'Explore Theme Colors - Color Stack',
                description: 'Explore beautiful color themes and palettes',
                url: 'https://color-stack.top',
                siteName: 'Color Stack',
                images: ['/logo.png', ...previousImages],
            },
        }
    }

    const meta = data[0];
    const domain = meta.page_url ? new URL(meta.page_url).hostname : 'unknown domain'
    const title = `Explore theme colors on ${domain}`
    const description = `Explore theme colors on ${domain}, stacked by ${meta.user?.name || 'unknown user'} at ${meta.updated_at || 'unknown time'}`

    return {
        title,
        openGraph: {
            title,
            description,
            url: 'https://color-stack.top',
            siteName: 'Color Stack',
            images: [
                '/logo.png',
                ...previousImages
            ],
        },
    }
}

export default async function Page({
    params
}: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return (
        <BasicLayout>
            <Main eid={resolvedParams.id} />
        </BasicLayout>
    )
}
