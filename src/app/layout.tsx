import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"

import './globals.css'

import { ReactQueryProvider } from "./query-provider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
    title: 'Color Stack',
    description: 'Collect all page colors.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const gAnalysis = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReactQueryProvider>{children}</ReactQueryProvider>
                <Toaster />
                {
                    gAnalysis ? (
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
                    ) : null
                }
            </body>
        </html>
    )
}
