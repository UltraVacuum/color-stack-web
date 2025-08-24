import Link from "next/link"
import { CheckCircle, Palette, Zap, Users, Sparkles } from "lucide-react"

export default function Article() {
    const CrxUrl = "https://chromewebstore.google.com/detail/color-stack/odejgpnelfibbifobdffndebnbielcdl?ref=color-stack"

    const features = [
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Efficiency",
            description: "Gone are the days of manually inspecting web pages for color inspiration. With Color Stack, designers can gather relevant colors with just a few clicks, significantly speeding up their workflow.",
            color: "text-blue-500"
        },
        {
            icon: <Palette className="w-8 h-8" />,
            title: "Consistency",
            description: "By extracting colors directly from existing designs or websites, Color Stack ensures that the resulting palette is harmonious and cohesive. This promotes consistency across various design elements.",
            color: "text-green-500"
        },
        {
            icon: <Sparkles className="w-8 h-8" />,
            title: "Versatility",
            description: "Whether you're working on a website, an app interface, or a marketing campaign, Color Stack can adapt to your needs. Its flexibility makes it valuable across different industries.",
            color: "text-purple-500"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Collaboration",
            description: "With Color Stack's sharing feature, designers can easily exchange color palettes with team members, clients, and collaborators, fostering better communication and alignment.",
            color: "text-orange-500"
        }
    ]

    return (
        <div className="max-w-6xl mx-auto px-6">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8">
                        Your Ultimate Tool for Crafting Seamless Color Palettes
                    </h1>
                </div>
                
                <p className="text-xl md:text-2xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
                    In the world of design, color is paramount. It sets the mood, conveys emotion, and ties everything together harmoniously. Color Stack revolutionizes the way designers create beautiful, cohesive color schemes.
                </p>
            </div>

            {/* What is Color Stack */}
            <section className="mb-16">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center">
                        <Palette className="w-8 h-8 mr-3 text-blue-600" />
                        What is Color Stack?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        Color Stack is a powerful web application designed to simplify the process of creating cohesive color palettes. 
                        Our browser extension collects theme colors from any web page and presents them in an easily accessible format. 
                        Whether you're browsing a website, blog, or online store, Color Stack extracts predominant colors and compiles them into convenient palettes for your creative projects.
                    </p>
                </div>
            </section>

            {/* How it Works */}
            <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
                    How Does Color Stack Work?
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Get the Extension</h3>
                        <p className="text-gray-600 mb-4">
                            Install our free browser extension from the Chrome Web Store with just one click.
                        </p>
                        <Link
                            href={CrxUrl}
                            target="_blank"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200"
                        >
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Get Extension
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Collect Colors</h3>
                        <p className="text-gray-600 mb-4">
                            Browse any website and let Color Stack automatically extract the color palette with a single click.
                        </p>
                        <div className="flex space-x-2">
                            <div className="w-8 h-8 bg-blue-500 rounded"></div>
                            <div className="w-8 h-8 bg-green-500 rounded"></div>
                            <div className="w-8 h-8 bg-purple-500 rounded"></div>
                            <div className="w-8 h-8 bg-orange-500 rounded"></div>
                            <div className="w-8 h-8 bg-pink-500 rounded"></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Organize & Save</h3>
                        <p className="text-gray-600 mb-4">
                            View extracted colors with hex codes, save palettes for future use, and organize them in your collection.
                        </p>
                        <div className="text-sm text-gray-500 font-mono">
                            #3B82F6 • #10B981 • #8B5CF6 • #F59E0B • #EC4899
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">4. Share & Collaborate</h3>
                        <p className="text-gray-600">
                            Share your beautiful color palettes with team members, clients, and collaborators effortlessly.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Choose Color Stack */}
            <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
                    Why Choose Color Stack?
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300">
                            <div className={`${feature.color} mb-4`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center mb-16">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Transform Your Design Workflow?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of designers who use Color Stack to create stunning, cohesive color palettes.
                    </p>
                    <Link
                        href={CrxUrl}
                        target="_blank"
                        className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-200"
                    >
                        <Sparkles className="w-6 h-6 mr-2" />
                        Get Started Free
                    </Link>
                </div>
            </section>

            {/* Conclusion */}
            <section className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                    Elevate Your Designs
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    In the fast-paced world of design, efficiency is key. With Color Stack, designers can streamline their workflow, 
                    save time, and unleash their creativity like never before. By harnessing the power of existing color schemes, 
                    Color Stack empowers you to create stunning visuals with ease. Whether you're a seasoned professional or just starting out, 
                    Color Stack is the ultimate tool for building beautiful, cohesive color palettes.
                </p>
            </section>
        </div>
    )
}
