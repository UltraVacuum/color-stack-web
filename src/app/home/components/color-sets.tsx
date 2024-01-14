import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ClipCopy } from '@/components/local/clip-copy'

import './color-sets.css'

const ColorItem = ({ color }: any) => {
    const { hex } = color
    return (
        <Popover >
            <PopoverTrigger>
                <div className="w-12 h-12 color-item"
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

export default function ColorSets({ colorSets }: any) {
    return (
        <>
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono lg:flex">
                <p className="flex w-full justify-center pb-6 pt-8 ">
                    Find color patterns in our Datasets.
                </p>
            </div>
            <div className="relative flex place-items-center">
                <div className="flex flex-wrap">
                    {
                        colorSets.map((color: any, idx: number) => {
                            return <ColorItem color={color} key={idx} />
                        })
                    }
                </div>
            </div>
        </>
    )
}
