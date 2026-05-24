'use client'

import type { Todo } from '@/payload-types'
import { useState, useTransition } from 'react'
import { updateTodoStatus } from '../actions/todo.action'
import { Check } from 'lucide-react'

export default function TodoCard({ todo }: { todo: Todo }) {
  const [completed, setCompleted] = useState(!!todo.completed)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const toggleStatus = () => {
    if (loading || isPending) return
    const next = !completed
    setCompleted(next)
    setError(null)
    setLoading(true)

    startTransition(async () => {
      try {
        await updateTodoStatus(todo.id, next)
      } catch {
        setCompleted(!next)
        setError('Could not update status')
      } finally {
        setLoading(false)
      }
    })
  }

  const busy = loading || isPending

  return (
    <article
      className={`bg-surface-1 border border-hairline rounded-xl p-6 flex flex-col gap-3 transition-opacity duration-200 ${
        completed ? 'opacity-60' : 'opacity-100'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={toggleStatus}
          disabled={busy}
          className={`shrink-0 mt-0.75 w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center p-0 transition-colors duration-150 ${
            busy ? 'cursor-wait opacity-60' : 'cursor-pointer opacity-100'
          } ${
            completed
              ? 'border-semantic-success bg-semantic-success'
              : 'border-hairline hover:border-ink bg-white'
          }`}
        >
          {completed && (
            <Check
              className={`w-3 h-3 text-white transition-transform duration-150 ${
                busy ? 'scale-75' : 'scale-100'
              }`}
            />
          )}
        </button>

        <div className="flex items-start justify-between gap-3 flex-1 min-w-0">
          <h2
            className={`font-medium text-ink text-[22px] leading-tight tracking-[-0.3px] transition-all duration-150 ${
              completed ? 'line-through' : 'no-underline'
            }`}
          >
            {todo.title}
          </h2>
          <span
            className={`shrink-0 rounded-full font-medium text-[12px] leading-relaxed px-2.5 py-0.5 mt-0.75 whitespace-nowrap transition-colors duration-150 ${
              completed ? 'bg-[rgba(11,223,80,0.12)] text-[#0a9e3d]' : 'bg-[#ebe7e1] text-ink-muted'
            }`}
          >
            {completed ? 'Done' : 'Pending'}
          </span>
        </div>
      </div>

      {todo.description && (
        <p className="text-ink-muted flex-1 text-[14px] leading-relaxed">{todo.description}</p>
      )}

      {error && <p className="text-semantic-error text-[12px] leading-relaxed">{error}</p>}

      <div className="flex items-center gap-2 pt-3 mt-auto border-t border-[#ebe7e1]">
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-150 ${
            completed ? 'bg-semantic-success' : 'bg-fin-orange'
          }`}
        />
        <span className="text-ink-tertiary text-[12px] leading-relaxed">
          {busy ? 'Updating…' : completed ? 'Completed' : 'In progress'}
        </span>
      </div>
    </article>
  )
}
