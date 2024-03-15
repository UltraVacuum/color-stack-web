import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import Footer from '@/components/local/footer'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

import './globals.css'

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
    title: 'Color Stack',
    description: 'Collect your favorite webpage colors.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const gAnalysis = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body className={inter.className}>
                {children}
                <Footer />
                <Toaster />
                <Analytics />
                <SpeedInsights />
                {
                    gAnalysis && (
                        <>
                            <Script
                                id="g-analysis"
                                async
                                src={`https://www.googletagmanager.com/gtag/js?id=${gAnalysis}`}
                            />
                            <Script id="g-analysis-script">
                                {`
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', '${gAnalysis}');
                                `}
                            </Script>
                        </>
                    )
                }
            </body>
        </html>
    )
}
