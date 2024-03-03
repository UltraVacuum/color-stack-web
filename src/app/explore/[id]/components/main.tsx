'use client';
import useSWR from "swr";
import dayjs from "dayjs";
import Link from 'next/link';
import relativeTime from "dayjs/plugin/relativeTime";
import { fetcher, GetRevelJson } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ContentLayout, ErrorView } from "@/components/client/layout";
import { ColorItemDetail } from '@/components/local/color-item';

dayjs.extend(relativeTime)

const LoadingSkeleton = () => {
    return (
        <div className="container py-8">
            <div className="flex flex-col space-y-4 w-full">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <div className="space-y-4">
                    <Skeleton className="h-8 w-[750px]" />
                    <Skeleton className="h-8 w-[450px]" />
                    <Skeleton className="h-8 w-[350px]" />
                    <Skeleton className="h-8 w-[250px]" />
                </div>
            </div>
        </div>
    )
}

export default function Main({ eid }: { eid: string }) {

    const { data, error, isLoading } = useSWR(
        `/api/explore/${eid}`,
        fetcher
    )

    if (isLoading) return <LoadingSkeleton />;
    if (error) return < ErrorView />;

    const [item]: any = data
    const prevColor = GetRevelJson(item.page_colors)

    return (
        <ContentLayout>

            <div className="head">
                <div className="flex mb-2">
                    <p className="text-black">
                        Page:
                    </p>
                    <Link href={item.page_url} className="ml-2 text-sky-400">
                        {item.page_title}
                    </Link>
                </div>
                <div className="flex">
                    <p className="mr-8">
                        Collected:
                        <span className="ml-2 text-sky-400">
                            {dayjs(item.created_at).fromNow()}
                        </span>
                    </p>
                    <p className="">
                        Theme colors:
                        <span className="ml-2 text-sky-400">
                            {item.page_colors.length}
                        </span>
                    </p>
                </div>
            </div>
            <div className="flex flex-row flex-wrap mt-4">
                {
                    prevColor.map((c: any, idx: any): any => {
                        return (
                            <div key={idx} className="flex-none m-1
                                w-12 h-12" >
                                <ColorItemDetail color={c} />
                            </div>
                        )
                    })
                }
            </div>
        </ContentLayout>
    )
}
