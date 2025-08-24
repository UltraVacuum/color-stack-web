'use client';
import useSWRInfinite from "swr/infinite";
import { useState } from 'react';
import { fetcher } from '@/lib/utils';
import { Button } from '@/components/ui/button'
// Using native input element since Input component is not available
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Palette, Globe } from 'lucide-react';
import {
    ContentLayout,
    ErrorView
} from "@/components/client/layout";
import ColorCard from './color-card'

import ColorSort from "@/lib/color-sort";
import { SORT_BY_RGB, MODE_LIGHT } from "@/const";

const PAGE_SIZE = 30

const LoadingView = () => {
    const SKELETON_SIZE = 12
    const sks = new Array(SKELETON_SIZE).fill(1).map((a, i) => i)
    return (
        <div className="grid grid-cols-6 gap-2">
            {
                sks.map((a, i) => {
                    return (
                        <Skeleton
                            key={i}
                            className="h-24 w-full"
                        />
                    )
                })
            }
        </div>
    )
}

export default function Flow() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchMode, setSearchMode] = useState<'color' | 'website'>('color');
    const [isSearching, setIsSearching] = useState(false);

    const {
        data,
        error,
        mutate,
        size,
        setSize,
        isValidating,
        isLoading
    } = useSWRInfinite(
        (page) => {
            if (searchQuery) {
                if (searchMode === 'color') {
                    return `/api/search/themes-by-color?color=${encodeURIComponent(searchQuery)}`;
                } else {
                    return `/api/search/colors-by-website?website=${encodeURIComponent(searchQuery)}`;
                }
            }
            return `/api/color-sets?page_size=${PAGE_SIZE}&page=${page + 1}`;
        },
        fetcher
    );

    if (error) return (
        <ContentLayout>
            <ErrorView>
                {error.message}
            </ErrorView>
        </ContentLayout>
    )

    const allRows = data ? [].concat(...data) : [];
    const isLoadingMore =
        isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
    const isRefreshing = isValidating && data && data.length === size;

    // const sortedList = ColorSort(allRows, SORT_BY_RGB, MODE_LIGHT)
    // console.log(allRows)

    const handleSearch = () => {
        setIsSearching(true);
        mutate(); // Refresh the data with search query
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setIsSearching(false);
        mutate(); // Refresh to show all colors
    };

    return (
        <ContentLayout>
            {/* Search Section */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder={searchMode === 'color' ? "Search by color (hex, rgb)..." : "Search by website domain..."}
                            value={searchQuery}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSearch()}
                            className="pl-10 border rounded-md px-3 py-2 w-full"
                        />
                    </div>
                    <Button onClick={handleSearch} disabled={!searchQuery.trim()}>
                        <Search className="w-4 h-4 mr-2" />
                        Search
                    </Button>
                    <Button 
                        variant={searchMode === 'color' ? "default" : "outline"} 
                        onClick={() => setSearchMode('color')}
                    >
                        <Palette className="w-4 h-4 mr-2" />
                        Color
                    </Button>
                    <Button 
                        variant={searchMode === 'website' ? "default" : "outline"} 
                        onClick={() => setSearchMode('website')}
                    >
                        <Globe className="w-4 h-4 mr-2" />
                        Website
                    </Button>
                    {searchQuery && (
                        <Button variant="ghost" onClick={handleClearSearch}>
                            Clear
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-6 gap-2 mb-2">
                {allRows.map((d: any, i: any) => {
                    return (
                        <ColorCard key={i} color={d} />
                    )
                })}
            </div>
            
            {!searchQuery && (
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
            )}
        </ContentLayout>
    )
}
