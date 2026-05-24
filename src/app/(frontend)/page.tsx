import { getPayload } from 'payload'
import config from '@/payload.config'
import CreateTodoModal from './components/CreateTodoModal'
import './styles.css'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'todos',
    limit: 100,
  })

  const todos = result.docs
  const totalCount = todos.length
  const completedCount = todos.filter((t) => t.completed).length
  const pendingCount = totalCount - completedCount

  return (
    <div className="min-h-screen bg-canvas">
      {/* Top nav */}
      <nav className="sticky top-0 z-10 h-14 bg-canvas border-b border-hairline">
        <div className="max-w-[1280px] mx-auto px-8 h-full flex items-center justify-between">
          <span
            className="font-medium text-ink"
            style={{ fontSize: '15px', lineHeight: 1.2, letterSpacing: 0 }}
          >
            Tasks
          </span>
          <div className="flex items-center gap-4">
            <span className="text-ink-muted" style={{ fontSize: '14px', lineHeight: 1.5 }}>
              {totalCount} task{totalCount !== 1 ? 's' : ''}
            </span>
            <CreateTodoModal />
          </div>
        </div>
      </nav>

      <main className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <header className="pt-16 pb-12">
          <p
            className="font-medium text-ink-muted mb-4"
            style={{ fontSize: '14px', lineHeight: 1.3 }}
          >
            Todo App
          </p>
          <h1
            className="font-medium text-ink"
            style={{ fontSize: '40px', lineHeight: 1.15, letterSpacing: '-0.8px' }}
          >
            My Tasks
          </h1>
          <p
            className="text-ink-muted mt-4"
            style={{ fontSize: '18px', lineHeight: 1.5, letterSpacing: '-0.1px' }}
          >
            {totalCount === 0
              ? 'No tasks yet — visit /admin to get started.'
              : `${pendingCount} pending · ${completedCount} completed`}
          </p>
        </header>

        {/* Stats row */}
        {totalCount > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12">
            {(
              [
                { label: 'Total Tasks', value: totalCount, accent: false },
                { label: 'Completed', value: completedCount, accent: true },
                { label: 'Pending', value: pendingCount, accent: false },
              ] as const
            ).map(({ label, value, accent }) => (
              <div
                key={label}
                className="bg-surface-1 border border-hairline rounded-[12px] p-6"
              >
                <p
                  className="text-ink-muted mb-2"
                  style={{ fontSize: '14px', lineHeight: 1.5 }}
                >
                  {label}
                </p>
                <p
                  className="font-medium"
                  style={{
                    fontSize: '36px',
                    lineHeight: 1.15,
                    letterSpacing: '-0.8px',
                    color: accent ? '#0bdf50' : '#111111',
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Todo list */}
        {todos.length === 0 ? (
          <div className="bg-surface-1 border border-hairline rounded-[16px] p-16 text-center">
            <p
              className="text-ink-muted"
              style={{ fontSize: '18px', lineHeight: 1.5 }}
            >
              No tasks yet.
            </p>
            <p className="text-ink-tertiary mt-2" style={{ fontSize: '14px', lineHeight: 1.5 }}>
              Visit{' '}
              <a href="/admin" className="underline text-ink-muted">
                /admin
              </a>{' '}
              to create your first task.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-24">
            {todos.map((todo) => (
              <article
                key={todo.id}
                className="bg-surface-1 border border-hairline rounded-[12px] p-6 flex flex-col gap-3"
                style={{ opacity: todo.completed ? 0.6 : 1 }}
              >
                {/* Title + badge */}
                <div className="flex items-start justify-between gap-3">
                  <h2
                    className="font-medium text-ink flex-1"
                    style={{
                      fontSize: '22px',
                      lineHeight: 1.25,
                      letterSpacing: '-0.3px',
                      textDecoration: todo.completed ? 'line-through' : 'none',
                    }}
                  >
                    {todo.title}
                  </h2>
                  <span
                    className="shrink-0 rounded-full font-medium"
                    style={{
                      fontSize: '12px',
                      lineHeight: 1.4,
                      padding: '2px 10px',
                      marginTop: '3px',
                      ...(todo.completed
                        ? { backgroundColor: 'rgba(11, 223, 80, 0.12)', color: '#0a9e3d' }
                        : { backgroundColor: '#ebe7e1', color: '#626260' }),
                    }}
                  >
                    {todo.completed ? 'Done' : 'Pending'}
                  </span>
                </div>

                {/* Description */}
                {todo.description && (
                  <p
                    className="text-ink-muted flex-1"
                    style={{ fontSize: '14px', lineHeight: 1.5 }}
                  >
                    {todo.description}
                  </p>
                )}

                {/* Footer */}
                <div
                  className="flex items-center gap-2 pt-3 mt-auto"
                  style={{ borderTop: '1px solid #ebe7e1' }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: todo.completed ? '#0bdf50' : '#ff5600' }}
                  />
                  <span className="text-ink-tertiary" style={{ fontSize: '12px', lineHeight: 1.4 }}>
                    {todo.completed ? 'Completed' : 'In progress'}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
