import type { Metadata } from 'next'
import { Chakra_Petch, Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display-loaded',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body-loaded',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono-loaded',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kacpur³ — Cube Art',
  description: 'Photographs turned into giant Rubik\'s cube mosaics — every single square twisted by hand.',
  openGraph: {
    title: 'Kacpur³ — Cube Art',
    description: 'Photographs turned into giant Rubik\'s cube mosaics — every single square twisted by hand.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${chakraPetch.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
