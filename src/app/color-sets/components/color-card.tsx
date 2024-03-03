
import "./color-card.css";
export default function ColorCard({ color }: { color: any }) {
    return (
        <div
            className="w-full h-16 border border-dotted px-4 py-2
                card-item
            "
            style={{
                background: `${color.hex}`
            }}
        >
            {color.hex}
        </div>
    )
}
