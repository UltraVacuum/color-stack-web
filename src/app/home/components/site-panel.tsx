import Link from "next/link";
import _ from 'lodash'
import {
    AppWindow,
    Palette,
    CalendarCheck,
    CalendarClock
} from 'lucide-react';

import { filterGray, filterWhite, filterBlack } from "@/lib/color-filter"
import UserAvatar from '@/components/local/avatar'
import { ColorItemDetail } from '@/components/local/color-item';

import dayjs from "@/lib/time";

const PanelItem = ({ panel }: any) => {
    return (
        <div className="panel flex flex-1 flex-wrap items-center">
            {
                panel.pres_colors.map((c: any, i: any) => {
                    return (
                        <ColorItemDetail
                            key={i}
                            className="flex-none w-10 h-24 "
                            color={c} />
                    )
                })
            }
        </div>
    )
}

export default function SitePanel({ collects }: any) {
    const panels = collects.map((c: any, i: any) => {
        const { pres_colors: colors } = c
        const fc = colors
            .filter(({ rgb }: any) => filterBlack(rgb))
            .filter(({ rgb }: any) => filterGray(rgb))
            .filter(({ rgb }: any) => filterWhite(rgb))
        if (fc.length === 0) return null
        return { ...c, pres_colors: fc }
    }).filter((c: any) => !!c)

    return (
        <div>
            {
                panels.map((s: any, i: any) => {
                    return (
                        <div
                            key={i}
                            className="site-panel my-8"
                        >
                            <PanelItem panel={s} />
                            <Link
                                href={`/explore/${s.id}`}
                                className="flex items-center my-2"
                            >
                                <p className="mt-2">
                                    <span className="mr-2">
                                        <AppWindow className="inline-block align-middle mr-2 w-5 h-5 text-sky-500" />
                                        {s.page_title}
                                    </span>
                                    <span className="mr-2">
                                        <CalendarCheck className="inline-block align-middle mr-2 w-5 h-5 text-sky-500" />
                                        {dayjs(s.updated_at).fromNow()}
                                    </span>
                                    <UserAvatar
                                        className="inline-block align-middle w-5 h-5"
                                        user={{
                                            avatarUrl: s.user.avatar,
                                            userName: s.user.name
                                        }}
                                    />
                                </p>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}
