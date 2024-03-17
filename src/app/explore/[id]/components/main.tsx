'use client';
import useSWR from "swr";
import {
    useState,
    useEffect
} from "react";
import {
    MinusCircle, PlusCircle
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

import sortColor from '@/lib/sort';
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

export default function Main({ eid }: { eid: string }) {

    const [sort, setSort] = useState(SORT_BY_RGB);
    const [mode, setMode] = useState(MODE_LIGHT);
    const [showColor, setShowColor] = useState([]);
    const [pageData, setPageData] = useState<any>(null);
    const [filter, setFilter] = useState<Array<string>>([]);
    const [threshold, setThreshold] = useState(0);

    const sortFunc = [
        SORT_BY_RGB,
        SORT_BY_HSV,
        SORT_BY_HSL,
        SORT_BY_HUE,
        SORT_BY_LUM,
    ]

    const sortMode = [MODE_LIGHT, MODE_DARK]
    const filterMode = [FILTER_BLACK, FILTER_WHITE, FILTER_GREY]

    const minusThreshold = (e: any) => {
        if (threshold > 0)
            setThreshold(threshold - 1)
    }

    const addThreshold = (e: any) => {
        if (threshold < 255)
            setThreshold(threshold + 1)
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
            const sc = sortColor(prevColor, sort, mode)
            setShowColor(sc)
        }
        if (!isLoading) pageInit()
    }, [isLoading, data])

    // sort effect
    useEffect(() => {
        const sc = sortColor(showColor, sort, mode)
        setShowColor(sc)
    }, [sort, mode])

    // filter effect
    useEffect(() => {
        if (!pageData) return

        let sc = pageData.page_colors

        if (filter.indexOf(FILTER_BLACK) > -1) {
            sc = sc
                .filter(({ rgb }: any) => filterWhite(rgb, threshold))
        }
        if (filter.indexOf(FILTER_WHITE) > -1) {
            sc = sc
                .filter(({ rgb }: any) => filterBlack(rgb, threshold))
        }
        if (filter.indexOf(FILTER_GREY) > -1) {
            sc = sc
                .filter(({ rgb }: any) => filterGray(rgb, threshold))
        }

        setShowColor(sc)

    }, [pageData, filter, threshold])

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
                <div className="flex items-center px-2 mb-2">
                    <span className="flex-none w-18">sort by</span>
                    <ToggleGroup
                        className="ml-2"
                        onValueChange={setSort}
                        value={sort}
                        type="single">
                        {
                            sortFunc.map((s: any, i: any) => {
                                return (
                                    <ToggleGroupItem
                                        key={i}
                                        value={s}
                                        aria-label="Toggle italic">
                                        {s}
                                    </ToggleGroupItem>
                                )
                            })
                        }
                    </ToggleGroup>
                    <ToggleGroup
                        className="ml-2"
                        onValueChange={setMode}
                        value={mode}
                        type="single">
                        {
                            sortMode.map((s: any, i: any) => {
                                return (
                                    <ToggleGroupItem
                                        key={i}
                                        value={s}
                                        aria-label="Toggle italic">
                                        {s}
                                    </ToggleGroupItem>
                                )
                            })
                        }
                    </ToggleGroup>
                </div>
                <div className="flex items-center px-2 mb-2">
                    <span className="flex-none w-18">filter by</span>
                    <ToggleGroup
                        className="ml-2"
                        onValueChange={(v) => {
                            // console.log(v)
                            setFilter(v)
                        }}
                        value={filter}
                        type="multiple">
                        {
                            filterMode.map((s: any, i: any) => {
                                return (
                                    <ToggleGroupItem
                                        key={i}
                                        value={s}
                                        aria-label={`filter by ${s}`}>
                                        {s}
                                    </ToggleGroupItem>
                                )
                            })
                        }
                    </ToggleGroup>
                    <p className="flex-none w-60 text-black mx-2">
                        current threshold:
                        <span className="text-green-500 text-bold ml-2">
                            {threshold}
                        </span>
                    </p>
                    <div className="flex-1 flex items-center space-x-2">
                        <span>0</span>
                        <MinusCircle
                            className="cursor-pointer"
                            onClick={minusThreshold} />
                        <Slider
                            defaultValue={[threshold]}
                            value={[threshold]}
                            max={255}
                            step={5}
                            onValueChange={([v]) => {
                                setThreshold(v)
                            }}
                        />
                        <PlusCircle
                            className="cursor-pointer"
                            onClick={addThreshold} />
                        <span>255</span>
                    </div>
                </div>
                <div className="flex items-center px-2 mb-2 space-x-4">
                    <p className="flex-none">
                        total colors:
                        <span className="text-green-500 text-bold ml-2">
                            {pageData.page_colors.length}
                        </span>
                    </p>
                    <p className="flex-none">
                        filtered colors:
                        <span className="text-green-500 text-bold ml-2">
                            {pageData.page_colors.length - showColor.length}
                        </span>
                    </p>
                    <p className="flex-none italic text-slate-500">
                        if all the colors are filtered, you can slide the threshold to get the perfect colors.
                    </p>
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                    {
                        showColor.map((c: any, idx: any) => {
                            return <ColorItem color={c} key={idx} />
                        })
                    }
                </div>
            </div>
        </ContentLayout>
    )
}
