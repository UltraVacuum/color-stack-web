import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

import { ClipCopy } from './clip-copy'
import { cn } from "@/lib/utils"

import './color-item.css'

export const ColorItemDetail = ({ className, color }: any) => {
    return (
        <Popover>
            <PopoverTrigger
                className={cn(
                    "w-full h-full color-item",
                    className
                )}
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
                <Link 
                    href={`/colors/${color.id}`}
                    className="block px-4 py-2 text-blue-500 hover:text-blue-700 text-xs border-t"
                >
                    View Color Details →
                </Link>
            </PopoverContent>
        </Popover>
    )
}
export default function ColorItemBasic({ color }: any) {
    const { hex, id } = color
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
                    <Link 
                        href={`/colors/${id}`}
                        className="block mt-2 text-blue-500 hover:text-blue-700 text-xs"
                    >
                        View Details →
                    </Link>
                </div>
            </PopoverContent>
        </Popover>
    )
}
