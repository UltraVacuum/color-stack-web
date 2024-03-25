import { ThumbsUp } from 'lucide-react'
import { ColorItemDetail } from '@/components/local/color-item';

export default function ColorItem({ color }: { color: any }) {
    return (
        <div>
            <ColorItemDetail color={color} className="h-24 m-1" />
            <div className="flex justify-between text-zinc-600 text-sm px-4">
                <p className="">
                    {color.hex}
                </p>
                <div className="flex items-center">
                    <ThumbsUp className='
                        w-4 h-4 mr-1 hover:text-green-500
                        cursor-pointer disabled
                        ' />
                    {color.likes || 0}
                </div>
            </div>
        </div>
    )
}
