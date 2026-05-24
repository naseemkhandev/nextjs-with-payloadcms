'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { revalidatePath } from 'next/cache'

export async function updateTodoStatus(id: number, completed: boolean) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  await payload.update({
    collection: 'todos',
    id,
    data: { completed },
  })

  revalidatePath('/')
}

export async function createTodo(data: {
  title: string
  description?: string
  completed: boolean
}) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  await payload.create({
    collection: 'todos',
    data,
  })

  revalidatePath('/')
}
