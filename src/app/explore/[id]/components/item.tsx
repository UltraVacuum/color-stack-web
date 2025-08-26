import { ThumbsUp, Eye, Copy } from 'lucide-react'
import { ColorItemDetail } from '@/components/local/color-item';
import { cn } from "@/lib/utils"

export default function ColorItem({ color }: { color: any }) {
    const getContrastColor = (hex: string) => {
        // Simple contrast detection - use white for dark colors, black for light colors
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? 'text-black' : 'text-white';
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            // You could add a toast notification here
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
            <ColorItemDetail color={color} className="h-32" />
            
            <div className="p-3 space-y-2">
                {/* Hex code with copy button */}
                <div className="flex items-center justify-between">
                    <span className={cn(
                        "font-mono text-sm font-semibold",
                        getContrastColor(color.hex)
                    )}>
                        {color.hex}
                    </span>
                    <button
                        onClick={() => copyToClipboard(color.hex)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-100 rounded"
                        title="Copy hex code"
                    >
                        <Copy className="w-3 h-3" />
                    </button>
                </div>

                {/* Color stats */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                        <Eye className="w-3 h-3" />
                        <span>{color.count || 0} elements</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{color.likes || 0}</span>
                    </div>
                </div>

                {/* RGB values (hidden by default, shown on hover) */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <p className="text-xs text-gray-400 font-mono truncate">
                        RGB: {color.color}
                    </p>
                </div>
            </div>

            {/* Hover overlay with quick actions */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                    <button
                        onClick={() => copyToClipboard(color.hex)}
                        className="bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform"
                        title="Copy hex"
                    >
                        <Copy className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
