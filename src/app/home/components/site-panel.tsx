import Link from "next/link";
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
        <div className="panel flex flex-wrap items-center">
            {
                panel.pres_colors.map((c: any, i: any) => {
                    return (
                        <ColorItemDetail
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
        const { pres_colors } = c
        // console.log(pres_colors)
        const sc = pres_colors
            .filter(({ rgb }: any) => filterGray(rgb))
            .filter(({ rgb }: any) => filterWhite(rgb))
            .filter(({ rgb }: any) => filterBlack(rgb))
        return { ...c, pres_colors: sc }
    })

    return (
        <>
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
                                className="my-2"
                            >
                                <div className="flex items-center space-x-2 mt-2">
                                    <AppWindow className="w-5 h-5 text-sky-500" />
                                    <span>{s.page_title}</span>
                                    <CalendarCheck className="w-5 h-5 text-sky-500" />
                                    <span>
                                        {dayjs(s.updated_at).fromNow()}
                                    </span>
                                    <UserAvatar
                                        className="w-5 h-5"
                                        user={{
                                            avatarUrl: s.user.avatar,
                                            userName: s.user.name
                                        }}
                                    />
                                </div>
                            </Link>
                        </div>
                    )
                })
            }
        </>
    )
}
