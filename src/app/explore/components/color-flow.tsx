"use client";
import { Loader, ServerCrash } from "lucide-react"
import useSWRInfinite from "swr/infinite";
import { fetcher } from '@/lib/utils';
import { Button } from '@/components/ui/button'
import { Skeleton } from "@/components/ui/skeleton";
import { ColorCard } from "./color-card";

import "./color-flow.css";

const PAGE_SIZE = 20

const Layout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="container min-h-80 py-8">
            {children}
        </div>
    )
}

const LoadingView = () => {
    const sks = new Array(10).fill(1).map((a, i) => i)
    return (
        <div className="grid grid-cols-5 gap-4">
            {
                sks.map((a, i) => {
                    return (
                        <div key={i} className="grid-item p-4 flex-col space-y-4">
                            <Skeleton className="h-[150px] w-full rounded-xl" />
                            <div className="space-y-4">
                                <Skeleton className="h-2 w-[150px]" />
                                <Skeleton className="h-2 w-[120px]" />
                                <Skeleton className="h-2 w-[100px]" />
                                <Skeleton className="h-2 w-[70px]" />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

const ErrorView = () => {
    return (
        <Layout>
            <div className="container py-20 h-full">
                <div className="flex items-center justify-center">
                    <ServerCrash className="text-red-500" size={48} />
                    <span className="text-red-500 text-center text-4xl ml-4">
                        Ops... Something is wrong...
                    </span>
                </div>
            </div>
        </Layout>
    )
}

export default function ColorFlow() {
    const {
        data,
        error,
        mutate,
        size,
        setSize,
        isValidating,
        isLoading
    } = useSWRInfinite(
        (page) =>
            `/api/explore?page_size=${PAGE_SIZE}&page=${page + 1}`,
        fetcher
    );

    const allRows = data ? [].concat(...data) : [];
    const isLoadingMore =
        isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
    const isRefreshing = isValidating && data && data.length === size;
    console.log(allRows, isLoading, isReachingEnd, isEmpty, isRefreshing, isLoadingMore)

    if (isLoading) {
        <Layout>
            <LoadingView />
        </Layout>
    }

    if (error) return <ErrorView />

    return (
        <Layout>
            <div className="grid grid-cols-5 gap-4">
                {
                    allRows.map((page: any, idx: number) => {
                        return (
                            <div className="grid-item p-4" key={idx}>
                                <ColorCard page={page} />
                            </div>
                        )
                    })
                }
            </div>
            {isLoadingMore ?
                <LoadingView /> :
                <div className="flex align-center justify-center mt-4">
                    <Button
                        onClick={() => {
                            setSize(size + 1)
                        }}
                        variant="outline">
                        Load More
                    </Button>
                </div>
            }
        </Layout>
    );
}
