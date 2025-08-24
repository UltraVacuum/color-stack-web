import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Copy as CopyIcon, Eye, Palette } from 'lucide-react';

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
        <Popover>
            <PopoverTrigger
                className="w-16 h-16 color-item rounded-lg border-2 border-white/20 hover:border-white/40 transition-all duration-200"
                style={{
                    background: `${hex}`,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
            >
            </PopoverTrigger>
            <PopoverContent
                className="p-4 border-0 shadow-2xl rounded-xl max-w-xs"
            >
                <div className="font-sans text-gray-800">
                    {/* Color Preview Header */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-sm text-gray-700">Color Preview</span>
                        <div className="w-8 h-8 rounded-lg border-2 border-gray-200 shadow-sm" style={{ background: hex }}></div>
                    </div>
                    
                    {/* Copy Section with Enhanced UX */}
                    <div className="mb-4">
                        <div className="text-xs text-gray-500 mb-2 font-medium">Click to copy:</div>
                        <ClipCopy text={hex}>
                            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:from-blue-50 hover:to-blue-100 hover:border-blue-200 transition-all duration-200 group">
                                <div className="flex-1">
                                    <div className="text-xs text-gray-600 mb-1">HEX CODE</div>
                                    <div className="font-bold text-lg text-gray-800 group-hover:text-blue-700 transition-colors">{hex}</div>
                                </div>
                                <div className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors">
                                    <CopyIcon className="w-4 h-4" />
                                </div>
                            </div>
                        </ClipCopy>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-2">
                        <Link 
                            href={`/colors/${id}`}
                            className="flex items-center justify-center bg-blue-500 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-blue-600 transition-colors group"
                        >
                            <Eye className="w-3 h-3 mr-1" />
                            Details
                        </Link>
                        <button className="flex items-center justify-center bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors border border-gray-200">
                            <Palette className="w-3 h-3 mr-1" />
                            Save
                        </button>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500">Popularity: <span className="font-semibold text-green-600">High</span></div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
