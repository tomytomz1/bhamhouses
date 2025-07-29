import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import UTMTracker from '@/components/UTMTracker'
import StickyCTA from '@/components/StickyCTA'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BHAM Houses - Birmingham, MI Cash Home Buyers',
  description: 'Birmingham, MI\'s dedicated cash home buyer. Fair offers in 24 hours, close in 7 days. Call (586) 324-1248',
  keywords: 'sell house fast Birmingham Michigan, Birmingham MI cash home buyers, we buy houses Birmingham MI, cash for houses Birmingham Michigan',
  openGraph: {
    title: 'BHAM Houses - Birmingham, MI Cash Home Buyers',
    description: 'Birmingham, MI\'s dedicated cash home buyer. Fair offers in 24 hours, close in 7 days.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "BHAM Houses - Birmingham, MI Cash Home Buyers",
              "description": "Birmingham, Michigan's dedicated cash home buying company",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Birmingham",
                "addressRegion": "MI",
                "postalCode": "48009"
              },
              "telephone": "(586) 324-1248",
              "areaServed": "Birmingham, MI",
              "priceRange": "$",
              "openingHours": "Mo-Su 08:00-20:00"
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <GoogleAnalytics />
          <UTMTracker />
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <StickyCTA />
        </ErrorBoundary>
      </body>
    </html>
  )
}
