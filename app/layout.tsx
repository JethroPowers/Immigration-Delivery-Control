import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arbiter | Immigration Operations Redesign',
  description:
    'Arbiter helps UK immigration firms tighten case progression, document control, handoffs, and partner visibility inside the systems they already use.',
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
