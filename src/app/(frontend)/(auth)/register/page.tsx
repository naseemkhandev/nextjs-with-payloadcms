'use client'

import Link from 'next/link'
import { toast } from 'react-hot-toast'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    const loadingToast = toast.loading('Creating your account...')
    try {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match')
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || 'Registration failed')
      }

      toast.success('Account created successfully')
      router.refresh()
      router.push('/')
    } catch (error) {
      console.error('Registration failed:', error)
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      toast.dismiss(loadingToast)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-surface-1 border border-hairline rounded-xl p-8">
        <div className="mb-8">
          <p className="font-medium text-ink-muted text-[14px] leading-[1.3] mb-3">Get started</p>
          <h1 className="font-medium text-ink text-[28px] leading-[1.2] tracking-[-0.5px]">
            Create your account
          </h1>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="font-medium text-ink text-[14px] leading-[1.3]">
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Jane Smith"
              autoComplete="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-surface-1 text-ink text-[16px] leading-normal rounded-lg border border-hairline px-3.5 py-2.5 outline-none placeholder:text-ink-tertiary focus:border-ink transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-medium text-ink text-[14px] leading-[1.3]">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-surface-1 text-ink text-[16px] leading-normal rounded-lg border border-hairline px-3.5 py-2.5 outline-none placeholder:text-ink-tertiary focus:border-ink transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="font-medium text-ink text-[14px] leading-[1.3]">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-surface-1 text-ink text-[16px] leading-normal rounded-lg border border-hairline px-3.5 py-2.5 outline-none placeholder:text-ink-tertiary focus:border-ink transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="confirm-password"
              className="font-medium text-ink text-[14px] leading-[1.3]"
            >
              Confirm password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-surface-1 text-ink text-[16px] leading-normal rounded-lg border border-hairline px-3.5 py-2.5 outline-none placeholder:text-ink-tertiary focus:border-ink transition-colors"
            />
          </div>

          <p className="text-ink-subtle text-[12px] leading-[1.4]">
            By creating an account you agree to our{' '}
            <Link href="#" className="text-ink hover:underline transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="text-ink hover:underline transition-colors">
              Privacy Policy
            </Link>
            .
          </p>

          <button
            type="submit"
            className="mt-1 bg-ink text-white font-medium text-[15px] leading-[1.2] rounded-lg px-4.5 py-2.5 hover:bg-inverse-canvas transition-colors cursor-pointer"
          >
            Create account
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-hairline-soft" />
          <span className="text-ink-tertiary text-[12px] leading-[1.4]">or</span>
          <div className="flex-1 h-px bg-hairline-soft" />
        </div>

        <p className="text-center text-ink-muted text-[14px] leading-normal">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-ink hover:underline transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
