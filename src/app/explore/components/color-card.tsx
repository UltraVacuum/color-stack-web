import _ from 'lodash';
import Link from 'next/link'
import { Clock4 } from 'lucide-react';

import dayjs from "@/lib/time";
import { revelJson } from "@/lib/utils";
import {
    filterGray,
    filterWhite,
    filterBlack
} from "@/lib/color-filter"
import UserAvatar from '@/components/local/avatar'
import { ColorItemDetail } from '@/components/local/color-item';

import './color-card.scss';

export const ColorList = ({ colors }: any) => {
    const fc = colors // filter color
        .filter(({ rgb }: any) => filterGray(rgb))
        .filter(({ rgb }: any) => filterWhite(rgb))
        .filter(({ rgb }: any) => filterBlack(rgb))

    // const sc = nestColors(fc, 15) // show color
    const sc = _.slice(fc, 0, 10) // show color

    return (
        <div className="flex flex-wrap">
            {sc.map((color: any, index: any) => {
                return (
                    <ColorItemDetail
                        color={color}
                        key={index}
                        className="flex-1 h-24 color-item"
                    />
                )
            })}
        </div>
    );
};

export const ColorHead = ({ page }: { page: any }) => {
    return (
        <header id="header" className="relative z-20">
            <Link href={`/explore/${page.id}`}>
                <h1 className="text-sm leading-6 font-mono text-sky-500 truncate ...">
                    {page.page_title || "un titled"}
                </h1>
            </Link>
        </header>
    )
}

export const ColorCard = ({ page }: { page: any }) => {
    const showColors = revelJson(page.pres_colors)

    return (
        <div className="card divide-y divide-zinc-400 mb-1">
            <ColorHead page={page} />
            <div className="py-2">
                <ColorList colors={showColors} />
            </div>
            <div className="flex items-center space-x-2 text-sm py-2">
                <Clock4 className='w-4 h-4 text-sky-500' />
                <span className="ml-1 text-sky-500">
                    {dayjs(page.created_at).fromNow()}
                </span>
                <UserAvatar
                    className="w-4 h-4"
                    user={{
                        avatarUrl: page.user.avatar,
                        userName: page.user.name
                    }}
                />
            </div>
        </div>
    )
}
