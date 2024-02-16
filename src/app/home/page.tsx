import { createClient } from "@/supabase/client";
import Image from 'next/image'
import Link from 'next/link'

import Hero from './components/hero'
import ColorSets from './components/color-sets'
import Navigation from "@/components/local/navigation";

const getData = async () => {

    const pg = Math.round(Math.random() * 10 + 1) // page
    const ps = 24 * 12 // page size
    const skip = pg * ps
    const supabase = createClient()
    const { data, error } = await supabase.from('colors')
        .select('*')
        .range(skip + 1, skip + ps)

    return { results: data }
}

const Panels = () => {
    const subMenus = [{
        path: '/explore',
        title: 'Explore',
        detail: 'Find your favorite color panel from all over the world.'
    }, {
        path: '/datasets',
        title: 'Datasets',
        detail: 'Learn the history of colors from color datasets.'
    }, {
        path: '/panels',
        title: 'Panels',
        detail: 'Try to match colors with custom properties.'
    }]
    return (
        <div className="mb-32 mt-8 grid grid-3 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
            {
                subMenus.map((m, i) => {
                    return (
                        <Link
                            key={i}
                            href={`${m.path}`}
                            className="group text-center rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                        >
                            <h2 className={`mb-3 text-2xl font-semibold`}>
                                {`${m.title} `}
                            </h2>
                            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                                {`${m.detail}`}
                            </p>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default async function Home() {
    const { results: colorSets } = await getData()

    return (
        <>
            <Hero />
            <Navigation />
            <div className="flex min-h-screen flex-col
                items-center justify-between lg:px-24 px-4">
                <ColorSets colorSets={colorSets} />
                <Panels />
            </div>
        </>
    )
}
