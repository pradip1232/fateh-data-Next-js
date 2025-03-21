import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog App | Next.js',
  description: 'A modern blog application built with Next.js, featuring dynamic content, search functionality, and local storage support.',
  keywords: 'blog, next.js, react, typescript, bootstrap',
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Blog App | Next.js',
    description: 'A modern blog application built with Next.js',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
