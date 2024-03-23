import type { Metadata, ResolvingMetadata } from 'next'
import { BasicLayout } from "@/components/local/layout";
import ColorFlow from './components/flow';

export async function generateMetadata(
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    // fetch data
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    const title = `Trending Explore.`
    const description = `Explore trending popular site theme colors on color stack today.`
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

export default function Page() {
    return (
        <BasicLayout>
            <ColorFlow api={`/api/explore`} />
        </BasicLayout>
    )
}
