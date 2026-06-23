import type { Metadata } from 'next'
import { Bebas_Neue, Geist, Geist_Mono } from 'next/font/google'
import { AuthProvider } from '@/lib/auth'
import { StoreProvider } from '@/lib/store'
import Navbar from '@/components/layout/Navbar'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const bebasNeue = Bebas_Neue({ variable: '--font-bebas', weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | My Drama',
    default: 'My Drama — Watch Short Drama Series Free',
  },
  description:
    'Stream the best short drama series — romance, thriller, fantasy and more. New episodes every day, watch free.',
  keywords: [
    'short drama',
    'drama streaming',
    'romance series',
    'thriller',
    'fantasy drama',
    'watch free',
    'episodes',
  ],
  metadataBase: new URL('https://my-drama.com'),
  openGraph: {
    type: 'website',
    siteName: 'My Drama',
    title: 'My Drama — Watch Short Drama Series Free',
    description: 'Stream the best short drama series — romance, thriller, fantasy and more.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Drama — Watch Short Drama Series Free',
    description: 'Stream the best short drama series — romance, thriller, fantasy and more.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable}`}>
      <body className="min-h-screen bg-background text-foreground">
        <AuthProvider>
          <StoreProvider>
            <Navbar />
            <div className="mx-auto max-w-[1536px]">{children}</div>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
