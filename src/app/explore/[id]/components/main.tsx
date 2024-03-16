'use client';
import useSWR from "swr";
import {
    useState,
    useEffect
} from "react";
import {
    fetcher,
    revelJson
} from "@/lib/utils";
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
    SORT_BY_RGB,
    SORT_BY_HSV,
    SORT_BY_HSL,
    SORT_BY_HUE,
    SORT_BY_LUM,
    MODE_LIGHT,
    MODE_DARK
} from "@/const";

import PageHead from './head'
import ColorItem from './item'
import Loading from './loading'

import './main.css';

export default function Main({ eid }: { eid: string }) {

    const [sort, setSort] = useState(SORT_BY_RGB);
    const [mode, setMode] = useState(MODE_LIGHT);
    const [showColor, setShowColor] = useState([]);
    const [pageData, setPageData] = useState(null);

    const sortFunc = [
        SORT_BY_RGB,
        SORT_BY_HSV,
        SORT_BY_HSL,
        SORT_BY_HUE,
        SORT_BY_LUM,
    ]

    const sortMode = [MODE_LIGHT, MODE_DARK]

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
                    sort by
                    <ToggleGroup
                        className="ml-2"
                        onValueChange={setSort}
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
