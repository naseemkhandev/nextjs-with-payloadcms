import getCurrentUser from '@/utils/getCurrentUser'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  if (user) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center px-4 py-16">
      {children}
    </div>
  )
}
