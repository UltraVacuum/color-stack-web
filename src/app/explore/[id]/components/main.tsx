'use client';
import useSWR from "swr";
import dayjs from "dayjs";
import Link from 'next/link';
import relativeTime from "dayjs/plugin/relativeTime";
import { Link as LinkIcon, Palette, Clock2 } from 'lucide-react';
import { fetcher, GetRevelJson } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ContentLayout, ErrorView } from "@/components/client/layout";
import { ColorItemDetail } from '@/components/local/color-item';

import './main.css';

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
    if (error) return (
        <ErrorView>
            {error.message}
        </ErrorView>
    )

    const [item]: any = data
    const prevColor = GetRevelJson(item.page_colors)

    return (
        <ContentLayout>
            <div className="head">
                <div className="flex items-center flex-wrap">
                    <LinkIcon className="w-4 h-4 mr-2 icon-color" />
                    <Link
                        href={item.page_url}
                        target="_blank"
                        className="text-sky-500"
                    >
                        {item.page_title}
                    </Link>
                </div>
                <div className="flex items-center my-2 space-x-4">
                    <div className="flex items-center">
                        <div className="
                            w-8 h-8 rounded-full
                            bg-gray-500 bg-no-repeat 
                            bg-center bg-cover
                            "
                            style={{
                                backgroundImage: `url(${item.user.avatar})`
                            }}
                        />
                        <p className="ml-2 text-sky-500">{item.user.name}</p>
                    </div>
                    <p className="flex items-center">
                        <Clock2 className="w-4 h-4 mr-1 icon-color" />
                        <span className="text-sky-500">
                            {dayjs(item.created_at).fromNow()}
                        </span>
                    </p>
                    <p className="flex items-center text-black">
                        <Palette className="w-4 h-4 mr-1 icon-color" />
                        <span className="text-sky-500">
                            {item.page_colors.length}
                        </span>
                    </p>
                </div>
            </div>
            <div className="flex flex-row flex-wrap my-4">
                {
                    prevColor.map((c: any, idx: any): any => {
                        return (
                            <div
                                key={idx}
                                className="flex-none w-32 h-24 m-1" >
                                <ColorItemDetail color={c} />
                            </div>
                        )
                    })
                }
            </div>
        </ContentLayout>
    )
}
