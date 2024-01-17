import Image from 'next/image'
import Link from 'next/link'

import Hero from './components/hero'
import ColorSets from './components/color-sets'

const getData = async () => {
    const pg = Math.round(Math.random() * 50 + 1)
    const ps = 24 * 12
    const apiUrl = process.env.API_URL
    const res = await fetch(`${apiUrl}/color-sets?page=${pg}&page_size=${ps}`, {
        method: "GET",
        cache: 'no-store'
    })
    return await res.json()
}

export default async function Home() {
    const { results: colorSets } = await getData()
    return (
        <>
            <Hero />

            <div className="flex min-h-screen flex-col items-center justify-between lg:px-24 px-4">

                <ColorSets colorSets={colorSets} />

                <div className="mb-32 mt-8 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
                    <Link
                        href="/colors"
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    >
                        <h2 className={`mb-3 text-2xl font-semibold`}>
                            Explore{' '}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                -&gt;
                            </span>
                        </h2>
                        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                            Find your favorite color panel from all over the world.
                        </p>
                    </Link>

                    <Link
                        href="/datasets"
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    >
                        <h2 className={`mb-3 text-2xl font-semibold`}>
                            Datasets{' '}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                -&gt;
                            </span>
                        </h2>
                        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                            Learn the history of colors from color datasets.
                        </p>
                    </Link>

                    <Link
                        href="/Panels"
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    >
                        <h2 className={`mb-3 text-2xl font-semibold`}>
                            Panels{' '}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                -&gt;
                            </span>
                        </h2>
                        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                            Try to match colors with custom properties.
                        </p>
                    </Link>
                </div>
            </div>
        </>

    )
}
