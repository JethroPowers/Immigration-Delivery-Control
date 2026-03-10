import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arbiter | Operational Automation Layer',
  description:
    'Arbiter is the automation layer for UK immigration firms: document chasing, validation gates, and partner exception routing.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
