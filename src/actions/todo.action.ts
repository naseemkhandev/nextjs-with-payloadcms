'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { revalidatePath } from 'next/cache'
import { headers as getHeaders } from 'next/headers'

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
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  if (!user) throw new Error('Unauthorized')

  await payload.create({
    collection: 'todos',
    data: { ...data, user: user.id },
  })

  revalidatePath('/')
}
