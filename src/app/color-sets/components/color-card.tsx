'use client';
import Link from 'next/link';
import { ClipCopy } from '@/components/local/clip-copy';

import "./color-card.css";

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
                card-item
                block
                hover:shadow-lg transition-shadow
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
