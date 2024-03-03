import Link from 'next/link'

export default function SubPanels() {
    const subMenus = [{
        path: '/explore',
        title: 'Explore',
        detail: 'Find your favorite color panel from all over the world.'
    }, {
        path: '/color-sets',
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
