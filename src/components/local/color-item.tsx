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
            <PopoverTrigger>
                <div className="lg:w-12 lg:h-12 w-6 h-6 color-item
                    border border-dotted rounded-sm overflow-hidden
                "
                    style={{
                        background: `${color.hex}`
                    }}
                >
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <div className="font-mono font-medium text-xs text-sky-500 flex">
                    <div className="text-black w-12">RGB:</div>
                    <div className="ml-2 text-teal-500 w-40">{color.color}</div>
                    <ClipCopy text={color.color} />
                </div>
                <div className="font-mono font-medium text-xs text-sky-500 flex items-center">
                    <div className="text-black w-12">HEX:</div>
                    <div className="ml-2 text-teal-500 w-40">{color.hex}</div>
                    <ClipCopy text={color.hex} />
                </div>
                <div className="font-mono font-medium text-xs text-sky-500 flex">
                    <div className="text-black w-12">Counts:</div>
                    <div className="ml-2 text-teal-500">{color.count}</div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default function ColorItemBasic({ color }: any) {
    const { hex } = color
    return (
        <Popover >
            <PopoverTrigger>
                <div className="lg:w-12 lg:h-12 w-6 h-6 color-item"
                    style={{
                        background: `${hex}`
                    }}
                >
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <div className="font-mono font-medium text-xs text-sky-500 flex items-center justify-center">
                    <span className="mr-4">HEX: {hex}</span>
                    <ClipCopy text={hex} />
                </div>
            </PopoverContent>
        </Popover>
    )
}
