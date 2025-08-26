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
            <div key={i} className="card p-4 flex flex-col space-y-4">
              <Skeleton className="h-4 w-3/4 rounded" />
              <div className="grid grid-cols-4 gap-2 my-2 flex-1">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <Skeleton key={idx} className="aspect-square rounded" />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-4 w-4 rounded-full" />
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
