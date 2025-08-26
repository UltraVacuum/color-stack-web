"use client";
import useSWRInfinite from "swr/infinite";
import { fetcher } from '@/lib/utils';
import { Button } from '@/components/ui/button'
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorView } from "@/components/client/layout";
import { ColorCard } from "./color-card";



const PAGE_SIZE = 16

const Layout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <div className="container mx-auto min-h-80 py-8 px-4">
      {children}
    </div>
  )
}

export const LoadingView = () => {
  const sks = new Array(PAGE_SIZE).fill(1).map((a, i) => i)
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mb-6">
      {
        sks.map((a, i) => {
          return (
            <div key={i} className="card p-4 flex flex-col space-y-4 animate-pulse">
              {/* Title skeleton with shimmer effect */}
              <Skeleton className="h-5 w-3/4 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
              
              {/* Color grid skeleton with staggered animation */}
              <div className="grid grid-cols-4 gap-2 my-3 flex-1">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <Skeleton 
                    key={idx} 
                    className="aspect-square rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" 
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  />
                ))}
              </div>
              
              {/* Footer skeleton */}
              <div className="flex items-center justify-between mt-2">
                <Skeleton className="h-4 w-24 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
                <Skeleton className="h-6 w-6 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default function ColorFlow({ api }: any) {
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
      `${api}?page_size=${PAGE_SIZE}&page=${page + 1}`,
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
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mb-6">
        {
          allRows.map((page: any, idx: number) => {
            return (
              <div key={idx}>
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
