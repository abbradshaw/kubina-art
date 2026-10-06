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

const CATEGORY_ORDER = ['Painting', 'Drawing', 'Sculpture', 'Digital']

export function sortWorks<T extends {category: string; title?: string}>(works: T[]): T[] {
  return works.sort((a, b) => {
    const catA = CATEGORY_ORDER.indexOf(a.category)
    const catB = CATEGORY_ORDER.indexOf(b.category)
    if (catA !== catB) return catA - catB
    return (a.title ?? '').localeCompare(b.title ?? '')
  })
}
