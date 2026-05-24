'use client'

import useHandleLogout from '@/hooks/useHandleLogout'
import Link from 'next/link'
import CreateTodoModal from './CreateTodoModal'
import { Loader } from 'lucide-react'

const Navbar = ({ totalCount }: { totalCount: number }) => {
  const { handleLogout, isLoading } = useHandleLogout()

  return (
    <nav className="sticky top-0 z-10 h-14 bg-canvas border-b border-hairline">
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
        <Link
          href="/"
          className="font-medium text-ink text-[15px] leading-[1.2] tracking-normal italic"
        >
          📋 Tasks
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-ink-muted text-[14px] leading-normal">
            {totalCount} task{totalCount !== 1 ? 's' : ''}
          </span>
          <CreateTodoModal />

          <button
            type="submit"
            onClick={handleLogout}
            disabled={isLoading}
            className="bg-transparent text-ink-muted text-[14px] leading-[1.2] hover:text-ink transition-colors cursor-pointer disabled:cursor-not-allowed disabled:text-ink-subtle flex items-center gap-2"
          >
            {isLoading ? <Loader className="animate-spin size-4" /> : null}
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
