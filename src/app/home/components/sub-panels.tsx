import Link from 'next/link'
import { Compass, Database, Palette, ArrowRight } from 'lucide-react'

export default function SubPanels() {
    const subMenus = [{
        path: '/explore',
        title: 'Explore',
        detail: 'Discover beautiful color palettes from websites around the world.',
        icon: <Compass className="w-8 h-8" />,
        color: 'from-blue-500 to-cyan-500'
    }, {
        path: '/color-sets',
        title: 'Datasets',
        detail: 'Access comprehensive color collections and historical data trends.',
        icon: <Database className="w-8 h-8" />,
        color: 'from-green-500 to-emerald-500'
    }, {
        path: '/panels',
        title: 'Panels',
        detail: 'Create and customize color combinations with advanced tools.',
        icon: <Palette className="w-8 h-8" />,
        color: 'from-purple-500 to-pink-500'
    }]

    return (
        <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        Advanced <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Design Tools</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Professional-grade tools to analyze, create, and manage color collections with precision
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {subMenus.map((menu, index) => (
                        <Link
                            key={index}
                            href={menu.path}
                            className="group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Gradient accent */}
                            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${menu.color} rounded-t-2xl`}></div>
                            
                            {/* Icon */}
                            <div className={`text-center mb-6 p-3 rounded-xl bg-gradient-to-br ${menu.color} text-white inline-flex`}>
                                {menu.icon}
                            </div>
                            
                            {/* Content */}
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                                    {menu.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {menu.detail}
                                </p>
                                
                                <div className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                                    <span className="mr-2">Get Started</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>

                            {/* Hover effect */}
                            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 group-hover:bg-blue-50/10 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA - Enhanced */}
                <div className="text-center mt-20">
                    <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-16 border border-blue-100/50 shadow-lg backdrop-blur-sm">
                        <h3 className="text-4xl font-bold text-gray-800 mb-6">
                            Ready to <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Elevate Your Designs</span>?
                        </h3>
                        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Join our community of 5,000+ designers and developers creating exceptional color experiences
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link
                                href="/explore"
                                className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-12 py-5 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 inline-flex items-center group"
                            >
                                <Compass className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                                Start Exploring
                                <span className="ml-2 text-blue-200 group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                            <Link
                                href="/color-sets"
                                className="border-2 border-blue-200 bg-white/80 text-blue-700 px-12 py-5 rounded-2xl font-semibold hover:bg-blue-50 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                            >
                                Browse Collections
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
