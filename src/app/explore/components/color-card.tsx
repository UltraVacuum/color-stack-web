import _ from 'lodash';
import Link from 'next/link'
import { Clock4 } from 'lucide-react';
import dayjs from "@/lib/time";
import { filterShow, } from "@/lib/color-filter"
import UserAvatar from '@/components/local/avatar'
import {
    ColorItemDetail
} from '@/components/local/color-item';

import './color-card.scss';

export const ColorList = ({ colors }: any) => {
    const sc = filterShow(colors, 8)
    return (
        <div className="color-grid">
            {sc.map((color: any, index: any) => {
                return (
                    <ColorItemDetail
                        color={color}
                        key={index}
                        className="color-grid-item"
                    />
                )
            })}
        </div>
    );
};

export const ColorHead = ({ page }: { page: any }) => {
    return (
        <header className="card-header">
            <Link href={`/explore/${page.id}`}>
                <h1 className="text-base font-semibold text-foreground hover:text-primary transition-colors truncate">
                    {page.page_title || "Untitled Collection"}
                </h1>
            </Link>
        </header>
    )
}

export const ColorCard = ({ page }: { page: any }) => {
    const showColors = page.page_colors
    return (
        <div className="card group">
            <ColorHead page={page} />
            <div className="py-3 flex-1">
                <ColorList colors={showColors} />
            </div>
            <div className="card-footer flex items-center justify-between">
                <span className="flex items-center text-muted-foreground">
                    <Clock4 className='w-4 h-4 mr-1' />
                    {dayjs(page.created_at).fromNow()}
                </span>
                <UserAvatar
                    className="w-5 h-5"
                    user={{
                        avatarUrl: page.user.avatar,
                        userName: page.user.name
                    }}
                />
            </div>
        </div>
    )
}
