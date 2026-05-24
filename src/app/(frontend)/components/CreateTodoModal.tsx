'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createTodo } from '../actions/todo.action'

export default function CreateTodoModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState(false)
  const [isPending, startTransition] = useTransition()
  const titleRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) titleRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    setTitle('')
    setDescription('')
    setCompleted(false)
    setError(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    startTransition(async () => {
      try {
        await createTodo({
          title: title.trim(),
          description: description.trim() || undefined,
          completed,
        })
        handleClose()
        router.refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong.')
      } finally {
        setLoading(false)
      }
    })
  }

  const busy = loading || isPending

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-ink text-white text-[15px] font-medium leading-[1.2] rounded-lg px-4.5 py-2.5 inline-flex items-center gap-1.75 cursor-pointer"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
          <path
            d="M6.5 1v11M1 6.5h11"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        New Task
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.22)]"
          onClick={handleClose}
        >
          {/* Modal card */}
          <div
            className="relative w-full mx-4 max-w-120 bg-white border border-hairline rounded-2xl p-8 shadow-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-medium text-ink text-[22px] leading-tight tracking-[-0.3px]">
                New Task
              </h2>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                className="bg-transparent border-none cursor-pointer text-ink-muted text-[22px] leading-none px-1.5 py-0.5 rounded-md"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="todo-title"
                  className="text-[14px] font-medium leading-[1.3] text-ink"
                >
                  Title <span className="text-semantic-error">*</span>
                </label>
                <input
                  id="todo-title"
                  ref={titleRef}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="What needs to be done?"
                  className="rounded-lg px-3.5 py-2.5 text-[16px] leading-normal border border-hairline outline-none w-full bg-white text-ink transition-colors duration-150 focus:border-ink"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="todo-desc"
                  className="text-[14px] font-medium leading-[1.3] text-ink"
                >
                  Description{' '}
                  <span className="text-[13px] font-normal text-[#9c9fa5]">optional</span>
                </label>
                <textarea
                  id="todo-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add details…"
                  rows={3}
                  className="rounded-lg px-3.5 py-2.5 text-[16px] leading-normal border border-hairline outline-none w-full bg-white text-ink transition-colors duration-150 focus:border-ink resize-none"
                />
              </div>

              {/* Completed toggle */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div className="relative w-4.5 h-4.5 shrink-0">
                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4.5 h-4.5 rounded-sm border-[1.5px] flex items-center justify-center transition-all duration-150 ${
                      completed
                        ? 'border-semantic-success bg-semantic-success'
                        : 'border-hairline bg-white'
                    }`}
                  >
                    {completed && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-[15px] leading-[1.4] text-ink">Mark as completed</span>
              </label>

              {/* Error */}
              {error && <p className="text-[14px] leading-normal text-semantic-error">{error}</p>}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-white text-ink text-[15px] font-medium leading-[1.2] rounded-lg px-4.5 py-2.5 border border-hairline cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={busy || !title.trim()}
                  className={`text-white text-[15px] font-medium leading-[1.2] rounded-lg px-4.5 py-2.5 transition-colors duration-150 ${
                    busy || !title.trim()
                      ? 'bg-[#9c9fa5] cursor-not-allowed'
                      : 'bg-ink cursor-pointer'
                  }`}
                >
                  {busy ? 'Creating…' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
