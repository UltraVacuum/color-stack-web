import ColorItemBasic from '@/components/local/color-item';
import {
    ContentLayout,
    ErrorView
} from "@/components/client/layout";
import { Database, TrendingUp, BarChart3, Eye, Zap, Users } from 'lucide-react';

export default function ColorSets({ colorSets }: any) {
    return (
        <ContentLayout>
            {/* Hero Section */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 backdrop-blur-sm mb-6">
                    <Database className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-semibold text-blue-700">Color Intelligence Platform</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Discover <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Color Patterns</span> That Drive Design
                </h2>
                
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Real-time analysis of millions of colors from top websites. Uncover trends, patterns, and insights that shape modern digital design.
                </p>
            </div>

            {/* Enhanced Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 text-center group hover:shadow-xl transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl text-white mb-4 group-hover:scale-110 transition-transform">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-blue-800 mb-2">10K+</div>
                    <div className="text-sm font-medium text-blue-600">Active Palettes</div>
                    <div className="text-xs text-blue-500 mt-2">Growing daily</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 text-center group hover:shadow-xl transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-xl text-white mb-4 group-hover:scale-110 transition-transform">
                        <Zap className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-purple-800 mb-2">500+</div>
                    <div className="text-sm font-medium text-purple-600">Trending Colors</div>
                    <div className="text-xs text-purple-500 mt-2">Real-time tracking</div>
                </div>
                
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 border border-pink-200 text-center group hover:shadow-xl transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-500 rounded-xl text-white mb-4 group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-pink-800 mb-2">24/7</div>
                    <div className="text-sm font-medium text-pink-600">Live Updates</div>
                    <div className="text-xs text-pink-500 mt-2">Global community</div>
                </div>
            </div>

            {/* Compact Color Grid */}
            <div className="mb-16">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                        <Eye className="w-5 h-5 text-blue-600 mr-2" />
                        Trending Colors This Week
                    </h3>
                    <div className="text-sm text-gray-500 font-medium">
                        {colorSets.length} colors • Updated just now
                    </div>
                </div>
                
                <div className="grid grid-cols-8 gap-3 p-8 bg-gradient-to-br from-white/80 to-gray-50/80 rounded-3xl border border-gray-200/50 backdrop-blur-sm shadow-lg">
                    {colorSets.map((color: any, idx: number) => (
                        <div key={idx} className="relative group aspect-square flex items-center justify-center">
                            <ColorItemBasic color={color} />
                            <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-300 pointer-events-none backdrop-blur-sm"></div>
                        </div>
                    ))}
                </div>
                
                <div className="text-center mt-6">
                    <div className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Live color data streaming in real-time
                    </div>
                </div>
            </div>

            {/* Enhanced CTA Section - Optimized for Collections */}
            <div className="text-center max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl p-12 border border-blue-100/50 shadow-lg backdrop-blur-sm">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200/50 mb-8">
                        <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm font-semibold text-blue-700">Premium Collections</span>
                    </div>
                    
                    <h3 className="text-4xl font-bold text-gray-800 mb-6">
                        Unlock the Full <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Color Universe</span>
                    </h3>
                    
                    <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Dive into our curated collections with millions of colors, advanced analytics, and professional tools designed for creative workflows.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
                        <button className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-10 py-5 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 inline-flex items-center group">
                            <Database className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                            Explore Collections
                            <span className="ml-2 text-blue-200 group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                        
                        <button className="border-2 border-blue-200 bg-white/80 text-blue-700 px-10 py-5 rounded-2xl font-semibold hover:bg-blue-50 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                            View Documentation
                        </button>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-700 mb-2">10K+</div>
                            <div className="text-sm text-blue-600 font-medium">Color Palettes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-700 mb-2">500+</div>
                            <div className="text-sm text-purple-600 font-medium">Daily Updates</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-pink-700 mb-2">5K+</div>
                            <div className="text-sm text-pink-600 font-medium">Pro Users</div>
                        </div>
                    </div>
                </div>
            </div>
        </ContentLayout>
    )
}
