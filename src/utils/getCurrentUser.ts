import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'

const getCurrentUser = async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })
  return user
}

export default getCurrentUser
