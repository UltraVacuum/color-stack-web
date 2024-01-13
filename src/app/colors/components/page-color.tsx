"use client";
// import { useRef, useState, useCallback, useEffect } from "react";

import {
    useQuery,
    useInfiniteQuery
} from '@tanstack/react-query';

import { Button } from '@/components/ui/button'
import { ColorCard } from "./color-pannel";

import "./page-color.css";

const fetchColor = async (page: number) => {
    const res = await fetch(`/colors/api?page=${page}`, { method: "GET", })
    return res.json()
}

export const PageColor = () => {

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['page'],
        queryFn: (ctx: any) => fetchColor(ctx.pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => pages.length,
    })

    // const { count, next, previous, results } = data;
    const allRows = data ? data.pages.flatMap(({ page }) => page.results) : []

    const loadMoreHandler = (event: any) => {
        event.stopPropagation()
        fetchNextPage()
    }

    if (error) {
        return (
            <p>error</p>
        )
    }

    // const rc = SplitArray(allRows, 5)

    return (
        <div className="container p-8">
            <div className="grid grid-cols-5 gap-4 mb-8">
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
            <div className="flex align-center justify-center">
                {isFetching && !isFetchingNextPage ?
                    'Fetching...' :
                    <Button onClick={loadMoreHandler} variant="outline">Load More</Button>
                }
            </div>
        </div>
    );
}
