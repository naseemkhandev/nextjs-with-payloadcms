import 'dotenv/config'
import config from './src/payload.config.js'
import { getPayload } from 'payload'

async function updateAdmin() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const users = await payload.find({
    collection: 'users',
    where: {
      email: { equals: 'devnaseemkhan@gmail.com' }
    }
  })

  if (users.docs.length > 0) {
    const user = users.docs[0]
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        role: 'admin'
      }
    })
    console.log('Updated user devnaseemkhan@gmail.com to admin role.')
  } else {
    console.log('User devnaseemkhan@gmail.com not found.')
  }
  process.exit(0)
}

updateAdmin()
