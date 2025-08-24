import Link from 'next/link'
import HeroImage from './colors.png'
import { Palette, Sparkles, ArrowRight } from 'lucide-react'

import './hero.css';

const GradientBackground = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
    </div>
  )
}

export default function Hero({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20'>
      <GradientBackground />

      <div className='relative z-10 w-full max-w-6xl mx-auto px-6'>
        <div className='text-center space-y-6 md:space-y-8'>
          {/* Main Heading */}
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 mb-4">
              <Palette className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Color Design Platform</span>
            </div>

            <h1 className='text-5xl md:text-7xl lg:text-8xl font-black tracking-tight'>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Design
              </span>{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Color
              </span>{' '}
              <span className="bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                Stack
              </span>
            </h1>

            <p className='text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed'>
              Discover, collect, and create beautiful color palettes from the world's most inspiring websites
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative group">
            <div
              className='w-full h-64 md:h-80 lg:h-96 bg-center bg-no-repeat bg-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700'
              style={{
                backgroundImage: `url(${HeroImage.src})`,
                backgroundPosition: 'center 30%'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>

            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 px-6 py-4 w-11/12 max-w-2xl">
              <div className="flex items-center justify-between">
                <p className='text-lg md:text-xl text-gray-800 font-medium'>
                  Get inspired by theme colors from world's most popular pages
                </p>
                <Link
                  href="/explore"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200 group/button"
                >
                  <span className="mr-2">Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-10 md:pt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600">10K+</div>
              <div className="text-sm text-gray-600 font-medium">Color Palettes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600">5K+</div>
              <div className="text-sm text-gray-600 font-medium">Websites Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600">99%</div>
              <div className="text-sm text-gray-600 font-medium">Designer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {children}

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-400/20 rounded-full blur-xl"></div>
    </div>
  )
}
