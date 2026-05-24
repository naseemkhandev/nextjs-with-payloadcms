import { redirect } from 'next/navigation'
import Navbar from '../../../components/Navbar'
import TodoCard from '../../../components/TodoCard'
import getCurrentUser from '@/utils/getCurrentUser'
import config from '@/payload.config'
import { getPayload } from 'payload'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

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
      <Navbar totalCount={totalCount} />

      <main className="max-w-7xl mx-auto px-8">
        <header className="pt-16 pb-12">
          <p className="font-medium text-ink-muted mb-4 text-[14px] leading-[1.3]">Todo App</p>
          <h1 className="font-medium text-ink text-[40px] leading-[1.15] tracking-[-0.8px]">
            My Tasks
          </h1>
          <p className="text-ink-muted mt-4 text-[18px] leading-normal tracking-[-0.1px]">
            {totalCount === 0
              ? 'No tasks yet — Click the button above to get started.'
              : `${pendingCount} pending · ${completedCount} completed`}
          </p>
        </header>

        {totalCount > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-12">
            {(
              [
                { label: 'Total Tasks', value: totalCount, accent: false },
                { label: 'Completed', value: completedCount, accent: true },
                { label: 'Pending', value: pendingCount, accent: false },
              ] as const
            ).map(({ label, value, accent }) => (
              <div key={label} className="bg-surface-1 border border-hairline rounded-xl p-6">
                <p className="text-ink-muted mb-2 text-[14px] leading-normal">{label}</p>
                <p
                  className={`font-medium text-[36px] leading-[1.15] tracking-[-0.8px] ${
                    accent ? 'text-semantic-success' : 'text-ink'
                  }`}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        )}

        {todos.length === 0 ? (
          <div className="bg-surface-1 border border-hairline rounded-2xl p-16 text-center">
            <p className="text-ink-muted text-[18px] leading-normal">No tasks yet.</p>
            <p className="text-ink-tertiary mt-2 text-[14px] leading-normal">
              Click the button above to create your first task.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-24">
            {todos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
