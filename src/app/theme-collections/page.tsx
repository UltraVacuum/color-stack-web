


'use client'

import React, { useState, useEffect } from 'react'
// Using native elements since Card and Input components are not available
import { Button } from '@/components/ui/button'
import { Search, Plus, Palette } from 'lucide-react'

interface ThemeCollection {
  id: number
  name: string
  website_domain: string
  primary_color: string
  secondary_color: string
  accent_color: string
  popularity_score: number
}

const ThemeCollectionsPage = () => {
  const [themes, setThemes] = useState<ThemeCollection[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPopularThemes()
  }, [])

  const fetchPopularThemes = async () => {
    try {
      const response = await fetch('/api/popular-themes?limit=12')
      const data = await response.json()
      setThemes(data)
    } catch (error) {
      console.error('Error fetching themes:', error)
    } finally {
      setLoading(false)
    }
  }

  const searchThemesByColor = async () => {
    if (!searchQuery.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/search/themes-by-color?color=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setThemes(data)
    } catch (error) {
      console.error('Error searching themes:', error)
    } finally {
      setLoading(false)
    }
  }

  const searchColorsByWebsite = async () => {
    if (!searchQuery.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/search/colors-by-website?website=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setThemes(data.themes || [])
    } catch (error) {
      console.error('Error searching colors:', error)
    } finally {
      setLoading(false)
    }
  }

  const ThemeCard = ({ theme }: { theme: ThemeCollection }) => (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{theme.name}</h3>
        <p className="text-sm text-gray-500">{theme.website_domain}</p>
      </div>
      <div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div 
              className="w-6 h-6 rounded-full border" 
              style={{ backgroundColor: theme.primary_color }}
            />
            <span className="text-sm">{theme.primary_color}</span>
          </div>
          {theme.secondary_color && (
            <div className="flex items-center space-x-2">
              <div 
                className="w-6 h-6 rounded-full border" 
                style={{ backgroundColor: theme.secondary_color }}
              />
              <span className="text-sm">{theme.secondary_color}</span>
            </div>
          )}
          {theme.accent_color && (
            <div className="flex items-center space-x-2">
              <div 
                className="w-6 h-6 rounded-full border" 
                style={{ backgroundColor: theme.accent_color }}
              />
              <span className="text-sm">{theme.accent_color}</span>
            </div>
          )}
        </div>
        <div className="mt-4 text-xs text-gray-500">
          Popularity: {theme.popularity_score}
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Theme Collections</h1>
        <p className="text-gray-600">Discover and manage website theme colors</p>
      </div>

      {/* Search Section */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by color (hex, rgb) or website..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-10 border rounded-md px-3 py-2 w-full"
            />
          </div>
          <Button onClick={searchThemesByColor} disabled={!searchQuery.trim()}>
            <Palette className="w-4 h-4 mr-2" />
            Find Themes
          </Button>
          <Button variant="outline" onClick={searchColorsByWebsite} disabled={!searchQuery.trim()}>
            <Search className="w-4 h-4 mr-2" />
            Find Colors
          </Button>
        </div>
      </div>

      {/* Themes Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="mb-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : themes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Palette className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No themes found</h3>
          <p className="text-gray-500">Try searching for colors or websites to discover themes</p>
        </div>
      )}
    </div>
  )
}

export default ThemeCollectionsPage


