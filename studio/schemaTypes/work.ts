import {defineField, defineType} from 'sanity'

export const work = defineType({
  name: 'work',
  title: '🎨 Artwork',
  type: 'document',

  preview: {
    select: {
      title: 'title',
      year: 'year',
      category: 'category',
      status: 'status',
      media: 'image',
    },
    prepare({title, year, category, status, media}) {
      const statusEmoji =
        status === 'available' ? '🟢'
        : status === 'sold' ? '🔴'
        : status === 'on-hold' ? '🟡'
        : status === 'private' ? '⚫'
        : '⚪'
      const statusLabel =
        status === 'available' ? 'Available'
        : status === 'sold' ? 'Sold'
        : status === 'on-hold' ? 'On Hold'
        : status === 'private' ? 'Private'
        : 'Unknown'
      return {
        title: title || 'Untitled Artwork',
        subtitle: `${statusEmoji} ${statusLabel} • ${category || 'No category'} • ${year || 'No year'}`,
        media,
      }
    },
  },

  fields: [
    defineField({
      name: 'title',
      title: '🖼️ Artwork Title',
      type: 'string',
      description: 'The name of this piece. Appears as the big headline on the artwork page.',
      validation: (rule) => rule.required().error('Every artwork needs a title.'),
    }),
    defineField({
      name: 'slug',
      title: '🔗 Web Address (Slug)',
      type: 'slug',
      description: 'This becomes the website URL. Click "Generate" to auto-create from the title.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required().error('Web address is needed so people can find this artwork online.'),
    }),
    defineField({
      name: 'image',
      title: '📷 Artwork Photo',
      type: 'image',
      description: 'Upload a high-quality photo. The "© Peter Kubina" watermark is added automatically. Use JPG at least 1200px wide.',
      options: {hotspot: true, metadata: ['palette']},
      validation: (rule) => rule.required().error('Please upload a photo so visitors can see the artwork.'),
    }),
    defineField({
      name: 'category',
      title: '📂 Category',
      type: 'string',
      description: 'What type of artwork? Determines which section it appears in on the website.',
      options: {
        list: [
          {title: '🎨 Painting', value: 'Painting'},
          {title: '✏️ Drawing', value: 'Drawing'},
          {title: '🗿 Sculpture', value: 'Sculpture'},
          {title: '💻 Digital', value: 'Digital'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required().error('Please pick a category.'),
    }),
    defineField({
      name: 'status',
      title: '🏷️ Sale Status',
      type: 'string',
      description: 'Is this piece available to buy? Shows a colored label on the website.',
      options: {
        list: [
          {title: '🟢 Available — For sale', value: 'available'},
          {title: '🟡 On Hold — Someone is interested', value: 'on-hold'},
          {title: '🔴 Sold — No longer available', value: 'sold'},
          {title: '⚫ Private Collection — Not for sale', value: 'private'},
        ],
        layout: 'radio',
      },
      initialValue: 'available',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: '📅 Year Created',
      type: 'string',
      description: 'What year was this made? Example: 2023. Appears on the page and sorts the gallery.',
      validation: (rule) => rule.required().regex(/^\d{4}$/).error('Please enter a 4-digit year like 2023.'),
    }),
    defineField({
      name: 'medium',
      title: '🖌️ Medium / Materials',
      type: 'string',
      description: 'What materials? Example: "Oil on canvas" or "Charcoal on paper". Appears under the title.',
    }),
    defineField({
      name: 'dimensions',
      title: '📐 Dimensions',
      type: 'string',
      description: 'The size. Example: "24 x 36 inches" or "60 x 90 cm".',
    }),
    defineField({
      name: 'body',
      title: '📝 Curator Notes / Description',
      type: 'text',
      description: 'Description, story, or curator notes. Appears on the artwork page. Plain text is fine.',
      rows: 6,
    }),
  ],
})
