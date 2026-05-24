import { Inter } from 'next/font/google'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import './styles.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  description: 'A todo app built with Payload CMS and Next.js.',
  title: 'Tasks',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
