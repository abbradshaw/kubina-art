import {sanityClient} from './sanity'

export interface ArtworkSummary {
  title: string
  slug: string
  category: string
  medium: string
  year: string
  image: any
}

export interface Chapter {
  label: string
  title: string
  text: string
  artwork?: any
  caption?: string
}

export interface AboutPage {
  title: string
  image: any
  pull_quote?: string
  chapters?: Chapter[]
}

const WORK_SUMMARY = `{
  title,
  "slug": slug.current,
  category,
  medium,
  year,
  image
}`

export async function getAllWorks(): Promise<ArtworkSummary[]> {
  return sanityClient.fetch(`*[_type == "work"] ${WORK_SUMMARY}`)
}

export async function getWorkBySlug(slug: string): Promise<(ArtworkSummary & {dimensions?: string; description?: string; status?: string}) | null> {
  return sanityClient.fetch(`*[_type == "work" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    category,
    medium,
    year,
    image,
    dimensions,
    description,
    status
  }`, {slug})
}

// Fetch category order from Sanity settings. Falls back to default.
export async function getCategoryOrder(): Promise<string[]> {
  const result = await sanityClient.fetch(`*[_type == "settings"][0].categoryOrder`)
  if (Array.isArray(result) && result.length > 0) {
    return result as string[]
  }
  return ['Painting', 'Drawing', 'Sculpture', 'Digital']
}

export async function sortWorks<T extends {category: string; title?: string}>(works: T[]): Promise<T[]> {
  const categoryOrder = await getCategoryOrder()
  return works.sort((a, b) => {
    const catA = categoryOrder.indexOf(a.category)
    const catB = categoryOrder.indexOf(b.category)
    if (catA !== catB) return catA - catB
    return (a.title ?? '').localeCompare(b.title ?? '')
  })
}

export interface SiteSettings {
  categoryOrder?: string[]
  showPurchaseInquiry?: boolean
  contactEmail?: string
}

export async function getSettings(): Promise<SiteSettings> {
  return sanityClient.fetch(`*[_type == "settings" && _id == "settings"][0]{
    categoryOrder,
    showPurchaseInquiry,
    contactEmail
  }`) || {}
}
