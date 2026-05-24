import type { CollectionConfig } from 'payload'

export const Todos: CollectionConfig = {
  slug: 'todos',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'completed',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'createdAt',
      type: 'date',
      defaultValue: new Date().toISOString(),
    },
    {
      name: 'updatedAt',
      type: 'date',
      defaultValue: new Date().toISOString(),
    },
  ],
}
