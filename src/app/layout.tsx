import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'LoveGram - The AI-Powered Relationship Platform',
  description: 'The most beautiful, emotional, interactive, AI-powered relationship platform on the internet.',
  keywords: ['dating', 'relationships', 'ai', 'compatibility', 'love'],
  openGraph: {
    title: 'LoveGram',
    description: 'The most beautiful, emotional, interactive, AI-powered relationship platform.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning className="bg-slate-950 text-slate-50 antialiased min-h-screen">
        {children}
        <Toaster theme="dark" position="bottom-right" richColors />
      </body>
    </html>
  )
}
