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
                w-full h-24 
                px-4 py-2
                border border-dotted 
                block
                hover:shadow-lg hover:scale-105 hover:border-none transition-all duration-300 ease-in-out
            "
            style={{
                background: `${color.hex}`
            }}
        >
            <ClipCopy text={color.hex}>
                {color.hex}
                {color.alpha}
            </ClipCopy>
        </Link>
    )
};
