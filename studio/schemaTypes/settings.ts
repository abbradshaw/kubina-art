import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: '⚙️ Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  preview: {
    prepare() {
      return {title: 'Site Settings', subtitle: 'Category order, purchase toggle, contact email'}
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
    defineField({
      name: 'showStatus',
      title: 'Show Artwork Status',
      description: 'When ON, artwork detail pages show the Status field (Available, Sold, etc.). When OFF, status is hidden from public view.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showPurchaseInquiry',
      title: 'Show Purchase Inquiry Box',
      description: 'When ON, artwork detail pages show an "Email about this piece" box. When OFF, the site reads as a gallery/archive only.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email Address',
      description: 'The email address used for purchase inquiries and contact links on the website.',
      type: 'string',
      initialValue: 'smaura108@comcast.net',
      validation: (Rule) => Rule.email(),
    }),
  ],
})
