import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: () => true, // Allow public registration
    admin: ({ req: { user } }) => user?.role === 'admin', // Only admins can access the Payload admin panel
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: 'user',
      required: true,
      access: {
        update: ({ req: { user } }) => user?.role === 'admin', // Only admins can change roles
      },
    },
  ],
}
