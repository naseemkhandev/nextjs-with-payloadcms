import CreateTodoModal from './CreateTodoModal'

const Navbar = ({ totalCount }: { totalCount: number }) => {
  return (
    <nav className="sticky top-0 z-10 h-14 bg-canvas border-b border-hairline">
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
        <span className="font-medium text-ink text-[15px] leading-[1.2] tracking-normal">
          Tasks
        </span>
        <div className="flex items-center gap-4">
          <span className="text-ink-muted text-[14px] leading-normal">
            {totalCount} task{totalCount !== 1 ? 's' : ''}
          </span>
          <CreateTodoModal />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
