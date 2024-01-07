import cx from 'classnames'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ClipCopy } from './clip-copy'

export const ColorItem = (props: any) => {
    const { color: { color: rgb, count, hex } } = props;
    return (
        <Popover >
            <PopoverTrigger>
                <div className="w-8 h-8 border border-slate-300	border-dotted rounded-sm"
                    style={{ background: hex }}>
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <div className="font-mono font-medium text-xs leading-6
                    text-sky-500 whitespace-nowrap flex items-center justify-between">
                    <span>HEX: {hex}</span>
                    <ClipCopy text={hex} />
                </div>
                <div className="font-mono font-medium text-xs leading-6 
                    text-sky-500 whitespace-nowrap flex items-center justify-between">
                    <span>RGB: {rgb}</span>
                    <ClipCopy text={rgb} />
                </div>
                <div className="font-mono text-xs leading-6 text-indigo-600 "
                >
                    {count} elements counts in the page.
                </div>
            </PopoverContent>
        </Popover>
    );
};

export const ColorList = ({ colors }: any) => {
    return (
        <div className="relative">
            <div className="grid grid-cols-5 gap-2">
                {colors.map((color: any, index: any) => {
                    return <ColorItem color={color} key={index} />
                })}
            </div>
        </div>
    );
};

export const ColorHead = ({ page }: { page: { page_title: string, page_url: string } }) => {
    return (
        <header id="header" className="relative z-20">
            <div>
                <h1 className="text-sm leading-6 font-mono text-sky-500 truncate ...">
                    {page.page_title || "un titled"}
                </h1>
                <p className="text-sm  text-slate-900 truncate ...">
                    {page.page_url}
                </p>
            </div>
            <p className="mt-2 text-base  text-slate-700"></p>
        </header>
    )
}

export const ColorCard = ({ page }: { page: any }) => {
    return (
        <>
            <ColorHead page={page} />
            <ColorList colors={page.pres_colors} />
        </>
    )
}
