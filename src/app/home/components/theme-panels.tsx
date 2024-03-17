'use client';
import useSWR from "swr";
import {
    fetcher,
} from "@/lib/utils";
import {
    ContentLayout,
    ErrorView
} from "@/components/client/layout";

import SitePanel from './site-panel';

const PAGE_SIZE = 10

export default function ThemePanels() {
    const randPage = Math.ceil(Math.random() * 12)

    const { data, error, isLoading } = useSWR(
        `/api/explore?page_size=${PAGE_SIZE}&page=${1}`,
        fetcher
    )

    if (isLoading) {
        return (
            <ContentLayout>
                loading...
            </ContentLayout>
        )
    }

    if (error) {
        return (
            <ContentLayout>
                <ErrorView>
                    {error.message}
                </ErrorView>
            </ContentLayout>
        )
    }

    return (
        <ContentLayout>
            <h2 className="text-4xl text-center font-mono font-extrabold">
                Recent Collects.
            </h2>
            <SitePanel collects={data} />
        </ContentLayout>
    )
}
