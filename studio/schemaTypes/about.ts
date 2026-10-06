import {defineField, defineType} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About the Artist',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About the Artist',
      description: 'Shown in the browser tab. Best left as is.',
    }),
    defineField({
      name: 'image',
      title: 'Portrait Photo',
      type: 'image',
      description: 'The photo at the top of the About page. NOT watermarked.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'pull_quote',
      title: 'Highlight Quote',
      type: 'text',
      description: 'The quote shown next to the portrait.',
    }),
    defineField({
      name: 'chapters',
      title: 'Biography Chapters',
      type: 'array',
      description: 'The sections of the biography, in order. Drag to rearrange.',
      of: [
        {
          type: 'object',
          name: 'chapter',
          fields: [
            {name: 'label', title: 'Label (e.g. Chapter I)', type: 'string'},
            {name: 'title', title: 'Chapter Title', type: 'string'},
            {name: 'text', title: 'Text Content', type: 'text'},
            {name: 'artwork', title: 'Interspersed Artwork', type: 'image', options: {hotspot: true}},
            {name: 'caption', title: 'Artwork Caption', type: 'string'},
          ],
          preview: {
            select: {title: 'title', subtitle: 'label', media: 'artwork'},
          },
        },
      ],
    }),
  ],
})
