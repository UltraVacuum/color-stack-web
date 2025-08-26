import _ from 'lodash'
import { ColorCard } from '@/app/explore/components/color-card'

export default function SitePanel({ collects }: any) {
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mb-6">
            {
                collects.map((s: any, i: any) => (
                    <div key={i} className="transform transition-all duration-300 hover:scale-[1.02]">
                        <ColorCard page={s} />
                    </div>
                ))
            }
        </div>
    )
}
