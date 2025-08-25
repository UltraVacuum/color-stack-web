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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {
                sks.map((a, i) => {
                    return (
                        <Skeleton
                            key={i}
                            className="h-28 w-full rounded-xl"
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
            {/* Search Section - Modernized */}
            <div className="mb-10 p-8 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-200/40 shadow-sm backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder={searchMode === 'color' ? "Search colors by hex, rgb, or name..." : "Search by website domain..."}
                            value={searchQuery}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSearch()}
                            className="pl-12 border-2 border-gray-200/60 rounded-xl px-4 py-3 w-full text-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        />
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <Button 
                            onClick={handleSearch} 
                            disabled={!searchQuery.trim()}
                            className="px-6 py-3 rounded-xl text-base font-semibold"
                        >
                            <Search className="w-5 h-5 mr-2" />
                            Search
                        </Button>
                        
                        <div className="flex bg-gray-100/80 rounded-xl p-1 border border-gray-200/50">
                            <Button 
                                variant={searchMode === 'color' ? "default" : "ghost"} 
                                onClick={() => setSearchMode('color')}
                                className="px-4 py-2 rounded-lg text-sm"
                            >
                                <Palette className="w-4 h-4 mr-2" />
                                Color
                            </Button>
                            <Button 
                                variant={searchMode === 'website' ? "default" : "ghost"} 
                                onClick={() => setSearchMode('website')}
                                className="px-4 py-2 rounded-lg text-sm"
                            >
                                <Globe className="w-4 h-4 mr-2" />
                                Website
                            </Button>
                        </div>
                        
                        {searchQuery && (
                            <Button variant="ghost" onClick={handleClearSearch} className="px-4 py-2">
                                Clear
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
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
