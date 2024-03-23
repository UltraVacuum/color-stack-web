import type { Metadata } from 'next'

export const keywords = [
    'color',
    'colors',
    'color scheme',
    'color stack',
    'colors stack',
    'color customize',
    'color design',
    'design color',
    'stack color',
    'stack colors',
    'scheme color',
    'color schemes',
    'color theme',
    'theme color',
    'color themes',
    'theme colors',
    'color palette',
    'color palettes',
    'color combinations',
    'palettes',
    'hex color palettes',
    'rgb color palettes',
    'hsv color palettes',
    'hsl color palettes',
    'pastel color palette',
    'color wheel',
    'color combination',
    'color panels',
    'color names',
    'web color schemes',
    'random color palette generator',
    'color schemes generator',
    'ui color palette generator',
    'pretty colors',
    'vintage color',
    'extract color palette from image',
    'color palette from image'
].join(',')

export const description = 'Customize stack the page color scheme. Build your color sets to help your color design stand out.'

export const SeoMeta: Metadata = {
    metadataBase: new URL('https://color-stack.top'),
    title: {
        template: 'Color Stack | %s',
        default: 'Color Stack | Home', // a default is required when creating a template
    },
    keywords,
    description,
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon/favicon.ico',
        shortcut: '/favicon/favicon-32x32.png',
        apple: '/favicon/apple-touch-icon.png',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: '/favicon/apple-touch-icon.png',
        },
    },
}
