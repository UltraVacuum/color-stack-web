"use client";
import { Loader } from "lucide-react"
import { useInfiniteQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button'
import { ColorCard } from "./color-card";

import "./color-flow.css";

const fetchColor = async (page: number) => {
    const res = await fetch(`/colors/api?page=${page}`, { method: "GET", })
    return res.json()
}

export default function ColorFlow() {

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['data'],
        queryFn: (ctx: any) => fetchColor(ctx.pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage: any, pages: any) => pages.length,
    })

    // const { count, next, previous, results } = data;
    const allRows = data ?
        data.pages.flatMap(({ page }: { page: any }) => page.results)
        : []

    const loadMoreHandler = (event: any) => {
        event.stopPropagation()
        fetchNextPage()
    }

    if (error) {
        return (
            <div>Error</div>
        )
    }

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
                {isFetching ?
                    <Button disabled>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button> :
                    <Button onClick={loadMoreHandler} variant="outline">
                        Load More
                    </Button>
                }
            </div>
        </div>
    );
}
