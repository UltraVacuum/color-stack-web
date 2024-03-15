import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { ClipCopy } from './clip-copy'
import './color-item.css'

export const ColorItemDetail = ({ color }: any) => {
    return (
        <Popover >
            <PopoverTrigger
                className="w-full h-full color-item 
                    border border-dotted rounded-sm"
                style={{
                    background: `${color.hex || color.color}`
                }}
            >
            </PopoverTrigger>
            <PopoverContent
                className="p-0 font-mono font-medium text-sky-500 text-xs"
            >
                <ClipCopy text={color.color}>
                    RGB:
                    <span className="ml-2">{color.color}</span>
                </ClipCopy>
                <ClipCopy text={color.hex}>
                    HEX:
                    <span className="ml-2">{color.hex}</span>
                </ClipCopy>
                <p className="text-black px-4 py-2">
                    counts
                    <span className="mx-1 text-teal-500">
                        {color.count}
                    </span>
                    elements on the page.
                </p>
            </PopoverContent>
        </Popover>
    )
}

export default function ColorItemBasic({ color }: any) {
    const { hex } = color
    return (
        <Popover >
            <PopoverTrigger
                className="lg:w-12 lg:h-12 w-6 h-6 color-item"
                style={{
                    background: `${hex}`
                }}
            >
            </PopoverTrigger>
            <PopoverContent
                className="p-2"
            >
                <div className="font-mono font-medium text-xs text-sky-500">
                    <ClipCopy text={hex}>
                        <span className="mr-4">HEX: {hex}</span>
                    </ClipCopy>
                </div>
            </PopoverContent>
        </Popover>
    )
}
