import _ from 'lodash';
import Link from 'next/link'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Clock4 } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { GetRevelJson } from "@/lib/utils";
import { ClipCopy } from '@/components/local/clip-copy'

dayjs.extend(relativeTime)

const nestColors = (arr: any, len: number) => {
    const n = arr.length - len
    if (n >= 0) return _.slice(arr, 0, len)
    const fillColor = {
        hex: '#FFFFFF',
        color: 'rgb(255,255,255)',
        count: 0,
        isFake: 1,
    }
    const fills = _.fill(new Array(Math.abs(n)), fillColor)
    return _.concat(arr, fills)
}

export const ColorItem = (props: any) => {
    const { color: { color: rgb, count, hex, isFake } } = props;
    return (
        <Popover >
            <PopoverTrigger
                className="
                    w-10 h-10
                    border border-slate-300 border-dotted 
                    rounded-sm
                "
                style={{ background: hex }}
            >
            </PopoverTrigger>
            <PopoverContent className='p-0'>
                {
                    isFake ?
                        <div className="px-4 py-2 font-mono font-medium text-xs">
                            <p>blank spaces.</p>
                        </div> :
                        <div className="font-mono font-medium text-xs text-sky-500 leading-6">
                            <ClipCopy text={hex}>
                                <span>HEX: {hex}</span>
                            </ClipCopy>
                            <ClipCopy text={rgb}>
                                <span>RGB: {rgb}</span>
                            </ClipCopy>
                            <p className="px-3 py-1.5 text-black">
                                counts
                                <span
                                    className="text-sky-500 mx-1"
                                >{count}</span>
                                elements.
                            </p>
                        </div>
                }
            </PopoverContent>
        </Popover>
    );
};

export const ColorList = ({ colors }: any) => {
    const rc = nestColors(colors, 25)
    return (
        <div className="grid grid-cols-5 gap-2">
            {rc.map((color: any, index: any) => {
                return <ColorItem color={color} key={index} />
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
    const showColors = GetRevelJson(page.pres_colors)

    return (
        <div className="card divide-y divide-zinc-400">
            <ColorHead page={page} />
            <div className="py-2">
                <ColorList colors={showColors} />
            </div>
            {/* <div className="py-1 border-zinc-400" /> */}
            <div className="flex items-center justify-between pt-2">
                <div className="flex items-center text-xs">
                    <div className="w-4 h-4 rounded-full"
                        style={{
                            background: `url(${page.user.avatar}) center / cover no-repeat`
                        }}
                    />
                    <p className="text-xs mx-1 text-sky-500">{page.user.name}</p>
                </div>
                <div className="flex items-center text-xs">
                    <Clock4 className='w-3 h-3 text-sky-500' />
                    <span className="ml-1 text-sky-500">
                        {dayjs(page.created_at).fromNow()}
                    </span>
                </div>
            </div>
        </div>
    )
}
