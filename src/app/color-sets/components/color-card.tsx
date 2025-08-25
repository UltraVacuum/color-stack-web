'use client';
import Link from 'next/link';
import { ClipCopy } from '@/components/local/clip-copy';



// todo: formate
const hsvFormat = (color: any) => {

}

export default function ColorCard({ color }: { color: any }) {
    return (
        <Link 
            href={`/colors/${color.id}`}
            className="
                w-full h-28
                rounded-xl
                border border-gray-200/40
                block
                hover:shadow-xl hover:scale-105 hover:border-gray-300/60 
                transition-all duration-300 ease-in-out
                overflow-hidden
                group
            "
            style={{
                background: `${color.hex}`
            }}
        >
            <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                <ClipCopy text={color.hex}>
                    <div className="bg-white/90 px-3 py-1 rounded-lg text-xs font-medium text-gray-800 shadow-sm">
                        {color.hex}
                        {color.alpha && <span className="ml-1 text-gray-600">({Math.round(color.alpha * 100)}%)</span>}
                    </div>
                </ClipCopy>
            </div>
        </Link>
    )
};
