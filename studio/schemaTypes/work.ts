import {defineField, defineType} from 'sanity'
import WatermarkedImageInput from '../components/WatermarkedImageInput'

export const work = defineType({
  name: 'work',
  title: 'Artworks',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of this piece of art.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'This sets the web address. Click Generate after typing the title.',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      description: 'Upload a clear photo. The watermark is added automatically.',
      components: {input: WatermarkedImageInput},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'What kind of artwork is this?',
      options: {
        list: ['Painting', 'Drawing', 'Sculpture', 'Digital'],
        layout: 'radio',
      },
      initialValue: 'Painting',
    }),
    defineField({
      name: 'status',
      title: 'Availability Status',
      type: 'string',
      description: 'Available shows the for-sale contact box. Sold or Private Collection hides it.',
      options: {
        list: ['Available', 'Private Collection', 'Sold', 'Museum Collection'],
        layout: 'radio',
      },
      initialValue: 'Available',
    }),
    defineField({
      name: 'year',
      title: 'Year Created',
      type: 'string',
      description: 'A 4-digit year, e.g. 2000',
      validation: (r) => r.required().regex(/^[0-9]{4}$/, 'Must be a 4-digit year'),
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      description: 'e.g. Oil on Canvas, Charcoal, Bronze',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      description: 'e.g. 24 x 36 inches (leave blank if unknown)',
    }),
    defineField({
      name: 'body',
      title: 'Curator Notes',
      type: 'text',
      description: 'A short paragraph about this piece — its story or meaning. Plain sentences work best.',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image', year: 'year'},
    prepare({title, media, year}) {
      return {title, subtitle: year, media}
    },
  },
  orderings: [
    {title: 'Year, newest first', name: 'yearDesc', by: [{field: 'year', direction: 'desc'}]},
  ],
})
