'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateTodoModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          completed,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.errors?.[0]?.message ?? 'Failed to create task.')
      }

      handleClose()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '16px',
    lineHeight: 1.5,
    border: '1px solid #d3cec6',
    outline: 'none',
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#111111',
    transition: 'border-color 0.12s',
  }

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          backgroundColor: '#111111',
          color: '#ffffff',
          fontSize: '15px',
          fontWeight: 500,
          lineHeight: 1.2,
          borderRadius: '8px',
          padding: '10px 18px',
          border: 'none',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
        }}
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
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.22)' }}
          onClick={handleClose}
        >
          {/* Modal card */}
          <div
            className="relative w-full mx-4"
            style={{
              maxWidth: '480px',
              backgroundColor: '#ffffff',
              border: '1px solid #d3cec6',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: 'none',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between mb-6">
              <h2
                className="font-medium text-ink"
                style={{ fontSize: '22px', lineHeight: 1.25, letterSpacing: '-0.3px' }}
              >
                New Task
              </h2>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#626260',
                  fontSize: '22px',
                  lineHeight: 1,
                  padding: '2px 6px',
                  borderRadius: '6px',
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="todo-title"
                  style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.3, color: '#111111' }}
                >
                  Title{' '}
                  <span style={{ color: '#c41c1c' }}>*</span>
                </label>
                <input
                  id="todo-title"
                  ref={titleRef}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="What needs to be done?"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#111111')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#d3cec6')}
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="todo-desc"
                  style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.3, color: '#111111' }}
                >
                  Description{' '}
                  <span style={{ fontSize: '13px', fontWeight: 400, color: '#9c9fa5' }}>
                    optional
                  </span>
                </label>
                <textarea
                  id="todo-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add details…"
                  rows={3}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#111111')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#d3cec6')}
                />
              </div>

              {/* Completed toggle */}
              <label
                className="flex items-center gap-3"
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                <div style={{ position: 'relative', width: '18px', height: '18px', flexShrink: 0 }}>
                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: `1.5px solid ${completed ? '#0bdf50' : '#d3cec6'}`,
                      backgroundColor: completed ? '#0bdf50' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.12s',
                    }}
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
                <span style={{ fontSize: '15px', lineHeight: 1.4, color: '#111111' }}>
                  Mark as completed
                </span>
              </label>

              {/* Error */}
              {error && (
                <p style={{ fontSize: '14px', lineHeight: 1.5, color: '#c41c1c' }}>{error}</p>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#111111',
                    fontSize: '15px',
                    fontWeight: 500,
                    lineHeight: 1.2,
                    borderRadius: '8px',
                    padding: '10px 18px',
                    border: '1px solid #d3cec6',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !title.trim()}
                  style={{
                    backgroundColor: loading || !title.trim() ? '#9c9fa5' : '#111111',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: 500,
                    lineHeight: 1.2,
                    borderRadius: '8px',
                    padding: '10px 18px',
                    border: 'none',
                    cursor: loading || !title.trim() ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.12s',
                  }}
                >
                  {loading ? 'Creating…' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
