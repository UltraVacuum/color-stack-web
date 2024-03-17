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
        <div className="my-16 px-24 grid grid-3 text-center 
            md:w-full md:grid-cols-3">
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
                            <p className={`m-0 text-sm opacity-50`}>
                                {`${m.detail}`}
                            </p>
                        </Link>
                    )
                })
            }
        </div>
    )
}
