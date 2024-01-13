import Image from 'next/image'
import Link from 'next/link'

import Hero from './components/hero'
import "./page.css"

const getData = async () => {
    const page = Math.round(Math.random() * 50 + 1)
    const sUrl = process.env.SERVER_HOST
    const res = await fetch(`${sUrl}/home/api?page=${page}&page_size=${24 * 12}`, {
        method: "GET"
    })
    return await res.json()
}

export default async function Home() {
    const { page: {
        results: colorSets
    } } = await getData()
    return (
        <>
            <Hero />
            <main className="flex min-h-screen flex-col items-center justify-between px-24">
                <div className="z-10 max-w-5xl w-full items-center justify-between font-mono lg:flex">
                    <p className="flex w-full justify-center pb-6 pt-8 ">
                        Find color patterns in our Datasets.
                    </p>
                </div>

                <div className="relative flex place-items-center">
                    <div className="flex flex-wrap">
                        {
                            colorSets.map((color: any, idx: number) => {
                                return (
                                    <div className="w-12 h-12 color-item"
                                        style={{
                                            background: `${color.hex}`
                                        }}
                                        key={idx}
                                    >
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
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
                            Data{' '}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                -&gt;
                            </span>
                        </h2>
                        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                            Learn the history of colors from color datasets.
                        </p>
                    </Link>

                    <Link
                        href="/playground"
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    >
                        <h2 className={`mb-3 text-2xl font-semibold`}>
                            Playground{' '}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                -&gt;
                            </span>
                        </h2>
                        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                            Try to match colors with custom properties.
                        </p>
                    </Link>
                </div>
            </main>
        </>

    )
}
