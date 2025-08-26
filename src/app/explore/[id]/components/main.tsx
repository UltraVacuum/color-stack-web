'use client';
import useSWR from "swr";
import {
    useState,
    useEffect,
    useMemo
} from "react";
import {
    MinusCircle, PlusCircle, Search
} from 'lucide-react';
import {
    fetcher,
    revelJson
} from "@/lib/utils";
import {
    filterGray,
    filterWhite,
    filterBlack
} from "@/lib/color-filter"

import ColorSort from '@/lib/color-sort';
import {
    ContentLayout,
    ErrorView
} from "@/components/client/layout";
import {
    ToggleGroup,
    ToggleGroupItem
} from "@/components/ui/toggle-group"
import {
    Slider
} from "@/components/ui/slider"

import {
    SORT_BY_RGB,
    SORT_BY_HSV,
    SORT_BY_HSL,
    SORT_BY_HUE,
    SORT_BY_LUM,
    MODE_LIGHT,
    MODE_DARK,
    FILTER_WHITE,
    FILTER_BLACK,
    FILTER_GREY,
} from "@/const";

import PageHead from './head'
import ColorItem from './item'
import Loading from './loading'

import './main.css';

const THRESHOLD_MIN = 0
const THRESHOLD_MAX = 125

type FILTERS = 'white' | 'black' | 'grey'

type THRESHOLD = {
    [FILTER_WHITE]: number,
    [FILTER_BLACK]: number,
    [FILTER_GREY]: number
}

const filterFunc = {
    [FILTER_WHITE]: filterWhite,
    [FILTER_BLACK]: filterBlack,
    [FILTER_GREY]: filterGray
}

const initThreshold = {
    [FILTER_WHITE]: THRESHOLD_MAX,
    [FILTER_BLACK]: THRESHOLD_MAX,
    [FILTER_GREY]: THRESHOLD_MAX
}

export default function Main({ eid }: { eid: string }) {

    const [sort, setSort] = useState(SORT_BY_RGB);
    const [mode, setMode] = useState(MODE_LIGHT);
    const [showColor, setShowColor] = useState([]);
    const [pageData, setPageData] = useState<any>(null);
    const [filter, setFilter] = useState<Array<string>>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [threshold, setThreshold] = useState<THRESHOLD>(initThreshold);

    const sortFunc = [
        SORT_BY_RGB,
        SORT_BY_HSV,
        SORT_BY_HSL,
        SORT_BY_HUE,
        SORT_BY_LUM,
    ]

    const sortMode = [MODE_LIGHT, MODE_DARK]
    const filterMode: Array<FILTERS> = [FILTER_BLACK, FILTER_WHITE, FILTER_GREY]

    const minusThreshold = (t: FILTERS) => {
        const v = threshold[t]
        if (v > THRESHOLD_MIN) {
            setThreshold({
                ...threshold,
                [t]: v - 1
            })
        }
    }

    const addThreshold = (t: FILTERS) => {
        const v = threshold[t]
        if (v < THRESHOLD_MAX) {
            setThreshold({
                ...threshold,
                [t]: v + 1
            })
        }
    }

    const { data, error, isLoading } = useSWR(
        `/api/explore/${eid}`,
        fetcher
    )

    // load effect
    useEffect(() => {
        function pageInit() {
            const [item]: any = data
            setPageData(item)
            const prevColor = revelJson(item.page_colors)
            const sc = ColorSort(prevColor, sort, mode)
            setShowColor(sc)
        }
        if (!isLoading) pageInit()
    }, [isLoading, data, sort, mode])

    // sort effect
    useEffect(() => {
        const sc = ColorSort(showColor, sort, mode)
        setShowColor(sc)
    }, [sort, mode])

    // Search filter function
    const filterBySearch = (colors: any[], query: string) => {
        if (!query.trim()) return colors;
        
        const searchTerm = query.toLowerCase().trim();
        return colors.filter(color => {
            // Check if color has hex property for search
            const hexValue = color.hex || color.color || '';
            const rgbValue = color.rgb ? color.rgb.join(',') : '';
            return hexValue.toLowerCase().includes(searchTerm) ||
                   rgbValue.includes(searchTerm);
        });
    };

    // Combined filter effect
    useEffect(() => {
        if (!pageData) return
        
        let sc = pageData.page_colors;
        
        // Apply search filter first
        sc = filterBySearch(sc, searchQuery);
        
        // Apply color filters
        for (let k of filterMode) {
            if (filter.indexOf(k) > -1) {
                const fn = filterFunc[k];
                const t = threshold[k];
                sc = sc.filter((color: any) => {
                    // Ensure we have rgb array for filtering
                    const rgb = color.rgb || [0, 0, 0];
                    return fn(rgb, t);
                });
            }
        }
        
        sc = ColorSort(sc, sort, mode);
        setShowColor(sc);
    }, [filter, threshold, searchQuery, pageData, sort, mode]);

    if (isLoading || !pageData) return (
        <ContentLayout>
            <Loading />
        </ContentLayout>
    )

    if (error) return (
        <ContentLayout>
            <ErrorView>
                {error.message}
            </ErrorView>
        </ContentLayout>
    )

    return (
        <ContentLayout>
            <PageHead item={pageData} />
            <div className="my-8">
                {/* Search Section */}
                <div className="filter-section">
                    <h3 className="filter-header">Search Colors</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by hex or RGB (e.g., #FF0000 or rgb(255,0,0))"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>
                </div>

                <div className="filter-section">
                    <h3 className="filter-header">Sorting Options</h3>
                    <div className="filter-group">
                        <div className="filter-control">
                            <label className="filter-label">Sort by</label>
                            <ToggleGroup
                                onValueChange={setSort}
                                value={sort}
                                type="single"
                                className="flex flex-wrap gap-1">
                                {
                                    sortFunc.map((s: any, i: any) => (
                                        <ToggleGroupItem
                                            key={i}
                                            value={s}
                                            className="px-3 py-1 text-xs font-medium data-[state=on]:bg-blue-500 data-[state=on]:text-white"
                                            aria-label={`Sort by ${s}`}>
                                            {s}
                                        </ToggleGroupItem>
                                    ))
                                }
                            </ToggleGroup>
                        </div>
                        
                        <div className="filter-control">
                            <label className="filter-label">Color mode</label>
                            <ToggleGroup
                                onValueChange={setMode}
                                value={mode}
                                type="single"
                                className="flex flex-wrap gap-1">
                                {
                                    sortMode.map((s: any, i: any) => (
                                        <ToggleGroupItem
                                            key={i}
                                            value={s}
                                            className="px-3 py-1 text-xs font-medium data-[state=on]:bg-green-500 data-[state=on]:text-white"
                                            aria-label={`Mode ${s}`}>
                                            {s}
                                        </ToggleGroupItem>
                                    ))
                                }
                            </ToggleGroup>
                        </div>
                    </div>
                </div>
                <div className="filter-section">
                    <h3 className="filter-header">Filter Options</h3>
                    <div className="filter-group">
                        {
                            filterMode.map((s: FILTERS, i: number) => (
                                <div key={i} className="filter-control">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="filter-label">Filter {s}</label>
                                        <ToggleGroupItem
                                            value={s}
                                            className="px-3 py-1 text-xs font-medium data-[state=on]:bg-purple-500 data-[state=on]:text-white"
                                            aria-label={`filter by ${s}`}>
                                            {s}
                                        </ToggleGroupItem>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-xs text-gray-600">
                                            <span>Threshold: {threshold[s]}</span>
                                            <span className="text-green-500 font-medium">
                                                {THRESHOLD_MIN} - {THRESHOLD_MAX}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                            <MinusCircle
                                                className="w-5 h-5 cursor-pointer text-gray-500 hover:text-red-500 transition-colors"
                                                onClick={() => minusThreshold(s)}
                                            />
                                            <Slider
                                                defaultValue={[threshold[s]]}
                                                value={[threshold[s]]}
                                                max={THRESHOLD_MAX}
                                                step={5}
                                                className="flex-1"
                                                onValueChange={([v]) => {
                                                    setThreshold({
                                                        ...threshold,
                                                        [s]: v
                                                    })
                                                }}
                                            />
                                            <PlusCircle
                                                className="w-5 h-5 cursor-pointer text-gray-500 hover:text-green-500 transition-colors"
                                                onClick={() => addThreshold(s)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-value">{pageData.page_colors.length}</span>
                        <span className="stat-label">Total Colors</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{showColor.length}</span>
                        <span className="stat-label">Showing</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{pageData.page_colors.length - showColor.length}</span>
                        <span className="stat-label">Filtered</span>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <p className="text-sm text-gray-600 italic">
                            💡 Adjust thresholds to fine-tune your color selection. Higher values show more colors.
                        </p>
                    </div>
                </div>

                <div className="color-grid">
                    {
                        showColor.map((c: any, idx: any) => (
                            <ColorItem color={c} key={idx} />
                        ))
                    }
                </div>
            </div>
        </ContentLayout>
    )
}
