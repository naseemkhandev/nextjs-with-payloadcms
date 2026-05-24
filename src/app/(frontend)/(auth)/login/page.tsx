'use client'

import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-surface-1 border border-hairline rounded-xl p-8">
        <div className="mb-8">
          <p className="font-medium text-ink-muted text-[14px] leading-[1.3] mb-3">Welcome back</p>
          <h1 className="font-medium text-ink text-[28px] leading-[1.2] tracking-[-0.5px]">
            Sign in to Tasks
          </h1>
        </div>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-medium text-ink text-[14px] leading-[1.3]">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="bg-surface-1 text-ink text-[16px] leading-normal rounded-lg border border-hairline px-3.5 py-2.5 outline-none placeholder:text-ink-tertiary focus:border-ink transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="font-medium text-ink text-[14px] leading-[1.3]">
                Password
              </label>
              <Link
                href="#"
                className="text-ink-muted text-[14px] leading-[1.3] hover:text-ink transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="bg-surface-1 text-ink text-[16px] leading-normal rounded-lg border border-hairline px-3.5 py-2.5 outline-none placeholder:text-ink-tertiary focus:border-ink transition-colors"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-ink text-white font-medium text-[15px] leading-[1.2] rounded-lg px-4.5 py-2.5 hover:bg-inverse-canvas transition-colors cursor-pointer"
          >
            Sign in
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-hairline-soft" />
          <span className="text-ink-tertiary text-[12px] leading-[1.4]">or</span>
          <div className="flex-1 h-px bg-hairline-soft" />
        </div>

        <p className="text-center text-ink-muted text-[14px] leading-normal">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-ink hover:underline transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
