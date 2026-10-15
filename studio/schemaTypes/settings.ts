import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: '⚙️ Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  preview: {
    prepare() {
      return {title: 'Site Settings', subtitle: 'Homepage category order'}
    },
  },
  fields: [
    defineField({
      name: 'categoryOrder',
      title: '📂 Homepage Category Order',
      type: 'array',
      description: 'Drag categories up or down to change their order on the homepage.',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'Painting', value: 'Painting'},
              {title: 'Drawing', value: 'Drawing'},
              {title: 'Sculpture', value: 'Sculpture'},
              {title: 'Digital', value: 'Digital'},
            ],
          },
        },
      ],
      initialValue: ['Painting', 'Drawing', 'Sculpture', 'Digital'],
      validation: (rule) =>
        rule.custom((value: string[] | undefined) => {
          if (!value || value.length === 0) return 'Please add at least one category.'
          const seen = new Set<string>()
          for (const v of value) {
            if (seen.has(v)) return `Duplicate category: ${v}. Each category can only appear once.`
            seen.add(v)
          }
          return true
        }),
    }),
  ],
})
