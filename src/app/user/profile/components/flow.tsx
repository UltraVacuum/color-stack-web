"use client";

import useSWRInfinite from "swr/infinite";
import { fetcher } from '@/lib/utils';
import { Button } from '@/components/ui/button'
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorView } from "@/components/client/layout";
import { ColorCard } from "./color-card";

import "./color-flow.css";

const PAGE_SIZE = 15

const Layout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="container min-h-80">
            <h1 className="px-8">My Collections</h1>
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
                            <div className="space-y-4">
                                <Skeleton className="h-2 w-[150px]" />
                                <Skeleton className="h-2 w-[120px]" />
                            </div>
                            <Skeleton className="h-[150px] w-full rounded-sm" />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default function Flow() {
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
            `/api/user/collect?page_size=${PAGE_SIZE}&page=${page + 1}`,
        fetcher
    );

    const allRows = data ? [].concat(...data) : [];
    const isLoadingMore =
        isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
    const isRefreshing = isValidating && data && data.length === size;
    // console.log(allRows, isLoading, isReachingEnd, isEmpty, isRefreshing, isLoadingMore)

    if (isLoading) return (
        <Layout>
            <LoadingView />
        </Layout>
    )


    if (error) return (
        <Layout>
            <ErrorView>
                {error.message}
            </ErrorView>
        </Layout >
    )

    return (
        <Layout>
            <div className="grid grid-cols-5 gap-2 mb-4">
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
            {
                isReachingEnd ?
                    <div className="flex align-center justify-center">
                        <Button
                            disabled
                            variant="outline">
                            No More
                        </Button>
                    </div> :
                    isLoadingMore ?
                        <LoadingView /> :
                        <div className="flex align-center justify-center">
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
