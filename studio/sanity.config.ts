import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {assist} from '@sanity/assist'

export default defineConfig({
  name: 'default',
  title: 'Peter Kubina Art Gallery',
  projectId: 'nkk069k5',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    assist(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    badges: (prev, context) => {
      const {draft, published} = context
      const filtered = prev.filter(
        (badge) => !['draft', 'published', 'edited'].includes(badge.label?.toLowerCase() || '')
      )
      if (draft && published) {
        return [...filtered, {
          label: '⚠️ CHANGED — Click Publish',
          color: 'caution',
          title: 'Unpublished changes. Click Publish to update the live website.',
        }]
      }
      if (draft && !published) {
        return [...filtered, {
          label: '📝 DRAFT — Not Live',
          color: 'primary',
          title: 'Saved but NOT on the website yet. Click Publish to make it live.',
        }]
      }
      if (published) {
        return [...filtered, {
          label: '✅ LIVE on Website',
          color: 'positive',
          title: 'Published and visible at peterkubinaart.com',
        }]
      }
      return filtered
    },

    productionUrl: async (prev, {document}) => {
      const slug = (document.slug as any)?.current
      if (!slug) return 'https://peterkubinaart.com'
      if (document._type === 'about') return 'https://peterkubinaart.com/about'
      return `https://peterkubinaart.com/work/${slug}`
    },
  },
})
