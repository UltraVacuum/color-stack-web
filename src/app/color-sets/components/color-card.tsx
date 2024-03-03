
import "./color-card.css";

// todo: formate
const hsvFormat = (color: any) => {

}

export default function ColorCard({ color }: { color: any }) {
    return (
        <div
            className="w-full h-32 border border-dotted px-4 py-2
                card-item
            "
            style={{
                background: `${color.hex}`
            }}
        >
            <p>
                {color.hex}
            </p>
            <p>
                {color.alpha}
            </p>
        </div>
    )
}
